let bar = document.querySelector(".loading-bar");
let text = document.querySelector(".loading-text");
let box = document.getElementById("readyBox");
let btn = document.getElementById("readyBtn");

let width = 0;

let load = setInterval(() => {
    width++;
    bar.style.width = width + "%";

    if (width >= 100) {
        clearInterval(load);

        text.style.display = "none";

        // hiện khung sẵn sàng
        box.style.display = "flex";
    }
}, 40);

// ⭐ Bấm để sang trang khác
btn.addEventListener("click", () => {
    window.location.href = "newpagenoel.html"; // đổi tên file trang tiếp theo
});
