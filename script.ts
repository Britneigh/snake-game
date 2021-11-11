"use strict"
const score:HTMLSpanElement = document.getElementById("highScore")!
const appleCounter:HTMLSpanElement = document.getElementById("applesAte")!
const gameBoard:HTMLElement = document.getElementById("game-board")!
let highScore:number = 0
let applesAte:number = 0
const startBtn = document.getElementsByClassName("start")
document.querySelector(".apple")
let speed = 1
const appleSound = new Audio('Apple Bite sound effect.mp3')
const gameOverSound = new Audio('Defeat sound effect.mp3')
gameOverSound.volume = 0.3;
const backgroundMusic = new Audio('Wii Music.mp3')
backgroundMusic.volume = 0.2;

    let apple = new Apple(20,30) //Sets apple position
    let snake = new Snake(3,20,50,0,1,1) //Sets snake position
function gameStart(){
backgroundMusic.play();
setInterval(function(){
    snake.move()}, 100)
}


//Movement Controls
document.body.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" /*&& direction !== "Down"*/) {
        snake.steer("Up")
    }else if (e.key === "ArrowDown" /*&& direction !== "Up"*/) {
        snake.steer("Down")
    }else if (e.key === "ArrowLeft" /*&& direction !== "Right"*/) { 
        snake.steer("Left")
    }else if (e.key === "ArrowRight" /*&& direction !== "Left"*/) { 
        snake.steer("Right")
    }
   //To stop the ArrowUp and ArrowDown key from scrolling up/down
  e.preventDefault();
})

function update(){
score.innerHTML = `${highScore}`
appleCounter.innerHTML = `${applesAte}`
setInterval(function(){
    appleCounter.textContent = `${applesAte}`
    score.textContent = `${applesAte}`
})
}

if (applesAte > highScore) {
    highScore = applesAte
    newRecord()
}

function newRecord(){
     // Update highscore & saving to localStorage
    score.innerHTML = `${highScore}`
    localStorage.setItem("Highscore", JSON.stringify(highScore))
}
