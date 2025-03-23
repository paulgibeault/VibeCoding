import { AnimationManager } from './AnimationManager.js';

export class GameRenderer {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.animationManager = new AnimationManager(canvas, ctx);
        this.cellSize = 0;
        this.resizeCanvas();
    }

    /**
     * Converts screen coordinates to grid coordinates with high precision
     * @param {number} screenX - X coordinate from click event
     * @param {number} screenY - Y coordinate from click event
     * @returns {{x: number, y: number} | null} Grid coordinates or null if invalid
     */
    screenToGridCoordinates(screenX, screenY) {
        try {
            const rect = this.canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            
            // Convert screen coordinates to canvas coordinates, accounting for DPR
            const canvasX = (screenX - rect.left) * (this.canvas.width / (rect.width * dpr));
            const canvasY = (screenY - rect.top) * (this.canvas.height / (rect.height * dpr));
            
            // Convert to grid coordinates with precise rounding
            const x = Math.floor(canvasX / this.cellSize);
            const y = Math.floor(canvasY / this.cellSize);
            
            // Validate coordinates are within grid bounds
            if (x < 0 || x >= 8 || y < 0 || y >= 8) {
                return null;
            }
            
            return { x, y };
        } catch (error) {
            console.error('Error converting screen coordinates to grid:', error);
            return null;
        }
    }

    resizeCanvas() {
        const container = this.canvas.parentElement;
        const size = Math.min(container.clientWidth, container.clientHeight);
        const dpr = window.devicePixelRatio || 1;
        
        // Set the canvas size in CSS pixels
        this.canvas.style.width = `${size}px`;
        this.canvas.style.height = `${size}px`;
        
        // Set the canvas size in actual pixels
        this.canvas.width = size * dpr;
        this.canvas.height = size * dpr;
        
        // Scale the context to account for DPR
        this.ctx.scale(dpr, dpr);
        
        // Calculate cell size in CSS pixels
        this.cellSize = size / 8; // Assuming 8x8 grid
    }

    render(gameState) {
        this.clear();
        this.drawGridBackground();
        this.drawGrid();
        this.drawTokensAndSelections(gameState);
        this.drawAnimations();
        this.drawParticles();
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawGridBackground() {
        // Background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
        gradient.addColorStop(0, '#2a3d45');
        gradient.addColorStop(1, '#253035');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Subtle grid pattern
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                if ((x + y) % 2 === 0) {
                    this.ctx.fillRect(
                        x * this.cellSize,
                        y * this.cellSize,
                        this.cellSize,
                        this.cellSize
                    );
                }
            }
        }
    }

    drawGrid() {
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        this.ctx.lineWidth = 1;

        // Draw horizontal lines
        for (let i = 0; i <= 8; i++) {
            const y = i * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.canvas.width, y);
            this.ctx.stroke();
        }

        // Draw vertical lines
        for (let i = 0; i <= 8; i++) {
            const x = i * this.cellSize;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.canvas.height);
            this.ctx.stroke();
        }
    }

    drawTokensAndSelections(gameState) {
        gameState.grid.forEach((cell, x, y) => {
            const centerX = x * this.cellSize + this.cellSize / 2;
            const centerY = y * this.cellSize + this.cellSize / 2;
            const radius = this.cellSize * 0.4;

            if (cell.selected) {
                this.drawSelection(centerX, centerY, gameState.currentPlayer);
            }

            if (cell.token) {
                this.drawToken(cell, centerX, centerY, radius);
            }
        });
    }

    drawSelection(centerX, centerY, player) {
        // Highlight background
        const grd = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, this.cellSize * 0.6
        );
        grd.addColorStop(0, PLAYER_GLOW[player]);
        grd.addColorStop(1, 'rgba(0, 0, 0, 0)');

        this.ctx.fillStyle = grd;
        this.ctx.fillRect(
            centerX - this.cellSize / 2,
            centerY - this.cellSize / 2,
            this.cellSize,
            this.cellSize
        );

        // Draw border
        this.ctx.strokeStyle = PLAYER_COLORS[player];
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(
            centerX - this.cellSize / 2 + 2,
            centerY - this.cellSize / 2 + 2,
            this.cellSize - 4,
            this.cellSize - 4
        );
    }

    drawToken(cell, centerX, centerY, radius) {
        const player = cell.getTokenPlayer();
        const type = cell.getTokenType();

        if (type === 'energy') {
            this.drawEnergyToken(centerX, centerY, radius, player, cell.glow);
        } else {
            this.drawChargedToken(centerX, centerY, radius, player, cell.glow);
        }

        if (cell.value && cell.value > 1) {
            this.drawTokenValue(centerX, centerY, radius, cell.value);
        }
    }

    drawTokenValue(x, y, radius, value) {
        // Background circle
        this.ctx.fillStyle = 'rgba(0,0,0,0.6)';
        this.ctx.beginPath();
        this.ctx.arc(x + radius * 0.6, y - radius * 0.6, radius * 0.3, 0, Math.PI * 2);
        this.ctx.fill();

        // Value text
        this.ctx.font = `bold ${Math.floor(radius * 0.5)}px Arial`;
        this.ctx.fillStyle = 'white';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(value.toString(), x + radius * 0.6, y - radius * 0.6);
    }

    drawEnergyToken(x, y, radius, player, glow = 0) {
        // Implementation from your existing drawEnergyToken function
        // ... (copy the existing implementation)
    }

    drawChargedToken(x, y, radius, player, glow = 0) {
        // Implementation from your existing drawChargedToken function
        // ... (copy the existing implementation)
    }

    drawAnimations() {
        this.animationManager.animations.forEach(anim => {
            switch (anim.type) {
                case 'placement':
                    this.drawPlacementAnimation(anim);
                    break;
                case 'fusion':
                    this.drawFusionAnimation(anim);
                    break;
                case 'elimination':
                    this.drawEliminationAnimation(anim);
                    break;
                case 'victory-pulse':
                    this.drawVictoryPulseAnimation(anim);
                    break;
                case 'score-update':
                    this.drawScoreUpdateAnimation(anim);
                    break;
            }
        });
    }

    drawParticles() {
        this.animationManager.particles.forEach(particle => {
            this.ctx.globalAlpha = particle.alpha;
            this.ctx.fillStyle = particle.color;
            
            this.ctx.shadowColor = particle.color;
            this.ctx.shadowBlur = particle.radius * 2;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.shadowColor = 'transparent';
            this.ctx.shadowBlur = 0;
        });
        
        this.ctx.globalAlpha = 1.0;
    }
} 