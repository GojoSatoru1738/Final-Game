export class Terrain {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.width = 300; // width
        this.height = 400; //  thickness
        this.speed = 8;

        // Start first terrain on screen
        this.x1 = 50;
        this.y1 = canvas.height - 150;

        // Platform gap
        this.x2 = this.x1 + this.width + Math.random() * 100;
        this.y2 = canvas.height - (80 + Math.random() * 120);
    }

    move() {
        this.x1 -= this.speed;
        this.x2 -= this.speed;

        if (this.x1 + this.width < 0) {
            this.x1 = this.x2 + this.width + Math.random() * 100; // new gap
            this.y1 = this.getRandomHeight();
        }
        if (this.x2 + this.width < 0) {
            this.x2 = this.x1 + this.width + Math.random() * 100; // new gap
            this.y2 = this.getRandomHeight();
        }
    }

    draw() {
        this.pencil.fillStyle = "brown";
        this.pencil.fillRect(this.x1, this.y1, this.width, this.height);
        this.pencil.fillRect(this.x2, this.y2, this.width, this.height);
    }

    getRandomHeight() {
        return this.canvas.height - (80 + Math.random() * 120);
    }
}
