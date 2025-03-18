class Grid {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = [];
        this.initialize();
    }

    initialize() {
        for (let y = 0; y < this.height; y++) {
            this.cells[y] = [];
            for (let x = 0; x < this.width; x++) {
                this.cells[y][x] = new Cell(x, y);
            }
        }
    }

    getCell(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return null;
        }
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
        return x >= 0 && x < this.width && y >= 0 && y < this.height;
    }

    reset() {
        this.initialize();
    }

    clearCell(x, y) {
        this.getCell(x, y).clearToken();
    }

    forEach(callback) {
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                callback(this.getCell(x, y), x, y);
            }
        }
    }

    getPlayerTokenCount(player) {
        let count = 0;
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                const cell = this.cells[y][x];
                if (cell.hasToken() && cell.getTokenPlayer() === player) {
                    count++;
                }
            }
        }
        return count;
    }
} 