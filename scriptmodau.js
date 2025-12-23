const bee = document.querySelector(".bee");
const flower = document.querySelector(".flower");
const enterBox = document.querySelector(".enter-box");
const enterBtn = document.getElementById("enterBtn");

let beePos = window.innerWidth - 100; 
const targetLeft = 60; 

const interval = setInterval(() => {
    if(beePos > targetLeft){
        beePos -= 2; 
        bee.style.right = (window.innerWidth - beePos - 50) + "px"; 
    } else {
        clearInterval(interval);
        bee.style.display = "none"; 
        enterBox.style.display = "flex"; 
    }
}, 30);

enterBtn.addEventListener("click", () => {
    window.location.href = "index2.html";
});
