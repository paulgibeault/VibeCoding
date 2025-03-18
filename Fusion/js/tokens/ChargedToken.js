import { Token } from './Token.js';

export class EnergyFragment extends Token {
    constructor(value) {
        super();
        this.value = value;
    }

    getType() {
        return 'fragment';
    }

    getBaseValue() {
        return this.value;
    }

    // Method to convert fragments to a core
    convertToCore() {
        return {
            type: 'energy',
            value: 1
        };
    }
} 