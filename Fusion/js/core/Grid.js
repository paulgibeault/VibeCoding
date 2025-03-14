import { Cell } from './Cell.js';

export class Grid {
    constructor(size) {
        this.size = size;
        this.cells = this.initializeCells();
    }

    initializeCells() {
        return Array(this.size).fill().map((_, y) => 
            Array(this.size).fill().map((_, x) => new Cell(x, y))
        );
    }

    getCell(x, y) {
        return this.cells[y][x];
    }

    getAdjacentCells(x, y) {
        const directions = [
            {dx: 1, dy: 0}, {dx: -1, dy: 0},
            {dx: 0, dy: 1}, {dx: 0, dy: -1}
        ];
        
        return directions
            .map(dir => ({
                x: x + dir.dx,
                y: y + dir.dy
            }))
            .filter(pos => this.isValidPosition(pos.x, pos.y))
            .map(pos => ({
                cell: this.getCell(pos.x, pos.y),
                x: pos.x,
                y: pos.y
            }));
    }

    isValidPosition(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    reset() {
        this.cells = this.initializeCells();
    }

    clearCell(x, y) {
        this.getCell(x, y).clearToken();
    }

    forEach(callback) {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                callback(this.getCell(x, y), x, y);
            }
        }
    }
} 