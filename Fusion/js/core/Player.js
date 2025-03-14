export class Player {
    constructor(name, color, glowColor) {
        this.name = name;
        this.score = 0;
        this.chargedTokens = 0;
        this.color = color;
        this.glowColor = glowColor;
    }

    addScore(points) {
        this.score += points;
        return this.score >= WINNING_SCORE;
    }

    addChargedTokens(count) {
        this.chargedTokens += count;
    }

    useChargedToken() {
        if (this.chargedTokens > 0) {
            this.chargedTokens--;
            return true;
        }
        return false;
    }

    reset() {
        this.score = 0;
        this.chargedTokens = 0;
    }

    canPlaceChargedToken() {
        return this.chargedTokens > 0;
    }
} 