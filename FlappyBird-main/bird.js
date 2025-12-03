export class Bird {
    
    x = 50;
    y = 50;
    width = 50;
    height = 50;
    canvas;
    pencil;

    ySpeed = 1;
    maximumYSpeed = 20;

    
    constructor(canvas, pencil) {
    this.canvas = canvas;
    this.pencil = pencil;
    this.image = new Image();
    this.image.src = "bird.gif";
}


    draw() {
        //top pipe
        this.pencil.drawImage(this.image, this.x, this.y, this.width, this.height);
        // x, y, w, h
    }

    flap() {
        console.log("Flapped!")
        this.ySpeed = -15;
    }

    gravity() {
        this.y += this.ySpeed
        this.ySpeed += 2;

        if(this.ySpeed > this.maximumYSpeed) {
            this.ySpeed = this.maximumYSpeed;
        }
        if (this.y + this.height > this.canvas.height) {
        this.y = this.canvas.height - this.height;
        this.ySpeed = 0;
        }
        if (this.y < 0) {
    this.y = 0;
    this.ySpeed = 0;
    }   

    }

}