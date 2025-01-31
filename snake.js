let tileSizeX = 20;
let tileSizeY = 20;
let snakeSize = 15;
let snakePosX = Math.floor(tileSizeX / 2) * snakeSize;
let snakePosY = Math.floor(tileSizeY / 2) * snakeSize;
let snakeSpeedX = 0;
let snakeSpeedY = 0;
let snakeBody = [snakePosX, snakePosY];
let gameOver = false;
let score = 0;
let foodPosX;
let foodPosY;
let canvas;
let ctx;

window.onload = function() {
    canvas = document.getElementById("gameboard");
    ctx = canvas.getContext("2d");
    canvas.width = snakeSize * tileSizeX;
    canvas.height = snakeSize * tileSizeY;

    // Backgrunn 
    ctx.fillStyle = "rgb(86, 150, 41)";
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

    if(snakeBody) {
        console.log("snakeBOSY");
    }
    // Fjern gammel slange
    for(let i = snakeBody.length; i > snakeBody.length; i--) {
        ctx.clearRect(snakeBody[i][0], snakeBody[i][1], snakeSize, snakeSize);
    }
    
    
    // Fargelegg kor maten ska være basert på tilfeldige koordinater
        ctx.fillStyle = "rgb(193, 28, 28)";
    ctx.fillRect(foodPosX, foodPosY, snakeSize, snakeSize);

    // Fargelegg kor slagen ska være
    ctx.fillStyle = 'rgb(213, 243, 191)';
    // Oppdater slange posisjon
    snakePosX += snakeSpeedX * snakeSize;
    snakePosY += snakeSpeedY * snakeSize;
    // Fyll ut slange posisjoner
    ctx.fillRect(snakePosX, snakePosY, snakeSize, snakeSize);

    // Legg til slangekropp i liste
    if(snakePosX === foodPosX && snakePosY === foodPosY) {
        snakeBody.push([snakePosX, snakePosY]);
        placeFood();
    }

    for(let i = 0; i < snakeBody.length; i++) {
        snakeBody[i] = [snakePosX - i, snakePosY - i];
    }
    // Hvis man treffer sæ sjøl så taper man
    console.log(snakeBody);
};

function direction(e) {
    switch(e.code) {
        case "KeyA":
            if(snakeSpeedX !== 1) {
                snakeSpeedX -= 1;
                snakeSpeedY = 0;
            }
            
            break;
        case "KeyD":
            if(snakeSpeedX !== -1)
            {
                snakeSpeedX += 1;
                snakeSpeedY = 0;
            }
            break;
        case "KeyS":
            if(snakeSpeedY !== -1)
            {
                snakeSpeedY += 1;
                snakeSpeedX = 0;
            }
            break;
        case "KeyW":
            if(snakeSpeedY !== 1)
            {
                snakeSpeedY -= 1;
                snakeSpeedX = 0;
            }
            break;
    }
};

function placeFood() {
    foodPosX = Math.floor(Math.random() * tileSizeX) * snakeSize;
    
    foodPosY = Math.floor(Math.random() * tileSizeY) * snakeSize;
};