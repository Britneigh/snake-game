"use strict";
var Snake = /** @class */ (function () {
    function Snake(length, x, y, dx, dy, speed) {
        this.segments = []; //Stores segments of the snake
        this.headX = x;
        this.headY = y;
        this.length = length;
        this.dx = dx;
        this.dy = dy;
        this.speed = speed;
    }
    Snake.prototype.move = function () {
        //Snake moves in X & Y axis and so does the direction
        this.headX = this.headX + this.dx;
        this.headY = this.headY + this.dy;
        //create a new segment and push it into the snake segment array
        var newSegment = new Segment(this.headX, this.headY);
        this.segments.push(newSegment); //When the snake exceeds length, start removing the tail
        if (this.segments.length > this.length) {
            var tail = this.segments.shift(); //Snake stops increasing length unnecessarily
            gameBoard.removeChild(tail.div);
        }
        //Wall collision detection - Game Over
        if ((this.headY < 0) ||
            (this.headY >= 80) ||
            (this.headX < 0) ||
            (this.headX >= 40)) {
            this.gameOver();
        }
        if (this.hasBittenSelf()) {
            this.gameOver();
        }
        this.eatApple();
    };
    Snake.prototype.steer = function (direction) {
        //Make the snake change direction
        if (direction === "Up") {
            this.dy = -1;
            this.dx = 0;
        }
        else if (direction === "Down") {
            this.dy = 1;
            this.dx = 0;
        }
        else if (direction === "Left") {
            this.dy = 0;
            this.dx = -1;
        }
        else if (direction === "Right") {
            this.dy = 0;
            this.dx = 1;
        }
    };
    Snake.prototype.eatApple = function () {
        //When snake eats apple
        if (this.headX === apple.x) {
            if (this.headY === apple.y) {
                appleSound.play();
                this.length += 3; /* Increases the length of the snake by
                3 when it eats the apple */
                applesAte++;
                highScore++;
                update();
                apple.spawnApple();
            }
        }
    };
    //When snake has bitten itself
    Snake.prototype.hasBittenSelf = function () {
        //let divs = document.querySelectorAll(".snake")
        for (var i = 0; i < snake.segments.length - 1; i++) {
            var part = snake.segments[i];
            //console.log(divs[i].getBoundingClientRect())
            if (part.x === this.headX && part.y === this.headY) {
                return true;
            }
        }
    };
    Snake.prototype.gameOver = function () {
        applesAte = 0;
        backgroundMusic.pause();
        gameOverSound.play();
        alert("GAME OVER");
        window.location.reload(); //Refreshs page to start game again
        apple = new Apple(20, 30); //Sets apple position
        snake = new Snake(3, 20, 50, 0, 1, 1); //Sets snake position
    };
    return Snake;
}());
var Segment = /** @class */ (function () {
    function Segment(x, y) {
        this.x = x;
        this.y = y;
        this.div = document.createElement("div"); //document.getElementById("snake")
        gameBoard.appendChild(this.div);
        this.div.classList.add("snake");
        this.div.style.left = (this.x * 10) + "px";
        this.div.style.top = (this.y * 10) + "px";
    }
    return Segment;
}());
var Apple = /** @class */ (function () {
    function Apple(x, y) {
        this.x = x;
        this.y = y;
        this.div = document.getElementById("apple");
        this.div.style.left = (this.x * 10) + "px";
        this.div.style.top = (this.y * 10) + "px";
    }
    Apple.prototype.spawnApple = function () {
        this.x = Math.floor(Math.random() * 40); // Returns a random x value from 0 to 39
        this.y = Math.floor(Math.random() * 80); // Returns a random y value from 0 to 79
        apple = new Apple(this.x, this.y);
    };
    return Apple;
}());
//# sourceMappingURL=classes.js.map