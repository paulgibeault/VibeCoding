export class AnimationManager {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.animations = [];
        this.particles = [];
    }

    addAnimation(type, params) {
        const animation = {
            type,
            ...params,
            progress: 0
        };
        this.animations.push(animation);
    }

    addParticle(particle) {
        this.particles.push(particle);
    }

    update() {
        // Update animations
        this.animations = this.animations.filter(anim => {
            anim.progress++;
            return anim.progress < anim.duration;
        });

        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life--;
            particle.alpha = particle.life / particle.maxLife;
            return particle.life > 0;
        });
    }

    clear() {
        this.animations = [];
        this.particles = [];
    }

    hasActiveAnimations() {
        return this.animations.length > 0 || this.particles.length > 0;
    }

    createParticle(x, y, color, options = {}) {
        const defaults = {
            speed: 1 + Math.random() * 2,
            angle: Math.random() * Math.PI * 2,
            radius: 2 + Math.random() * 3,
            life: 30 + Math.random() * 20
        };

        const settings = { ...defaults, ...options };

        return {
            x,
            y,
            vx: Math.cos(settings.angle) * settings.speed,
            vy: Math.sin(settings.angle) * settings.speed,
            radius: settings.radius,
            color,
            alpha: 1,
            life: settings.life,
            maxLife: settings.life
        };
    }

    addSelectionParticles(x, y, color) {
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2;
            this.addParticle(this.createParticle(x, y, color, { angle }));
        }
    }

    addExplosionParticles(x, y, color, count = 20) {
        for (let i = 0; i < count; i++) {
            this.addParticle(this.createParticle(x, y, color, {
                speed: 2 + Math.random() * 3,
                life: 40 + Math.random() * 20
            }));
        }
    }
} 