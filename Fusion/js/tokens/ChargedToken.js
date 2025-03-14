import { Token } from './Token.js';

export class ChargedToken extends Token {
    getType() {
        return 'charged';
    }

    getBaseValue() {
        return 2;
    }
} 