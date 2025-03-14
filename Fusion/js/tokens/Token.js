export class Token {
    constructor(player) {
        this.player = player;
    }

    getBaseValue() {
        return 1;
    }

    getType() {
        throw new Error('Token type must be implemented by subclass');
    }

    toString() {
        return `${this.getType()}-${this.player}`;
    }
} 