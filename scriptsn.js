const confettiContainer = document.querySelector('.confetti-container');
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = Math.random()*100+'vw';
    confetti.style.backgroundColor = `hsl(${Math.random()*360},70%,70%)`;
    confetti.style.width = 5+Math.random()*5+'px';
    confetti.style.height = 10+Math.random()*10+'px';
    confetti.style.animationDuration = 3+Math.random()*2+'s';
    confettiContainer.appendChild(confetti);
    setTimeout(()=>{ confetti.remove(); },5000);
}

setInterval(()=>{ if(Math.random()<0.5) createConfetti(); },200);
function goBack() {
    window.location.href = 'newpage.html';
}