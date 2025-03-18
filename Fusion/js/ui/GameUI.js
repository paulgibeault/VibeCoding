class GameUI {
    constructor(game) {
        this.game = game;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.game.events.on('fragmentsConverted', this.handleFragmentsConverted.bind(this));
        this.game.events.on('fragmentsReturned', this.handleFragmentsReturned.bind(this));
        this.game.events.on('coreEliminated', this.handleCoreEliminated.bind(this));
        this.game.events.on('playerSwitch', this.handlePlayerSwitch.bind(this));
        this.game.events.on('cellSelection', this.handleCellSelection.bind(this));
        this.game.events.on('error', this.handleError.bind(this));
    }

    handleFragmentsConverted({ player, fragmentsUsed }) {
        this.updatePlayerCard(player);
        this.showNotification(`${player.name} converted ${fragmentsUsed} fragments into a core!`);
    }

    handleFragmentsReturned({ player, fragments }) {
        this.updatePlayerCard(player);
        this.showNotification(`${player.name} returned ${fragments} fragments`);
    }

    handleCoreEliminated({ eliminatedBy, fragments, value, player }) {
        this.updatePlayerCard(player);
        this.showNotification(`${this.game.gameState.players[eliminatedBy].name} eliminated a value ${value} core! ${player.name} received ${fragments} fragments.`);
    }

    handlePlayerSwitch({ currentPlayer }) {
        // Update current player indicator
        document.querySelectorAll('.player-card').forEach(card => {
            card.classList.toggle('current', card.dataset.player === currentPlayer.name);
        });
    }

    handleCellSelection({ cell }) {
        // Update token count for the current player
        const currentPlayer = this.game.gameState.getCurrentPlayer();
        this.updatePlayerCard(currentPlayer);
    }

    handleError({ message }) {
        this.showNotification(message, 'error');
    }

    updatePlayerCard(player) {
        const playerCard = document.querySelector(`.player-card[data-player="${player.name}"]`);
        if (!playerCard) return;

        // Update score
        const scoreValue = playerCard.querySelector('.score-value');
        if (scoreValue) {
            scoreValue.textContent = player.score;
        }

        // Update fragment count and chamber
        const fragmentCount = playerCard.querySelector('.fragment-count');
        const fragmentChamber = playerCard.querySelector('.fragment-chamber');
        if (fragmentCount) {
            fragmentCount.textContent = player.getFragmentCount();
        }
        if (fragmentChamber) {
            const percentage = (player.getFragmentCount() / player.maxFragments) * 100;
            fragmentChamber.style.setProperty('--fill-percentage', `${percentage}%`);
            fragmentChamber.classList.toggle('full', player.getFragmentCount() >= player.maxFragments);
        }

        // Update token count
        const tokenValue = playerCard.querySelector('.token-value');
        if (tokenValue) {
            tokenValue.textContent = this.game.gameState.grid.getPlayerTokenCount(player);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `game-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
} 