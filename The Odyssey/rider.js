export class Rider {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.x = 150;
        this.y = 0;
        this.ySpeed = 0;
        this.gravity = 1;
        this.jumpStrength = -15;

        this.width = 20;
        this.height = 20;

        this.onGround = false;
    }

    update() {
        this.ySpeed += this.gravity;
        this.y += this.ySpeed;
    }

    draw() {
        this.pencil.fillStyle = "red";
        this.pencil.fillRect(this.x - this.width/2, this.y - this.height, this.width, this.height);
    }
}
