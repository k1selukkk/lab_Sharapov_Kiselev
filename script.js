const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20; // Размер клетки
const canvasSize = 400; // Размер поля

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [
    { x: 100, y: 100 },
    { x: 80, y: 100 },
    { x: 60, y: 100 }
]; // Начальная позиция змейки
let food = generateFood();
let direction = 'RIGHT';
let score = 0;

function drawSnake() {
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lime'; // Голова змеи будет зеленой
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = Object.assign({}, snake[0]);
    
    switch (direction) {
        case 'UP': head.y -= gridSize; break;
        case 'DOWN': head.y += gridSize; break;
        case 'LEFT': head.x -= gridSize; break;
        case 'RIGHT': head.x += gridSize; break;
    }

    snake.unshift(head); // Добавляем новый сегмент в начало змеи

    // Проверка на поедание пищи
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById('score').textContent = score;
        food = generateFood(); // Генерация новой пищи
    } else {
        snake.pop(); // Убираем последний сегмент, если не съели пищу
    }

    // Проверка на столкновение с границами и собственным телом
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || isCollisionWithSelf(head)) {
        resetGame();
    }
}

function generateFood() {
    let foodX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    let foodY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x: foodX, y: foodY };
}

function isCollisionWithSelf(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function resetGame() {
    snake = [
        { x: 100, y: 100 },
        { x: 80, y: 100 },
        { x: 60, y: 100 }
    ];
    direction = 'RIGHT';
    score = 0;
    document.getElementById('score').textContent = score;
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp': if (direction !== 'DOWN') direction = 'UP'; break;
        case 'ArrowDown': if (direction !== 'UP') direction = 'DOWN'; break;
        case 'ArrowLeft': if (direction !== 'RIGHT') direction = 'LEFT'; break;
        case 'ArrowRight': if (direction !== 'LEFT') direction = 'RIGHT'; break;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
}

document.addEventListener('keydown', changeDirection);

setInterval(gameLoop, 100); // обновление игры каждые 100 миллисекунд
