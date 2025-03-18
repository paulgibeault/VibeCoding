class GameRenderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.cellSize = 60;
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = 8 * this.cellSize;
        this.canvas.height = 8 * this.cellSize;
    }

    render(gameState) {
        // Draw dark background
        this.ctx.fillStyle = '#1a1a1a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.drawGrid();
        this.drawTokens(gameState);
    }

    drawGrid() {
        // Draw glowing grid lines
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 1;

        // Draw vertical lines
        for (let x = 0; x <= 8; x++) {
            this.ctx.beginPath();
            this.ctx.moveTo(x * this.cellSize, 0);
            this.ctx.lineTo(x * this.cellSize, this.canvas.height);
            this.ctx.stroke();
        }

        // Draw horizontal lines
        for (let y = 0; y <= 8; y++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y * this.cellSize);
            this.ctx.lineTo(this.canvas.width, y * this.cellSize);
            this.ctx.stroke();
        }

        // Draw cell highlights
        this.ctx.strokeStyle = '#444';
        this.ctx.lineWidth = 1;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                this.ctx.strokeRect(
                    x * this.cellSize + 1,
                    y * this.cellSize + 1,
                    this.cellSize - 2,
                    this.cellSize - 2
                );
            }
        }
    }

    drawTokens(gameState) {
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const cell = gameState.grid.getCell(x, y);
                if (cell && cell.hasToken()) {
                    this.drawToken(cell, x, y, gameState);
                }
            }
        }
    }

    drawToken(cell, x, y, gameState) {
        const token = cell.getToken();
        const player = gameState.players[cell.getTokenPlayer()];
        
        if (token.getType() === 'fragment') {
            this.drawEnergyFragment(x, y, player.color, player.glowColor);
        } else {
            this.drawEnergyCore(x, y, player.color, player.glowColor);
        }
    }

    drawEnergyCore(x, y, color, glowColor) {
        const centerX = x * this.cellSize + this.cellSize / 2;
        const centerY = y * this.cellSize + this.cellSize / 2;
        const radius = this.cellSize * 0.4;

        // Draw glow effect
        const glowGradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius * 1.5
        );
        glowGradient.addColorStop(0, glowColor + '80');
        glowGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw core
        const coreGradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, radius
        );
        coreGradient.addColorStop(0, color);
        coreGradient.addColorStop(1, glowColor);
        this.ctx.fillStyle = coreGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw core border
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
    }

    drawEnergyFragment(x, y, color, glowColor) {
        const centerX = x * this.cellSize + this.cellSize / 2;
        const centerY = y * this.cellSize + this.cellSize / 2;
        const size = this.cellSize * 0.4;

        // Draw glow effect
        const glowGradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, size * 1.5
        );
        glowGradient.addColorStop(0, glowColor + '80');
        glowGradient.addColorStop(1, 'transparent');
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size * 1.5, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw hexagonal fragment
        const fragmentGradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, size
        );
        fragmentGradient.addColorStop(0, color);
        fragmentGradient.addColorStop(1, glowColor);
        this.ctx.fillStyle = fragmentGradient;
        
        this.ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const px = centerX + size * Math.cos(angle);
            const py = centerY + size * Math.sin(angle);
            if (i === 0) {
                this.ctx.moveTo(px, py);
            } else {
                this.ctx.lineTo(px, py);
            }
        }
        this.ctx.closePath();
        this.ctx.fill();

        // Draw fragment border
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Add energy lines
        this.ctx.strokeStyle = glowColor;
        this.ctx.lineWidth = 1;
        for (let i = 0; i < 3; i++) {
            const angle = (i * Math.PI * 2) / 3;
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(
                centerX + size * 0.8 * Math.cos(angle),
                centerY + size * 0.8 * Math.sin(angle)
            );
            this.ctx.stroke();
        }
    }
} 