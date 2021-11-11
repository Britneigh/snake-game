"use strict";
var score = document.getElementById("highScore");
var appleCounter = document.getElementById("applesAte");
var gameBoard = document.getElementById("game-board");
var highScore = 0;
var applesAte = 0;
var startBtn = document.getElementsByClassName("start");
document.querySelector(".apple");
var speed = 1;
var appleSound = new Audio('Apple Bite sound effect.mp3');
var gameOverSound = new Audio('Defeat sound effect.mp3');
gameOverSound.volume = 0.3;
var backgroundMusic = new Audio('Wii Music.mp3');
backgroundMusic.volume = 0.2;
var apple = new Apple(20, 30); //Sets apple position
var snake = new Snake(3, 20, 50, 0, 1, 1); //Sets snake position
function gameStart() {
    backgroundMusic.play();
    setInterval(function () {
        snake.move();
    }, 100);
}
//Movement Controls
document.body.addEventListener("keydown", function (e) {
    if (e.key === "ArrowUp" /*&& direction !== "Down"*/) {
        snake.steer("Up");
    }
    else if (e.key === "ArrowDown" /*&& direction !== "Up"*/) {
        snake.steer("Down");
    }
    else if (e.key === "ArrowLeft" /*&& direction !== "Right"*/) {
        snake.steer("Left");
    }
    else if (e.key === "ArrowRight" /*&& direction !== "Left"*/) {
        snake.steer("Right");
    }
    //To stop the ArrowUp and ArrowDown key from scrolling up/down
    e.preventDefault();
});
function update() {
    score.innerHTML = "" + highScore;
    appleCounter.innerHTML = "" + applesAte;
    setInterval(function () {
        appleCounter.textContent = "" + applesAte;
        score.textContent = "" + applesAte;
    });
}
if (applesAte > highScore) {
    highScore = applesAte;
    newRecord();
}
function newRecord() {
    // Update highscore & saving to localStorage
    score.innerHTML = "" + highScore;
    localStorage.setItem("Highscore", JSON.stringify(highScore));
}
//# sourceMappingURL=script.js.map