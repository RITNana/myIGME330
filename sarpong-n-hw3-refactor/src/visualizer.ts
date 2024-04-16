/*
    The purpose of this file is to take in the analyser node and a <canvas> element: 
      - the module will create a drawing context that points at the <canvas> 
      - it will store the reference to the analyser node
      - in draw(), it will loop through the data in the analyser node
      - and then draw something representative on the canvas
      - maybe a better name for this file/module would be *visualizer.js* ?
*/

import * as utils from './utils';
import { Sprite } from './classes/sprite';
import { DrawParams } from './interfaces/drawParams.interface';



let ctx, canvasWidth, canvasHeight, analyserNode, audioData;

const sprites = [];
const numberOfSprites = 100
 




const setupCanvas = (canvasElement, analyserNodeRef, playButton) => {
    // create drawing context
    ctx = canvasElement.getContext("2d");
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
 //   console.log(canvasWidth, canvasHeight)
        // keep a reference to the analyser node
        analyserNode = analyserNodeRef;
        // this is the array where the analyser data will be stored
        audioData = new Uint8Array(analyserNode.fftSize / 2)

             for(let i = 0; i < numberOfSprites; i++){
      const  sprite = new Sprite(
        utils.getRandom(0, 700), 
        utils.getRandom(0, 300), 
        utils.getRandom(10, 30,), 
        utils.getRandom(10, 30), 
        utils.getRandomColor(), 
        playButton)
                 sprites.push(sprite)

         }
    
}


const draw = (params:DrawParams) => {
    // Update and draw the sprites
     sprites.forEach((sprite) => {
    sprite.update(audioData, canvasWidth, canvasHeight);
    sprite.draw(ctx);
     }); 

    // 1 - populate the audioData array with the frequency data from the analyserNode
    // notice these arrays are passed "by reference"
    if (params.toggleWave) {
        analyserNode.getByteTimeDomainData(audioData)
    } else {
        analyserNode.getByteFrequencyData(audioData);
    }
    // 2 - draw background
    ctx.save();
    ctx.fillStyle = "black";
    ctx.globalAlpha = .1;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();

 

    // 4 - draw bars
    if (params.showBars) {
        let barSpacing = 4;
        let margin = 5;
        let screenWidthForBars = canvasWidth - (audioData.length * barSpacing) - margin * 2
        let barWidth = screenWidthForBars / audioData.length;
        let barHeight = 200;
        let topSpacing = 100;

        ctx.save()
        ctx.fillStyle = 'rgba(255, 255, 255, 0.50';
        ctx.strokeStyle = 'rgba(0,0,0,0.50)';

        // loop through data and draw
        for (let i = 0; i < audioData.length; i++) {
            ctx.fillRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight);
            ctx.strokeRect(margin + i * (barWidth + barSpacing), topSpacing + 256 - audioData[i], barWidth, barHeight)
        }
        ctx.restore();
    }

    // 5 - draw circles
    if (params.showCircles) {
        let maxRadius = canvasHeight / 6;
        ctx.save();
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < audioData.length; i++) {
            // red-ish circles
            let percent = audioData[i] / 125;

            let circleRadius = percent * maxRadius
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(255, utils.getRandom(0, 255), utils.getRandom(0, 255), .34 - percent / 12.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // blue-ish circles, bigger, more transparent
            ctx.beginPath();
            ctx.fillStyle = utils.makeColor(utils.getRandom(0, 255), 255, utils.getRandom(0, 255), .05 - percent / 3.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * 1.5, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();

            // yellow-ish circles, smaller
            ctx.save();
            ctx.beginPath()
            ctx.fillStyle = utils.makeColor(utils.getRandom(0, 255), utils.getRandom(0, 255), 255, .5 - percent / 5.0);
            ctx.arc(canvasWidth / 2, canvasHeight / 2, circleRadius * .50, 0, 2 * Math.PI, false);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
        ctx.restore();
    }
    // 6 - bitmap manipulation
    // TODO: right now. we are looping though every pixel of the canvas (320,000 of them!), 
    // regardless of whether or not we are applying a pixel effect
    // At some point, refactor this code so that we are looping though the image data only if
    // it is necessary

    // A) grab all of the pixels on the canvas and put them in the `data` array
    // `imageData.data` is a `Uint8ClampedArray()` typed array that has 1.28 million elements!
    // the variable `data` below is a reference to that array 
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let data = imageData.data;
    let length = data.length;
    let width = imageData.width; // not using here

    // B) Iterate through each pixel, stepping 4 elements at a time (which is the RGBA for 1 pixel
    for (let i = 0; i < length; i += 4) {
        if (params.noiseLevel > 0 && Math.random() < params.noiseLevel) {
          // Apply the noise effect to the pixel
          data[i] = data[i + 1] = data[i + 2] = 0; // Zero out the red, green, and blue channels
          data[i] = 255; // Make the red channel 100% red
        }
    }

    // Use the invertLevel to apply the amount noise level
    for (let i = 0; i < length; i += 4) {
        if (params.invertLevel > 0 && Math.random() < params.invertLevel) {
          // Apply the noise effect to the pixel
          let red = data[i], green = data[i + 1], blue = data[i + 2];
          data[i] = 255 - red; // set red
            data[i + 1] = 255 - green; // set green
            data[i + 2] = 255 - blue; // set blue
        }
    }

    // use the embossLevel ti apply the amount of emobss effect
    for (let i = 0; i < length; i++) {
        if(params.embossLevel > 0 && Math.random() < params.embossLevel){
            if (i % 4 == 3) continue; // skip alpha channel
        data[i] = 127 + 2 * data[i] - data[i + 4] - data[i + width * 4];
        }
        
    }
    // D) Copy data back to canvas
    ctx.putImageData(imageData, 0, 0);
} // end draw

export { setupCanvas, draw };