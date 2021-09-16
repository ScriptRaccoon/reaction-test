const game = document.getElementById("game");
const intro = document.getElementById("intro");
const evaluation = document.getElementById("evaluation");
const number = document.getElementById("number");
const plus = document.getElementById("plus");
const times = document.getElementById("times");
const averageEl = document.getElementById("average");

let currentState = "intro";
let animation = null;
let startTime = null;
let timesList = [];
let counting = false;
let counter = 0;
let currentNumber = 0;
const rounds = 20;

document.addEventListener("keydown", (e) => {
    if (e.code == "Space") {
        if (currentState === "game" && counting) {
            counting = false;
            setTimeout(() => {
                resetCounter();
                showNextNumber();
            }, 2000);
        } else if (currentState === "intro" || currentState === "evaluation") {
            currentState = "game";
            startGame();
        }
    }
});

function startGame() {
    intro.style.display = "none";
    evaluation.style.display = "none";
    game.style.display = "flex";
    currentNumber = 0;
    timesList = [];
    averageEl.innerText = "";
    times.innerText = "";
    resetCounter();
    showNextNumber();
}

function showNextNumber() {
    currentNumber++;
    if (currentNumber > rounds) {
        showEvaluation();
    } else {
        const randomTime = 2000 + Math.floor(Math.random() * 8000);
        setTimeout(() => {
            startCounter();
        }, randomTime);
    }
}

function resetCounter() {
    counting = false;
    number.style.display = "none";
    plus.style.display = "block";
    number.innerText = "0";
    counter = 0;
}

function startCounter() {
    number.style.display = "block";
    plus.style.display = "none";
    startTime = new Date().getTime();
    counting = true;
    count();
}

function count() {
    counter = new Date().getTime() - startTime;
    number.innerText = counter;
    if (counting) {
        requestAnimationFrame(count);
    } else {
        timesList.push(counter);
    }
}

function showEvaluation() {
    intro.style.display = "none";
    game.style.display = "none";
    evaluation.style.display = "flex";
    currentState = "evaluation";
    times.innerText = timesList.join(", ");
    averageEl.innerText = Math.round(average(timesList));
}

function average(arr) {
    if (arr.length == 0) {
        return 0;
    }
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}
