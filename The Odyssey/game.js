import { Terrain } from "./terrain.js";
import { Rider } from "./rider.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

// Create game objects
let terrain = new Terrain(canvas, pencil);
let rider = new Rider(canvas, pencil);

// -------- Step 1: Attach click/key listeners for jump --------
function detectJump() {
    if (rider.onGround) {
        rider.ySpeed = rider.jumpStrength;
    }
}

// Click or Space bar triggers jump
canvas.addEventListener("click", detectJump);
document.addEventListener("keypress", (e) => {
    if (e.code === "Space") detectJump();
});
// -----------------------------------------------------------

let score = 0;
const WIN_SCORE = 1000;

function gameLoop() {
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    terrain.move();
    terrain.draw();

    rider.update(terrain);
    rider.draw();

    score += 1;
    document.getElementById("scoreDisplay").innerText = "Score: " + score;

    if (rider.y > canvas.height) {
        alert("You Lose!");
        resetGame();
        return;
    }

    if (score >= WIN_SCORE) {
        alert("You Win!");
        resetGame();
        return;
    }
}

function resetGame() {
    score = 0;
    rider.y = 0;
    rider.ySpeed = 5;
    terrain = new Terrain(canvas, pencil);
}

setInterval(gameLoop, 20);
