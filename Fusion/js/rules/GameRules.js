export class GameRules {
    constructor(winningScore = 20) {
        this.winningScore = winningScore;
    }

    canPlaceToken(gameState, x, y) {
        const cell = gameState.grid.getCell(x, y);
        return !cell.isOccupied();
    }

    calculateFusion(cells, player) {
        let totalValue = 0;
        let hasChargedCore = false;

        cells.forEach(cell => {
            const value = cell.value || 
                (cell.getTokenType() === 'charged' ? 2 : 1);
            totalValue += value;
            if (cell.getTokenType() === 'charged') {
                hasChargedCore = true;
            }
        });

        return {
            newValue: totalValue,
            resultType: hasChargedCore ? 'charged' : 'energy'
        };
    }

    checkElimination(attackerValue, defenderValue) {
        return attackerValue > defenderValue;
    }

    isGameOver(gameState) {
        return gameState.players.some(player => player.score >= this.winningScore);
    }

    getWinner(gameState) {
        return gameState.players.findIndex(player => player.score >= this.winningScore);
    }

    validateTurn(gameState) {
        // Must place at least one energy token per turn
        if (!gameState.placedEnergyToken) {
            return {
                valid: false,
                message: "You must place one energy core!"
            };
        }

        return { valid: true };
    }

    getTokenValue(cell) {
        if (!cell.token) return 0;
        return cell.value || (cell.getTokenType() === 'charged' ? 2 : 1);
    }
} 