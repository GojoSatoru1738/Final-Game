export class Terrain {

    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        // Terrain pieces (just two rectangles)
        this.x1 = 0;
        this.y1 = canvas.height - 100;
        this.width = 400;
        this.height = 200;

        this.x2 = this.x1 + this.width;
        this.y2 = canvas.height - 80;

        this.speed = 5;
    }

    move() {
        // Move both pieces left
        this.x1 -= this.speed;
        this.x2 -= this.speed;

        // If a piece goes off screen, place it to the right again
        if (this.x1 + this.width < 0) {
            this.x1 = this.x2 + this.width;
            this.y1 = this.getRandomHeight();
        }

        if (this.x2 + this.width < 0) {
            this.x2 = this.x1 + this.width;
            this.y2 = this.getRandomHeight();
        }
    }

    draw() {
        this.pencil.fillStyle = "brown";

        // Draw first ground piece
        this.pencil.fillRect(
            this.x1,
            this.y1,
            this.width,
            this.height
        );

        // Draw second ground piece
        this.pencil.fillRect(
            this.x2,
            this.y2,
            this.width,
            this.height
        );
    }

    // Beginner simple “random height”
    getRandomHeight() {
        return this.canvas.height - (80 + Math.random() * 120);
    }

    // Return the top of the ground under the player
    groundYAt(x) {
        if (x >= this.x1 && x <= this.x1 + this.width) {
            return this.y1;
        }
        if (x >= this.x2 && x <= this.x2 + this.width) {
            return this.y2;
        }
        return this.canvas.height; // fallback
    }
}