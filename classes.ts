class Snake{
    segments: Segment[]=[] //Stores segments of the snake
    headX:number
    headY:number
    length:number
    dx:number
    dy:number
    speed:number
    constructor(length:number,x:number,y:number,dx:number,dy:number,speed:number){
        this.headX = x
        this.headY = y
        this.length = length
        this.dx = dx
        this.dy = dy
        this.speed = speed
    }
    move(){
        //Snake moves in X & Y axis and so does the direction
        this.headX = this.headX + this.dx
        this.headY = this.headY + this.dy
     //create a new segment and push it into the snake segment array
     let newSegment = new Segment(this.headX, this.headY)
        this.segments.push(newSegment) //When the snake exceeds length, start removing the tail

        if (this.segments.length > this.length){
            let tail = this.segments.shift() //Snake stops increasing length unnecessarily
            gameBoard.removeChild(tail!.div)
        }

        //Wall collision detection - Game Over
       if ((this.headY < 0) || 
        (this.headY >= 80) ||
        (this.headX < 0) ||
        (this.headX >= 40)) {
            this.gameOver()
        }
        if (this.hasBittenSelf()){
            this.gameOver()
        }
        this.eatApple()

    }
    steer(direction:string){
        //Make the snake change direction
        if (direction === "Up"){
            this.dy = -1
            this.dx = 0
        }else if (direction === "Down"){
            this.dy = 1
            this.dx = 0
        }else if (direction === "Left"){
            this.dy = 0
            this.dx = -1
        }else if (direction === "Right"){
            this.dy = 0
            this.dx = 1
        }
    }
    eatApple(){
        //When snake eats apple
        if (this.headX === apple.x){

            if (this.headY === apple.y){
                appleSound.play();
                this.length += 3 /* Increases the length of the snake by
                3 when it eats the apple */
                applesAte++
                highScore++
                update()
                apple.spawnApple()
            }
        }
    }    
    //When snake has bitten itself
    hasBittenSelf(){
        //let divs = document.querySelectorAll(".snake")
        for(let i = 0; i < snake.segments.length -1; i++) {
            let part = snake.segments[i]
           //console.log(divs[i].getBoundingClientRect())
            if(part.x === this.headX && part.y === this.headY){
                return true
            }
        }
    }
    gameOver(){
        applesAte = 0
        backgroundMusic.pause();
        gameOverSound.play();
        alert("GAME OVER")
        window.location.reload(); //Refreshs page to start game again
        apple = new Apple(20,30) //Sets apple position
        snake = new Snake(3,20,50,0,1,1) //Sets snake position
    }
}



class Segment{
    div:HTMLDivElement
    x:number
    y:number
    constructor(x:number,y:number){
        this.x = x
        this.y = y
        this.div = document.createElement("div")//document.getElementById("snake")
        gameBoard.appendChild(this.div)
        this.div.classList.add("snake")
        this.div.style.left = (this.x * 10) + "px"
        this.div.style.top = (this.y * 10) + "px"
    }
    
}

class Apple{
    div:HTMLElement
    x
    y
    constructor(x:number,y:number){
        this.x = x
        this.y = y
        this.div = document.getElementById("apple")!
        this.div.style.left = (this.x * 10) + "px"
        this.div.style.top = (this.y * 10) + "px"
    }
    spawnApple(){
        this.x = Math.floor(Math.random() * 40) // Returns a random x value from 0 to 39
        this.y = Math.floor(Math.random() * 80) // Returns a random y value from 0 to 79
        apple = new Apple(this.x,this.y)
    }
    //If apple spawns on snake, spawn apple in a different position
    /*for (){
    if (snake.headX === apple.x){
        if (snake.headY === apple.y){
            return this.spawnApple();
        }
    } */
}

