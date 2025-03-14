import { GameState } from './core/GameState.js';
import { GameRules } from './rules/GameRules.js';
import { GameRenderer } from './rendering/GameRenderer.js';
import { GameEventManager } from './events/GameEventManager.js';

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.gameState = new GameState();
        this.rules = new GameRules();
        this.renderer = new GameRenderer(this.canvas, this.ctx);
        this.events = new GameEventManager();
        this.setupEventListeners();
    }

    start() {
        this.gameState.reset();
        this.events.emit('gameStart', { gameState: this.gameState });
        this.gameLoop();
    }

    setupEventListeners() {
        // Canvas click handler
        this.canvas.onclick = (event) => this.handleCanvasClick(event);

        // Window resize handler
        window.addEventListener('resize', () => {
            this.renderer.resizeCanvas();
            this.events.emit('canvasResize', {
                width: this.canvas.width,
                height: this.canvas.height
            });
        });

        // End turn button
        const endTurnBtn = document.getElementById('endTurnBtn');
        if (endTurnBtn) {
            endTurnBtn.onclick = () => this.endTurn();
        }

        // Help button
        const helpBtn = document.getElementById('helpBtn');
        if (helpBtn) {
            helpBtn.onclick = () => this.showHelp();
        }

        // Close modal button
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.onclick = () => this.hideHelp();
        }
    }

    handleCanvasClick(event) {
        if (this.gameState.turnPhase !== 'selecting' || this.gameState.gameOver) {
            return;
        }

        const rect = this.canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / this.renderer.cellSize);
        const y = Math.floor((event.clientY - rect.top) / this.renderer.cellSize);

        if (this.rules.canPlaceToken(this.gameState, x, y)) {
            this.handleTokenPlacement(x, y);
        }
    }

    handleTokenPlacement(x, y) {
        const cell = this.gameState.grid.getCell(x, y);
        const currentPlayer = this.gameState.getCurrentPlayer();

        if (cell.selected) {
            this.deselectCell(cell);
        } else {
            this.selectCell(cell, currentPlayer);
        }

        this.events.emit('cellSelection', { x, y, cell });
    }

    selectCell(cell, player) {
        const maxSelections = 1 + player.chargedTokens;
        if (this.gameState.selectedCells.length >= maxSelections) {
            this.events.emit('error', { message: 'Cannot select more cells' });
            return;
        }

        const tokenType = this.gameState.selectedCells.length === 0 ? 'energy' : 'charged';
        if (tokenType === 'charged' && !player.canPlaceChargedToken()) {
            this.events.emit('error', { message: 'No charged cores available' });
            return;
        }

        cell.select();
        this.gameState.selectedCells.push({ x: cell.x, y: cell.y, type: tokenType });
        
        if (tokenType === 'energy') {
            this.gameState.placedEnergyToken = true;
        } else {
            player.useChargedToken();
        }

        this.renderer.animationManager.addSelectionParticles(
            cell.x * this.renderer.cellSize + this.renderer.cellSize / 2,
            cell.y * this.renderer.cellSize + this.renderer.cellSize / 2,
            player.color
        );
    }

    deselectCell(cell) {
        const index = this.gameState.selectedCells.findIndex(
            selected => selected.x === cell.x && selected.y === cell.y
        );

        if (index !== -1) {
            const deselected = this.gameState.selectedCells[index];
            if (deselected.type === 'charged') {
                this.gameState.getCurrentPlayer().addChargedTokens(1);
            } else {
                this.gameState.placedEnergyToken = false;
            }
            this.gameState.selectedCells.splice(index, 1);
        }

        cell.deselect();
    }

    endTurn() {
        const validation = this.rules.validateTurn(this.gameState);
        if (!validation.valid) {
            this.events.emit('error', { message: validation.message });
            return;
        }

        this.gameState.turnPhase = 'animation';
        this.events.emit('turnEnd', { gameState: this.gameState });

        this.processTurn();
    }

    processTurn() {
        // Place tokens
        this.gameState.selectedCells.forEach(selected => {
            const cell = this.gameState.grid.getCell(selected.x, selected.y);
            cell.setToken(
                selected.type,
                this.gameState.currentPlayer,
                selected.type === 'energy' ? 1 : 2
            );
        });

        // Clear selections
        this.gameState.selectedCells = [];

        // Process interactions
        setTimeout(() => {
            this.processInteractions();
        }, 500);
    }

    processInteractions() {
        // Process fusions and eliminations
        // This would be implemented based on your game rules
        // ...

        // Check for game over
        if (this.rules.isGameOver(this.gameState)) {
            this.handleGameOver();
        } else {
            this.switchPlayer();
        }
    }

    handleGameOver() {
        this.gameState.gameOver = true;
        const winner = this.rules.getWinner(this.gameState);
        this.events.emit('gameOver', { winner });
    }

    switchPlayer() {
        this.gameState.switchPlayer();
        this.events.emit('playerSwitch', {
            currentPlayer: this.gameState.getCurrentPlayer()
        });
    }

    showHelp() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.add('visible');
        }
    }

    hideHelp() {
        const modal = document.getElementById('helpModal');
        if (modal) {
            modal.classList.remove('visible');
        }
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        this.gameState.grid.forEach((cell) => cell.updateGlow());
        this.renderer.animationManager.update();
    }

    render() {
        this.renderer.render(this.gameState);
    }
} 