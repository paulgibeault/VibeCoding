export class GameState {
    constructor() {
        this.currentPlayer = 0;
        this.players = [
            new Player("Player 1", PLAYER_COLORS[0], PLAYER_GLOW[0]),
            new Player("Player 2", PLAYER_COLORS[1], PLAYER_GLOW[1])
        ];
        this.grid = new Grid(GRID_SIZE);
        this.selectedCells = [];
        this.selectionMode = 'energy';
        this.turnPhase = 'selecting';
        this.placedEnergyToken = false;
        this.gameOver = false;
    }

    switchPlayer() {
        this.currentPlayer = 1 - this.currentPlayer;
        this.placedEnergyToken = false;
        this.turnPhase = 'selecting';
    }

    getCurrentPlayer() {
        return this.players[this.currentPlayer];
    }

    reset() {
        this.currentPlayer = 0;
        this.players.forEach(player => player.reset());
        this.grid.reset();
        this.selectedCells = [];
        this.selectionMode = 'energy';
        this.turnPhase = 'selecting';
        this.placedEnergyToken = false;
        this.gameOver = false;
    }
} 