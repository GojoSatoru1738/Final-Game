import { Terrain } from "./terrain.js";
import { Rider } from "./rider.js";

let canvas = document.getElementById("myCanvas");
let pencil = canvas.getContext("2d");

// Create game objects
let terrain = new Terrain(canvas, pencil);
let rider = new Rider(canvas, pencil);

function gameLoop() {
    // Clear screen
    pencil.clearRect(0, 0, canvas.width, canvas.height);

    
    terrain.move();
    terrain.draw();

    
    rider.update(terrain);
    rider.draw();
}


setInterval(gameLoop, 20);


