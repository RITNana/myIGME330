
// Create an ES6 class and pass on instances of a Sprite
export class Sprite{

    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    angle: number;
    velocityX: number;
    velocityY: number;
    scaleFactor: number;
    scaleDirection: number;
    playButton: HTMLButtonElement;

    constructor(x: number, y: number, width: number, height: number, color: string, playButton: HTMLButtonElement) {
        this.x = x; 
        this.y = y; 
        this.width = width;
        this.height = height;
        this.color = color
        this.angle += 0.5;
        this.velocityX = 3; // the speed it will travel in the x direction
        this.velocityY = 4
        this.scaleFactor = 1.0;
        this.scaleDirection = 1;
        this.playButton = playButton
    } 
    // use the audio data to move the sprites in both x and y directions
    // allow the shapes to scale in one direction and multiple as the shapes move toward the canvas more
    update(audioData: number[], canvasWidth: number, canvasHeight: number) {

        if (this.playButton.dataset.playing == "yes") {

            this.x += (this.velocityX * (audioData[0] / 255)) * this.getRandomDirection();
            this.y += (this.velocityY * (audioData[0] / 255)) * this.getRandomDirection();
            const scaleFactorIncrement = 0.01 * this.scaleDirection;
            this.scaleFactor += scaleFactorIncrement * Math.exp(scaleFactorIncrement * 5);

            if (this.scaleFactor >= 1.5 || this.scaleFactor <= 0.5) {
                this.scaleDirection *= -1
            }
        }
            // Check if the shape is out of bounds and adjust its position
            if (this.x > canvasWidth) {
                this.x = 0;
            } else if (this.x < 0) {
                this.x = canvasWidth;
            }

            if (this.y > canvasHeight) {
                this.y = 0;
            } else if (this.y < 0) {
                this.x = canvasHeight;
            }

        

        
    }


// draw our rectangle with its fill and scale attribute
// save the state and restore for later use
    draw(ctx:CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = this.color
        ctx.scale(this.scaleFactor, this.scaleFactor)
        ctx.fillRect(this.x, this.y, this.width, this.height)
        ctx.restore();
    }

    // allow the shapes to move in random directions
    getRandomDirection() {
        return Math.random() < 0.2 ? -1 : 1;
      } 
}

