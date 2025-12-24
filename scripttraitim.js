const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const total = 1000; 
let time = 0;
let forming = false;

function heartFunction(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { x, y };
}

let heartPoints = [];
for (let i = 0; i < total; i++) {
    const t = Math.random() * Math.PI * 2;
    const p = heartFunction(t);
    heartPoints.push({
        x: p.x * 17,
        y: p.y * 17,
        i
    });
}

class Particle {
    constructor() {
        this.resetRandom();
    }

    resetRandom() {
        this.x = canvas.width / 2 + (Math.random() - 0.5) * 4000;
        this.y = canvas.height / 2 + (Math.random() - 0.5) * 4000;
        this.size = Math.random() * 1.8 + 0.8;
        this.speed = Math.random() * 1.8 + 0.8;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
    }

    update(index) {
        if (!forming) {
            this.x += this.vx;
            this.y += this.vy;

            this.angle += 0.01;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
        } else {
            let target = heartPoints[index];
            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const rotate = time * 0.8;

            const tx =
                cx +
                target.x * Math.cos(rotate) -
                target.y * Math.sin(rotate);

            const ty =
                cy +
                target.x * Math.sin(rotate) +
                target.y * Math.cos(rotate);

            this.x += (tx - this.x) * 0.018;
            this.y += (ty - this.y) * 0.018;
        }
    }

    draw() {
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#ff66cc";
        ctx.fillStyle = "#ff99ff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < total; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.fillStyle = "rgba(5, 5, 20, 0.22)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    time += 0.01;

    particles.forEach((p, i) => {
        p.update(i);
        p.draw();
    });

    if (forming) {
        const pulse = 1 + Math.sin(time * 5) * 0.08;

        ctx.save();ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(pulse, pulse);

        ctx.shadowBlur = 60;
        ctx.shadowColor = "#ff44dd77";
        ctx.beginPath();
        ctx.arc(0, 0, 180, 0, Math.PI * 2);
        ctx.strokeStyle = "#ff33cc55";
        ctx.lineWidth = 12;
        ctx.stroke();

        ctx.restore();
    }

    requestAnimationFrame(animate);
}

animate();

setTimeout(() => {
    forming = true;
}, 8000);
