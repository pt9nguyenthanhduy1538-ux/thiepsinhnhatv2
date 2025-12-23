const loadingBar = document.querySelector(".loading-bar");
let width = 0;

const interval = setInterval(() => {
    width += 1; 
    loadingBar.style.width = width + "%"; 

    if (width >= 100) {
        clearInterval(interval); 
        document.querySelector(".loading-container").style.display = "none"; 
        document.querySelector(".center-box").style.display = "flex"; 
    }
}, 50); 

document.getElementById("enterBtn").addEventListener("click", () => {
    window.location.href = "newpagemain.html"; 
});
