export class Rider {
    constructor(canvas, pencil) {
        this.canvas = canvas;
        this.pencil = pencil;

        this.x = 150;
        this.y = 0;
        this.ySpeed = 0;
        this.gravity = 1;
        this.jumpStrength = -15;

        // Event listener for jump
        window.addEventListener("keydown", (e) => {
            if (e.code === "Space" && this.onGround) {
                this.ySpeed = this.jumpStrength;
            }
        });

        this.onGround = false;
    }

    update(terrain) {
        this.ySpeed += this.gravity;
        this.y += this.ySpeed;

        const groundY = terrain.groundYAt(this.x);

        if (this.y >= groundY - 40) { 
            this.y = groundY - 40;
            this.ySpeed = 0;
            this.onGround = true;
        } else {
            this.onGround = false;
        }
    }

    draw() {
        this.pencil.fillStyle = "red";
        this.pencil.fillRect(this.x - 10, this.y - 20, 20, 20);
    }
}
