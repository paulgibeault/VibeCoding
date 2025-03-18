class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameState = new GameState();
        this.rules = new GameRules();
        this.renderer = new GameRenderer(this.canvas, this.ctx);
        this.events = new GameEventManager();
        this.ui = new GameUI(this);
        this.setupEventListeners();
        this.initializeUI();
        this.start();
    }

    initializeUI() {
        const playerCards = document.querySelector('.player-cards');
        if (playerCards) {
            playerCards.innerHTML = ''; // Clear existing cards
            this.gameState.players.forEach((player, index) => {
                const card = this.createPlayerCard(player, index === 0);
                playerCards.appendChild(card);
            });
        }
    }

    createPlayerCard(player, isCurrentPlayer) {
        const card = document.createElement('div');
        card.className = `player-card ${isCurrentPlayer ? 'current' : ''}`;
        card.dataset.player = player.name;
        
        card.innerHTML = `
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-score">Score: <span class="score-value">0</span></div>
            </div>
            <div class="player-fragments">
                <div class="fragment-count">0</div>
                <div class="fragment-chamber"></div>
            </div>
            <div class="player-tokens">
                <div class="token-count">Tokens: <span class="token-value">0</span></div>
            </div>
        `;

        // Set player colors as CSS variables
        card.style.setProperty('--player-color', player.color);
        card.style.setProperty('--player-glow', player.glowColor);
        
        return card;
    }

    setupEventListeners() {
        this.canvas.addEventListener('click', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = Math.floor((event.clientX - rect.left) / this.renderer.cellSize);
            const y = Math.floor((event.clientY - rect.top) / this.renderer.cellSize);
            
            this.handleCellClick(x, y);
        });

        const endTurnBtn = document.getElementById('endTurnBtn');
        if (endTurnBtn) {
            endTurnBtn.addEventListener('click', () => {
                this.endTurn();
            });
        }

        const helpBtn = document.getElementById('helpBtn');
        if (helpBtn) {
            helpBtn.addEventListener('click', () => {
                const helpModal = document.getElementById('helpModal');
                if (helpModal) {
                    helpModal.style.display = 'block';
                }
            });
        }

        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => {
                const helpModal = document.getElementById('helpModal');
                if (helpModal) {
                    helpModal.style.display = 'none';
                }
            });
        }
    }

    handleCellClick(x, y) {
        const cell = this.gameState.grid.getCell(x, y);
        if (!cell) return;

        if (cell.hasToken()) {
            this.handleCellSelection(cell);
        } else {
            this.handleTokenPlacement(x, y);
        }
    }

    handleTokenPlacement(x, y) {
        const player = this.gameState.getCurrentPlayer();
        
        // Check if player has enough fragments to place a core
        if (player.getFragmentCount() >= this.rules.FRAGMENTS_PER_CORE) {
            if (this.gameState.placeToken(x, y, 'core')) {
                this.events.emit('tokenPlaced', {
                    x,
                    y,
                    type: 'core',
                    player: player
                });
                this.renderer.render(this.gameState);
            }
        } else {
            // Place a fragment if player doesn't have enough for a core
            if (this.gameState.placeToken(x, y, 'fragment')) {
                this.events.emit('tokenPlaced', {
                    x,
                    y,
                    type: 'fragment',
                    player: player
                });
                this.renderer.render(this.gameState);
            }
        }
    }

    handleCellSelection(cell) {
        if (this.gameState.turnPhase !== 'selecting') return;
        
        const player = this.gameState.getCurrentPlayer();
        const maxSelections = 1 + Math.floor(player.getFragmentCount() / this.rules.FRAGMENTS_PER_CORE);
        
        if (this.gameState.selectedCells.length >= maxSelections) {
            this.showError('Maximum selections reached');
            return;
        }

        if (cell.hasToken()) {
            const token = cell.getToken();
            if (token.getType() === 'fragment') {
                if (!player.canConvertFragments()) {
                    this.showError('Not enough fragments to convert');
                    return;
                }
                if (this.gameState.convertFragmentsToCore(player)) {
                    this.events.emit('fragmentsConverted', {
                        player: player,
                        fragmentsUsed: this.rules.FRAGMENTS_PER_CORE
                    });
                }
            }
        }

        this.gameState.selectedCells.push(cell);
        this.events.emit('cellSelected', { cell });
        this.renderer.render(this.gameState);
    }

    handleCellDeselection(cell) {
        if (this.gameState.turnPhase !== 'selecting') return;
        
        const index = this.gameState.selectedCells.indexOf(cell);
        if (index === -1) return;

        const player = this.gameState.getCurrentPlayer();
        const token = cell.getToken();
        
        if (token && token.getType() === 'fragment') {
            const result = this.rules.convertFragmentsToCore(player.getFragmentCount());
            if (result.success) {
                this.events.emit('fragmentsReturned', {
                    player: player,
                    fragments: result.fragmentsUsed
                });
            }
        }

        this.gameState.selectedCells.splice(index, 1);
        this.events.emit('cellDeselected', { cell });
        this.renderer.render(this.gameState);
    }

    handleCoreElimination(cell, eliminatedBy) {
        const result = this.gameState.handleCoreElimination(cell, eliminatedBy);
        this.events.emit('coreEliminated', {
            cell,
            eliminatedBy,
            fragments: result.fragments,
            value: result.value,
            player: result.player
        });
        this.renderer.render(this.gameState);
    }

    showError(message) {
        this.events.emit('error', { message });
    }

    endTurn() {
        this.gameState.switchPlayer();
        this.events.emit('playerSwitch', { currentPlayer: this.gameState.getCurrentPlayer() });
        this.renderer.render(this.gameState);
    }

    start() {
        this.renderer.render(this.gameState);
    }
} 