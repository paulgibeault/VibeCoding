class GameRules {
    constructor() {
        this.FRAGMENTS_PER_CORE = 3;
    }

    canPlaceToken(gameState, x, y) {
        const cell = gameState.grid.getCell(x, y);
        if (!cell) return false;
        if (cell.hasToken()) return false;
        return true;
    }

    calculateFragmentsFromElimination(value) {
        return value; // Each core's value becomes fragments
    }

    convertFragmentsToCore(fragmentCount) {
        if (fragmentCount >= this.FRAGMENTS_PER_CORE) {
            return {
                success: true,
                fragmentsUsed: this.FRAGMENTS_PER_CORE
            };
        }
        return {
            success: false,
            fragmentsUsed: 0
        };
    }

    getTokenValue(token) {
        if (!token) return 0;
        return token.getType() === 'fragment' ? token.getBaseValue() : 1;
    }
} 