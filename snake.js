let tileSizeX = 20;
let tileSizeY = 20;

let snakeSize = 15;

let snakePosX = snakeSize * snakeSize;
let snakePosY = snakeSize * snakeSize;

let snakeSpeedX = 0;
let snakeSpeedY = 0;

let snakeBody = [];

let gameOver = false;

let foodPosX;
let foodPosY;

let canvas;
let ctx;

let score = 0;

let playerName;

window.onload = function() {
    playerName = getPlayerName();
    displayHighScores(JSON.parse(localStorage.getItem('highScores') || '[]'));

    canvas = document.getElementById("gameboard");
    ctx = canvas.getContext("2d");
    canvas.width = snakeSize * tileSizeX;
    canvas.height = snakeSize * tileSizeY;

    // Velg lokasjon til maten
    placeFood();
    
    document.addEventListener('keydown', direction);
    setInterval(update, 1000 / 10);
}; 

function update() {
    if(gameOver) {
        return;
    };
    // Backgrunn 
    ctx.fillStyle = "rgb(86, 150, 41)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fargelegg kor maten ska være basert på tilfeldige koordinater
    ctx.fillStyle = "rgb(193, 28, 28)";
    ctx.fillRect(foodPosX, foodPosY, snakeSize, snakeSize);

    // Legg til slangekropp i liste
    if(snakePosX === foodPosX && snakePosY === foodPosY) {
        snakeBody.push([snakePosX, snakePosY]);
        placeFood();
        addScore();
    }

    for(let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if(snakeBody.length) {
        snakeBody[0] = [snakePosX, snakePosY];
    }

    // Oppdater slange posisjon
    snakePosX += snakeSpeedX * snakeSize;
    snakePosY += snakeSpeedY * snakeSize;

    // Fargelegg kor slagen ska være
    ctx.fillStyle = 'rgb(213, 243, 191)';
    // Fyll ut slange posisjoner
    ctx.fillRect(snakePosX, snakePosY, snakeSize, snakeSize);
    for(let i = 0; i < snakeBody.length; i++) {
        ctx.fillRect(snakeBody[i][0], snakeBody[i][1], snakeSize, snakeSize);
    }

    if (snakePosX < 0 
        || snakePosX > tileSizeX * snakeSize
        || snakePosY < 0 
        || snakePosY > tileSizeY * snakeSize) { 
        
        gameOver = true;
        gameEnd();
        setScore();
        //restartGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakePosX == snakeBody[i][0] && snakePosY == snakeBody[i][1]) { 
            
            // Slange spise seg
            
            gameOver = true;
            gameEnd();
            setScore();
            //restartGame();
        }
    }
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
    if(foodPosX === snakePosX && foodPosY === snakePosY) {
        placeFood();
    }
};

function addScore() {
    score += 1;
    document.getElementById("score").innerText = 'Score: ' + score;
}

function getPlayerName() {
    let playerName = prompt("Enter your name");
    if(playerName === null) {
        playerName = "Anonymous";
    }
    return playerName;
}

function setScore() {
    let highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({name: playerName, score: score});
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem('highScores', JSON.stringify(highScores));
    displayHighScores(highScores);
}

function displayHighScores(highScores) {
    let highScoreList = document.querySelector('#highscore ol');
    highScoreList.innerHTML = '';
    highScores.forEach(scoreEntry => {
        let li = document.createElement('li');
        li.textContent = `${scoreEntry.name}: ${scoreEntry.score}`;
        highScoreList.appendChild(li);
    });
}

function restartGame() {
    // Reset snake position and speed
    snakePosX = tileSizeX / 2;
    snakePosY = tileSizeY / 2;
    snakeSpeedX = 0;
    snakeSpeedY = 0;
    
    // Reset score
    score = 0;
    document.getElementById("score").innerText = 'Score: ' + score;
    
    // Clear the game over flag
    gameOver = false;
    
    // Place new food
    placeFood();
    
    // Restart the game loop
    clearInterval(gameInterval);
    gameInterval = setInterval(update, 1000 / 10);
}

function gameEnd() {
    let canvas = document.querySelector('gameboard');
    canvas.innerHTML = 'Game Over!';
}