let tileSizeX = 20;
let tileSizeY = 20;
let snakeSize = 15;
let snakePosX = Math.floor(tileSizeX / 2) * snakeSize;
let snakePosY = Math.floor(tileSizeY / 2) * snakeSize;
let snakeSpeedX = 0;
let snakeSpeedY = 0;
let snakeBody = [[snakePosX, snakePosY]];
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

    // Fjern den bakerste delen av slangen
    ctx.fillStyle = "rgb(86, 150, 41)";
    ctx.fillRect(snakeBody[0][0], snakeBody[0][1], snakeSize, snakeSize);

    // if(snakeBody) {
    //     snakeBody[0] = [snakePosX, snakePosY];
    // }    
    
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
    // for(let i = 0; i < snakeBody.length; i++) {
    //     ctx.fillRect(snakeBody[i][0], snakeBody[i][1], snakeSize, snakeSize);
    // }

    // Legg til slangekropp i liste
    if(snakePosX === foodPosX && snakePosY === foodPosY) {
        snakeBody.push([snakePosX, snakePosY]);
        placeFood();
    }

    // Oppdaterer posisjonen til alle slangedeler
    // for(let i = 1; i <= snakeBody.length; i++) {
    //     snakeBody[i] = snakeBody[i-1];
    // }
    console.log(snakeBody);
    snakeBody.unshift(snakeBody[1]);

    // Hvis man treffer sæ sjøl så taper man
    console.log(snakePosX);
    console.log(snakePosY);
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