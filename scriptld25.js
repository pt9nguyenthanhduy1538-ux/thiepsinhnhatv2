const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "0123456789";
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];

// Khởi tạo vị trí rơi
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

let loadingPhase = true; // giai đoạn loading

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#bb88ff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];

        if (loadingPhase) {
            // Loading: tất cả số rơi cùng tốc độ, đồng bộ
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            // tăng vị trí rơi
            drops[i]++;
            // reset khi đi hết màn hình
            if (drops[i] * fontSize > canvas.height) drops[i] = 0;
        } else {
            // Sau loading: số rơi lộn xộn
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }
}

// Vòng lặp 33ms (~30fps)
setInterval(drawMatrix, 33);

// Sau 8 giây, chuyển từ loading sang ready
setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("ready-screen").style.display = "block";
    loadingPhase = false;
}, 8000);

// Nút chuyển trang
function goNext() {
    window.location.href = "newpagetraitim.html"; 
}

// Resize canvas khi cửa sổ thay đổi
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
