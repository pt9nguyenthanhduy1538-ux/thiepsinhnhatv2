/* ====================== POSITION ORBIT IMAGES ====================== */

const items = document.querySelectorAll(".item");
const radius = 1000;
const total = items.length;

items.forEach((item, i) => {
    const angle = (i / total) * Math.PI * 2;

    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    // ảnh luôn hướng vào tâm
    item.style.transform =
        `translate3d(${x}px, 0px, ${z}px)
         rotateY(${(-angle * 180/Math.PI) - 90}deg)
         rotateX(10deg)`;
});


/* ====================== STARFIELD BACKGROUND ====================== */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let starArray = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    starArray = [];

    for (let i = 0; i < 250; i++) {
        starArray.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 0.3,
            speed: Math.random() * 0.4 + 0.1
        });
    }
}
resize();
window.onresize = resize;

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";

    starArray.forEach(star => {
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        ctx.fillRect(star.x, star.y, star.size, star.size);

        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
    });

    requestAnimationFrame(drawStars);
}
drawStars();
function goBack() {
    window.location.href = "newpagemain.html";
}
