class Player {
    constructor(name, color, glowColor) {
        this.name = name;
        this.color = color;
        this.glowColor = glowColor;
        this.score = 0;
        this.energyFragments = 0;
        this.maxFragments = 9; // Maximum number of fragments a player can hold
    }

    reset() {
        this.score = 0;
        this.energyFragments = 0;
    }

    addScore(points) {
        this.score += points;
    }

    addEnergyFragments(fragments) {
        this.energyFragments = Math.min(this.energyFragments + fragments, this.maxFragments);
    }

    useFragments(fragments) {
        if (this.energyFragments >= fragments) {
            this.energyFragments -= fragments;
            return true;
        }
        return false;
    }

    getFragmentCount() {
        return this.energyFragments;
    }

    canConvertFragments() {
        return this.energyFragments >= 3; // Assuming 3 fragments needed for a core
    }
} 