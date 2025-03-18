class Token {
    constructor(type, player, value = 1) {
        this.type = type;
        this.player = player;
        this.value = value;
    }

    getType() {
        return this.type;
    }

    getValue() {
        return this.value;
    }

    getPlayer() {
        return this.player;
    }
} 