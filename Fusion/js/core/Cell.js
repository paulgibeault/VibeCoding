export class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.token = null;
        this.value = null;
        this.selected = false;
        this.justPlaced = false;
        this.glow = 0;
    }

    setToken(type, player, value) {
        this.token = `${type}-${player}`;
        this.value = value;
        this.justPlaced = true;
    }

    clearToken() {
        this.token = null;
        this.value = null;
        this.justPlaced = false;
        this.selected = false;
        this.glow = 0;
    }

    select() {
        this.selected = true;
    }

    deselect() {
        this.selected = false;
    }

    isOccupied() {
        return this.token !== null;
    }

    getTokenType() {
        if (!this.token) return null;
        return this.token.split('-')[0];
    }

    getTokenPlayer() {
        if (!this.token) return null;
        return parseInt(this.token.split('-')[1]);
    }

    setGlow(value) {
        this.glow = value;
    }

    updateGlow() {
        if (this.glow > 0) {
            this.glow *= 0.98;
            if (this.glow < 0.01) this.glow = 0;
        }
    }
} 