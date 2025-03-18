class GameState {
    constructor() {
        this.grid = new Grid(8, 8);
        this.players = [
            new Player('Player 1', '#ff4444', '#ff8888'),
            new Player('Player 2', '#4444ff', '#8888ff')
        ];
        this.currentPlayerIndex = 0;
        this.selectedCells = [];
        this.placedEnergyToken = false;
        this.turnPhase = 'selecting';
        this.gameOver = false;
        this.rules = new GameRules();
        this.reset();
    }

    reset() {
        this.grid.reset();
        this.players.forEach(player => player.reset());
        this.currentPlayerIndex = 0;
        this.selectedCells = [];
        this.placedEnergyToken = false;
        this.turnPhase = 'selecting';
        this.gameOver = false;
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayerIndex];
    }

    switchPlayer() {
        this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.players.length;
        this.selectedCells = [];
        this.placedEnergyToken = false;
        this.turnPhase = 'selecting';
    }

    handleCoreElimination(cell, eliminatedBy) {
        const player = this.players[cell.getTokenPlayer()];
        const token = cell.getToken();
        const value = token.getValue();
        player.addScore(value);
        
        const fragments = this.rules.calculateFragmentsFromElimination(value);
        eliminatedBy.addFragments(fragments);
        
        cell.clearToken();
        
        return {
            fragments,
            value,
            player: eliminatedBy
        };
    }

    convertFragmentsToCore(player) {
        if (this.rules.convertFragmentsToCore(player.getFragmentCount()).success) {
            player.useFragments(this.rules.FRAGMENTS_PER_CORE);
            return true;
        }
        return false;
    }

    placeToken(x, y, type) {
        const cell = this.grid.getCell(x, y);
        if (!cell || cell.hasToken()) return false;

        const player = this.getCurrentPlayer();
        const token = new Token(type, this.currentPlayerIndex);
        cell.setToken(token, this.currentPlayerIndex, token.getValue());
        
        if (type === 'core') {
            player.useFragments(this.rules.FRAGMENTS_PER_CORE);
        }
        
        return true;
    }
} 