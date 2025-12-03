//Uppercase p for the class name, lowercase for file name.
//This class draws the pipe obstacle on the screen.
export class PipeObstacle {

    x = 300;
    y = 100;
    height; //height will be dynamic
    width = 100;
    canvas;
    pencil;
    speed = 10;
    gap = 150;

    //pipe parts
    topPipe;
    bottomPipe;

    constructor(canvas, pencil) {
        this.pencil = pencil;
        this.canvas = canvas;

        this.height = canvas.height;
    }

    draw() {
        //top pipe
        this.pencil.fillStyle = 'blue'; // Set the fill color
        this.pencil.fillRect(
            this.x, 
            this.y - this.height, 
            this.width, 
            this.height
        ); // x, y, w, h

        //bottom pipe
        this.pencil.fillStyle = 'violet'; // Set the fill color
        this.pencil.fillRect(
            this.x, 
            this.y + this.gap, 
            this.width, 
            this.height
        ); // x, y, w, h
    }

    move() {
        this.x -= this.speed;

        //check if we need to recycle
        if(this.x < -this.width) {
            this.x = this.canvas.width;
            this.y = Math.random() * this.canvas.height;
        }



    }



}