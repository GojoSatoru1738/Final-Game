import { Terrain } from "./terrain.js";
import { Rider } from "./rider.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

// Start
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const highScoreText = document.getElementById("highScoreText");

// Score display
const scoreDisplay = document.getElementById("scoreDisplay");

// Load skybox
const skybox = new Image();
skybox.src = "Skybox.png";

// Game state
let gameRunning = false;

// High score
let highScore = Number(localStorage.getItem("highScore")) || 0;
highScoreText.innerText = "High Score: " + highScore;

// Game objects
let terrain;
let rider;
let score = 0;

// Start game
startButton.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameRunning = true;
    resetGame();
});

// Jump detection
function detectJump() {
    if (!gameRunning) return;
    if (rider.onGround) {
        rider.ySpeed = rider.jumpStrength;
    }
}

canvas.addEventListener("click", detectJump);
document.addEventListener("keypress", (e) => {
    if (e.code === "Space") detectJump();
});

// Reset game
function resetGame() {
    score = 0;
    terrain = new Terrain(canvas, pencil);
    rider = new Rider(canvas, pencil);

    rider.y = terrain.y1;
    rider.onGround = true;
    rider.ySpeed = 0;

    scoreDisplay.innerText = "Score: 0";
}

// Collision detection
function detectCollision(rider, terrain) {
    const riderBottom = rider.y;
    const riderTop = rider.y - rider.height;
    const riderLeft = rider.x - rider.width / 2;
    const riderRight = rider.x + rider.width / 2;

    const platforms = [
        { x: terrain.x1, y: terrain.y1, width: terrain.width },
        { x: terrain.x2, y: terrain.y2, width: terrain.width },
    ];

    rider.onGround = false;

    for (let platform of platforms) {
        const top = platform.y;
        const left = platform.x;
        const right = platform.x + platform.width;

        if (
            riderBottom >= top &&
            riderTop < top &&
            riderRight > left &&
            riderLeft < right
        ) {
            rider.y = top;
            rider.ySpeed = 0;
            rider.onGround = true;
            return false;
        }
    }

    return rider.y > canvas.height;
}

// Main game loop
function gameLoop() {
    if (!gameRunning) return;

    // Draw background
    pencil.drawImage(skybox, 0, 0, canvas.width, canvas.height);

    terrain.move();
    terrain.draw();

    rider.update();
    rider.draw();

    // Collision
    if (detectCollision(rider, terrain)) {

        
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreText.innerText = "High Score: " + highScore;
        }

        alert("You Lose!");

        startScreen.style.display = "flex";
        gameRunning = false;
        return;
    }

    // Score
    score++;
    scoreDisplay.innerText = "Score: " + score;
}

setInterval(gameLoop, 20);
