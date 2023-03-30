
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const gridSize = 20;
let snakeSpeed = 100;
let score = 0;
let appleEaten = 0;

let snake = [{ x: 200, y: 200 }];
let snakeDirection = { x: gridSize, y: 0 };
let food = generateRandomFood();

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, snakeSpeed);
}

function update() {
    moveSnake();
    checkFoodCollision();
    checkSelfCollision();
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
}

function moveSnake() {
    let head = {
        x: (snake[0].x + snakeDirection.x + canvas.width) % canvas.width,
        y: (snake[0].y + snakeDirection.y + canvas.height) % canvas.height
    };
    snake.unshift(head);
    snake.pop();
}

function checkFoodCollision() {
    if (snake[0].x === food.x && snake[0].y === food.y) {
        food = generateRandomFood();
        growSnake();
        score += 10;
        appleEaten++;
        if (appleEaten % 10 === 0) {
            snakeSpeed *= 0.5;
        }
        document.getElementById('scoreBoard').innerText = 'Score: ' + score;
    }
}

function checkSelfCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    alert("Game over! Your score: " + score);
    resetGame();
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    snakeDirection = { x: gridSize, y: 0 };
    snakeSpeed = 100;
    score = 0;
    appleEaten = 0;
    document.getElementById('scoreBoard').innerText = '';
}

function growSnake() {
    let tail = snake[snake.length - 1];
    snake.push({ x: tail.x - snakeDirection.x, y: tail.y - snakeDirection.y });
}

function drawSnake() {
    context.fillStyle = 'black';
    for (let part of snake) {
        context.fillRect(part.x, part.y, gridSize, gridSize);
    }
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, gridSize, gridSize);
}
function generateRandomFood() {
    return {
        x: Math.floor(Math.random() * canvas.width / gridSize) * gridSize,
        y: Math.floor(Math.random() * canvas.height / gridSize) * gridSize
    };
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -gridSize };
            break;
        case 'ArrowDown':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: gridSize };
            break;
        case 'ArrowLeft':
            if (snakeDirection.x === 0) snakeDirection = { x: -gridSize, y: 0 };
            break;
        case 'ArrowRight':
            if (snakeDirection.x === 0) snakeDirection = { x: gridSize, y: 0 };
            break;
    }
});

document.getElementById('startGame').addEventListener('click', () => {
    gameLoop();
});

document.getElementById('endGame').addEventListener('click', () => {
    gameOver();
});

