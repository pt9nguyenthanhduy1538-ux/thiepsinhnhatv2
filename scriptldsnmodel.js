// ---------------- MATRIX BACKGROUND ----------------
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const letters = "0123456789";
const fontSize = 18;
const columns = Math.floor(canvas.width / fontSize);
const drops = [];

for (let i = 0; i < columns; i++) drops[i] = 1;

function drawMatrix() {
    ctx.fillStyle = "rgba(0,0,0,0.07)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#bb88ff";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random()*letters.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize>canvas.height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
    }
}
const matrixInterval = setInterval(drawMatrix,33);

window.addEventListener("resize",()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
});

// ---------------- BINARY BAR LOADING ----------------
const bar = document.getElementById("binary-bar");
const totalCells = 30;

for(let i=0;i<totalCells;i++){
    const cell = document.createElement("div");
    cell.className="binary-cell";
    cell.textContent = Math.random()>0.5?"0":"1";
    bar.appendChild(cell);
}

let loaded=0;
const binaryInterval=setInterval(()=>{
    const cell = bar.children[loaded];
    if(cell){
        cell.textContent = Math.random()>0.5?"0":"1";
        cell.style.background="#00ff88";
    }
    loaded++;
    if(loaded>=totalCells){
        clearInterval(binaryInterval);
        setTimeout(()=>{
            document.getElementById("binary-loading-screen").style.display="none";
            document.getElementById("ready-screen").style.display="block";
        },300);
    }
},150);

// ---------------- BUTTON → NEXT PAGE ----------------
document.getElementById("ready-box").addEventListener("click",()=>{
    // Dừng Matrix trước khi chuyển
    clearInterval(matrixInterval);

    // Chuyển sang HTML khác
    window.location.href = "newpagesnmodel.html"; // Thay link trang khác ở đây
});
