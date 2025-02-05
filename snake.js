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
    makeCookie();
    let highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    displayHighScores(highScores);

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
        alert("Game Over");
        setScore();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakePosX == snakeBody[i][0] && snakePosY == snakeBody[i][1]) { 
            
            // Slange spise seg
            gameOver = true;
            alert("Game Over");
            setScore();
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

function makeCookie() {
    const date = new Date();
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = playerName + "=" + score + ";" + expires + ";path=/";
}

function getCookie() {
    let nameEQ = playerName + "=";
    let ca = document.cookie.split(';');
    console.log(ca);
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function setScore() {
    let playerName = getCookie() || 'Anonymous';
    let highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    highScores.push({ name: playerName, score: score });
    highScores.sort((a, b) => b.score - a.score);
    highScores = highScores.slice(0, 10);
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