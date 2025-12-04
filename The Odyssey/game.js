import { Terrain } from "./terrain.js";
import { Rider } from "./rider.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

// Create game objects
let terrain = new Terrain(canvas, pencil);
let rider = new Rider(canvas, pencil);

let score = 0;
const WIN_SCORE = 1000; // You can adjust this

function gameLoop() {
    // Clear screen
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    // Move and draw terrain
    terrain.move();
    terrain.draw();

    // Update and draw rider
    rider.update(terrain);
    rider.draw();

    // Update score (distance traveled)
    score += 1;
    document.getElementById("scoreDisplay").innerText = "Score: " + score;

    // Lose condition: rider falls below canvas
    if (rider.y > canvas.height) {
        alert("You Lose!");
        resetGame();
        return;
    }

    // Win condition
    if (score >= WIN_SCORE) {
        alert("You Win!");
        resetGame();
        return;
    }
}

// Reset 
function resetGame() {
    score = 0;
    rider.y = 0;
    rider.ySpeed = 5;
    terrain = new Terrain(canvas, pencil); 
}

setInterval(gameLoop, 20);
