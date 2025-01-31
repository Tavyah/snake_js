let tileSizeX = 20;
let tileSizeY = 20;
let snakeSize = 15;
let snakePosX;
let snakePosY;
let snakeSpeed = 2;
let snakeBody = [];
let gameOver = false;
let score = 0;
let foodX;
let foodY;
let canvas;
let ctx;

window.onload = function() {
    canvas = document.getElementById("gameboard");
    ctx = canvas.getContext("2d");
    canvas.width = snakeSize * tileSizeX;
    canvas.height = snakeSize * tileSizeY;

    // Backgrunn 
    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Velg lokasjon til maten
    placeFood();
    
    document.addEventListener('keydown', direction);
    setInterval(update, 1000 / 10);
}; 

function update() {
    if(gameOver) {
        return;
    };
    
    
    // Fargelegg kor maten ska være basert på tilfeldige koordinater
    ctx.fillStyle = "red";
    ctx.fillRect(foodX, foodY, snakeSize, snakeSize);

    // Fargelegg kor slagen ska være
    ctx.fillStyle = 'green';
    ctx.fillRect(snakePosX, snakePosY, snakeSize, snakeSize);
};

function direction(e) {
    switch(e.key) {
        case "ArrowLeft":
            snakePosX -= 1;
        case "ArrowRight":
            snakePosX += 1;
        case "ArrowUp":
            snakePosY += 1;
        case "ArrowDown":
            snakePosY -= 1;
    }
};

function placeFood() {
    foodX = Math.floor(Math.random() * tileSizeX) * snakeSize;
    
    foodY = Math.floor(Math.random() * tileSizeY) * snakeSize;
};