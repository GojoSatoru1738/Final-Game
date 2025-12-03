export class Rider {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.x = 150;
        this.y = 0;
        this.ySpeed = 0;
        this.gravity = 1;
    }

    update(terrain) {
        this.ySpeed += this.gravity;
        this.y += this.ySpeed;

        const groundY = terrain.groundYAt(this.x);

        if (this.y > groundY - 40) { 
            this.y = groundY - 40;
            this.ySpeed = 0;
        }
    }

    draw() {
        this.pencil.fillStyle = "red";
        this.pencil.fillRect(this.x - 10, this.y - 20, 20, 20);
    }
}
