// Create a sprite class 
class Phyllo{
    constructor(ctx, x, y, width, height, fillStyle, fps){
            this.ctx = ctx;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.fillStyle = fillStyle
            this.fps = fps;
    }

    // update the animation for the Sprite
    update(){
        this.draw(audioData)
    }

    // Draw our sprite 
    draw(){
        this.ctx.save();
        this.ctx.fillStyle = this.fillStyle;
        this.ctx.translate(this.x, this.y)
        this.ctx.scale(this.scale, this.scale);
        this.ctx.fillRect(0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        this.ctx.restore();

        this.scale += 0.07;

        setTimeout(() => this.draw(), 5000 / this.fps)

    }
}