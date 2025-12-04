import { Terrain } from "./terrain.js";
import { Rider } from "./rider.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

// Create game objects
let terrain = new Terrain(canvas, pencil);
let rider = new Rider(canvas, pencil);

// Start rider on first platform
rider.y = terrain.y1;
rider.onGround = true;

// Jump detection
function detectJump() {
    if (rider.onGround) {
        rider.ySpeed = rider.jumpStrength;
    }
}

canvas.addEventListener("click", detectJump);
document.addEventListener("keypress", (e) => {
    if (e.code === "Space") detectJump();
});

// Score + Win 
let score = 0;
const WIN_SCORE = 2000; //LOCALSTORAGE SPOT/EVERY NEW FRAME = High Score

// Collision
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
        const platformTop = platform.y;
        const platformLeft = platform.x;
        const platformRight = platform.x + platform.width;

        if (
            riderBottom >= platformTop &&
            riderTop < platformTop &&
            riderRight > platformLeft &&
            riderLeft < platformRight
        ) {
            rider.y = platformTop;
            rider.ySpeed = 0;
            rider.onGround = true;
            return false; // not losing
        }
    }

    // Rider fell below canvas  = lose
    if (rider.y > rider.canvas.height) return true;

    return false;
}


// Reset game
function resetGame() {
    score = 0;
    rider.ySpeed = 0;
    rider.x = 150;
    terrain = new Terrain(canvas, pencil);

    // Place rider on first terrain piece
    rider.y = terrain.y1;
    rider.onGround = true;
}

// Main game loop
function gameLoop() {
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    terrain.move();
    terrain.draw();

    rider.update();
    rider.draw();

    // Collision
    if (detectCollision(rider, terrain)) {
        alert("You Lose!");
        resetGame();
        return;
    }

    // Update score
    score += 1;
    document.getElementById("scoreDisplay").innerText = "Score: " + score;

    // Win condition
    if (score >= WIN_SCORE) {
        alert("You Win!");
        resetGame();
        return;
    }
}

setInterval(gameLoop, 20);
