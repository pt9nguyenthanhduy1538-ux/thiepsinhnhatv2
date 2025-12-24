// ------------------ BACKGROUND SNOW + STARS ------------------
const snowbg = document.getElementById("snowbg");
const sbg = snowbg.getContext("2d");

snowbg.width = window.innerWidth;
snowbg.height = window.innerHeight;

let flakes = [];
let stars = [];

for (let i = 0; i < 120; i++) {
    flakes.push({
        x: Math.random() * snowbg.width,
        y: Math.random() * snowbg.height,
        r: Math.random() * 2 + 1,
        s: Math.random() * 1 + 0.5
    });
}

for (let i = 0; i < 80; i++) {
    stars.push({
        x: Math.random() * snowbg.width,
        y: Math.random() * snowbg.height * 0.6,
        a: Math.random() * 1,
        v: Math.random() * 0.02 + 0.01
    });
}

function drawBackground() {
    sbg.clearRect(0, 0, snowbg.width, snowbg.height);

    // ⭐ Sao lấp lánh
    stars.forEach(s => {
        s.a += s.v;
        sbg.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(s.a) * 0.3})`;
        sbg.fillRect(s.x, s.y, 2, 2);
    });

    // ❄ Tuyết rơi
    flakes.forEach(f => {
        sbg.beginPath();
        sbg.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        sbg.fillStyle = "rgba(255,255,255,0.8)";
        sbg.fill();

        f.y += f.s;
        if (f.y > snowbg.height) {
            f.y = -5;
            f.x = Math.random() * snowbg.width;
        }
    });

    requestAnimationFrame(drawBackground);
}

drawBackground();
const canvas = document.getElementById("cansnow");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const total = 1700; // số hạt
let mode = "free"; // free → snow → heart → text
let startTime = Date.now();

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize = resize;

// Tạo hạt
for (let i = 0; i < total; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 1.5 + Math.random() * 2,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        tx: 0,
        ty: 0
    });
}

/* ---------------------- HÌNH BÔNG TUYẾT ---------------------- */
function snowflakePoints(t) {
    const scale = Math.min(canvas.width, canvas.height) * 0.22; 
    const x = Math.sin(t * 6) * Math.cos(t) * scale;
    const y = Math.sin(t) * Math.cos(t * 6) * scale;
    return { x, y };
}

/* ---------------------- HÌNH TRÁI TIM ---------------------- */
function heartPoints(t) {
    const scale = Math.min(canvas.width, canvas.height) * 0.14;
    const x = 16 * Math.pow(Math.sin(t), 3) * scale / 16;
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale / 15;
    return { x, y };
}

/* ---------------------- CHỮ “NOEL VUI VẺ” ---------------------- */
function generateTextPoints(text) {
    const temp = document.createElement("canvas");
    const tctx = temp.getContext("2d");
    temp.width = 800;
    temp.height = 300;

    tctx.fillStyle = "white";
    tctx.font = "90px Poppins";   // nhỏ hơn theo yêu cầu
    tctx.textAlign = "center";
    tctx.fillText(text, 400, 150);

    let arr = [];
    const gap = 5;

    const img = tctx.getImageData(0, 0, temp.width, temp.height).data;
    for (let y = 0; y < temp.height; y += gap) {
        for (let x = 0; x < temp.width; x += gap) {
            const index = (y * temp.width + x) * 4;
            if (img[index + 3] > 150) {
                arr.push({
                    x: x - temp.width / 2,
                    y: y - temp.height / 2
                });
            }
        }
    }
    return arr;
}

let textPoints = generateTextPoints("NOEL VUI VẺ");

/* ---------------------- UPDATE MODE ---------------------- */
function updateMode() {
    const t = (Date.now() - startTime) / 1000;

    if (t < 5) mode = "free";                // hạt bay loạn 5s
    else if (t < 12) mode = "snow";          // bông tuyết 7s
    else if (t < 17) mode = "heart";         // trái tim 5s
    else mode = "text";                      // chữ Noel Vui Vẻ đứng yên sáng nhẹ
}

/* ---------------------- VẼ ---------------------- */
function animate() {
    updateMode();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        if (mode === "free") {
            p.x += p.vx;
            p.y += p.vy;
        }

        if (mode === "snow") {
            let t = (i / total) * Math.PI * 2;
            let pos = snowflakePoints(t);
            p.tx = canvas.width / 2 + pos.x;
            p.ty = canvas.height / 2 + pos.y;
            p.x += (p.tx - p.x) * 0.05;
            p.y += (p.ty - p.y) * 0.05;
        }

        if (mode === "heart") {
            let t = (i / total) * Math.PI * 2;
            let pos = heartPoints(t);
            p.tx = canvas.width / 2 + pos.x;
            p.ty = canvas.height / 2 + pos.y;
            p.x += (p.tx - p.x) * 0.05;
            p.y += (p.ty - p.y) * 0.05;
        }

        if (mode === "text") {
            const index = i % textPoints.length;
            p.tx = canvas.width / 2 + textPoints[index].x;
            p.ty = canvas.height / 2 + textPoints[index].y;

            p.x += (p.tx - p.x) * 0.08;
            p.y += (p.ty - p.y) * 0.08;
        }

        // hạt lấp lánh nhẹ khi ở chế độ chữ
        if (mode === "text") {
            ctx.fillStyle = `rgba(255,255,255,${0.7 + Math.sin(i + Date.now() * 0.003) * 0.3})`;
        } else {
            ctx.fillStyle = "white";
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
    });

    requestAnimationFrame(animate);
}

animate();
// ------------------ ❄ PARTICLE CLASS (BÔNG TUYẾT) ------------------
class Particle {
    constructor() {
        this.resetRandom();
    }

    resetRandom() {
        this.x = canvas.width / 2 + (Math.random() - 0.5) * 4000;
        this.y = canvas.height / 2 + (Math.random() - 0.5) * 4000;
        this.size = Math.random() * 1.8 + 0.8;
        this.speed = Math.random() * 1.5 + 0.6;
        this.angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
    }

    update(i) {
        if (!forming) {
            // bay loạn
            this.x += this.vx;
            this.y += this.vy;

            this.angle += 0.01;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
        } else {
            // tụ lại theo hình
            let t = pointList[i];

            if (currentShape === "heart") {
                const tt = heartFunction(i * 0.02);
                t = { x: tt.x * 12, y: tt.y * 12 };
            }
            if (currentShape === "text") {
                t = textPoints[i % textPoints.length];
            }

            const cx = canvas.width / 2;
            const cy = canvas.height / 2;

            const tx = cx + t.x;
            const ty = cy + t.y;

            this.x += (tx - this.x) * 0.02;
            this.y += (ty - this.y) * 0.02;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle * 0.2);

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.1;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ccefff";

        const r = this.size * 3;

        // 6 cánh ❄
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(0, r);
            ctx.stroke();

            // nhánh phụ
            ctx.beginPath();
            ctx.moveTo(0, r * 0.6);
            ctx.lineTo(r * 0.25, r * 0.85);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, r * 0.6);
            ctx.lineTo(-r * 0.25, r * 0.85);
            ctx.stroke();

            ctx.rotate(Math.PI / 3);
        }

        ctx.restore();
    }
}
document.getElementById("backBtn").onclick = () => {
    window.location.href = "newpagemain.html";
};
