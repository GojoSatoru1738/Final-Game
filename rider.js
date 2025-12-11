export class Rider {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.img = new Image();
        this.img.src = "bird.png";

        this.x = 150;
        this.y = 0;
        this.ySpeed = 0;
        this.gravity = 1;
        this.jumpStrength = -15;

        this.width = 40;
        this.height = 40;

        this.onGround = false;
    }

    update() {
        this.ySpeed += this.gravity;
        this.y += this.ySpeed;
    }

    
    draw() {
        
        this.pencil.drawImage(
            this.img,
            this.x - this.width / 2,
            this.y - this.height,
            this.width,
            this.height
        )
}
}
