const snowContainer = document.querySelector('.snow-container');

function createSnow() {
    const snow = document.createElement('div');
    snow.classList.add('snowflake');
    snow.textContent = '❄️';
    snow.style.left = Math.random()*100 + 'vw';
    snow.style.fontSize = 10 + Math.random()*15 + 'px';
    snow.style.animationDuration = 5 + Math.random()*5 + 's';
    snowContainer.appendChild(snow);
    setTimeout(()=> snow.remove(), 10000);
}

setInterval(createSnow, 200);
function goBack() {
    window.location.href = 'newpagenoel.html';

}
