export class Sprite{
    constructor(x, y, width, height, image){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height

        

        this.image = image;
       // this.element = element;
    }

    draw(ctx){
      //  ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
        
    }

    update(ctx, audioData, fps){
        setTimeout(() => {
            this.update(ctx, audioData, fps);
        }, 1000 / fps) // create an animation by setting a time out in milliseconds / frames per sec

        this.draw(ctx);
        

        
    
    }

    
     
}
