let input = "";

function pressNum(n) {
    if (input.length < 8) {
        input += n;
        document.getElementById("screen").value = input;
    }
}

function deleteNum() {
    input = input.slice(0, -1);
    document.getElementById("screen").value = input;
}

function checkPass() {
    if (input === "25122010") {
        window.location.href = "newpagemain.html"; 
    } else {
        alert("Sai rồi bé yêu ơi 😳💗");
    }
}

