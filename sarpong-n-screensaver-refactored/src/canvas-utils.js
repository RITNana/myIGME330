import { getRandomColor } from "./utils.js";
import { getRandomInt } from "./utils.js";


// canvas helpers
export const drawRectangle = (ctx, x, y, width, height, fillStyle = "black", lineWidth = 0, strokeStyle = "black") => {
    ctx.save(); // push current values of drawing state variables
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.rect(x, y, width, height)
    ctx.fill();
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore(); // pop changes off the stacks
}

export const drawArc = (ctx, x, y, radius, fillStyle = "black", lineWidth = 0, strokeStyle = "black", startAngle = 0, endAngle = Math.PI * 2) => {
    ctx.save();
    ctx.fillStyle = fillStyle;
    ctx.beginPath();
    ctx.arc(x, y, radius, startAngle, endAngle);
    ctx.fill();
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}

export  const drawLine = (ctx, x1, y1, x2, y2, lineWidth = 1, strokeStyle = "black") => {
    ctx.save();
    ctx.beginPath()
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    if (lineWidth > 0) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.stroke();
    }
    ctx.closePath();
    ctx.restore();
}

// turn all the impure functions to pure functions 

export const drawRandomRect = (ctx, minX, maxX, minY, maxY, minWidth, maxWidth, minHeight, maxHeigt) => {
    let x = getRandomInt(minX, maxX);
    let y = getRandomInt(minY, maxY);
    let width = getRandomInt(minWidth, maxWidth)
    let height = getRandomInt(minHeight, maxHeigt);
    let fillStyle = getRandomColor();
    let lineWidth = getRandomInt(12, 25)
    let strokeStyle = getRandomColor();
    ctx.save();
    drawRectangle(ctx, x, y, width, height, fillStyle, lineWidth, strokeStyle);
    ctx.restore();
}

export const drawRandomArc = (ctx, minX, maxX, minY, maxY, minRadius, maxRadius) => {
    let x = getRandomInt(minX, maxX);
    let y = getRandomInt(minY, maxY);
    let radius = getRandomInt(minRadius, maxRadius);
    let fillStyle = getRandomColor();
    let lineWidth = getRandomInt(1, 5)
    let strokeStyle = getRandomColor();
    ctx.save();
    drawArc(ctx, x, y, radius, fillStyle, lineWidth, strokeStyle);
    ctx.restore();

}

export const drawRandomLine = (ctx, minX1, maxX1, minY1, maxY1, minX2, maxX2, minY2, maxY2) => {
    let x1 = getRandomInt(minX1, maxX1)
    let y1 = getRandomInt(minY1, maxY1)
    let x2 = getRandomInt(minX2, maxX2)
    let y2 = getRandomInt(minY2, maxY2);
    let lineWidth = getRandomInt(1, 25)
    let strokeStyle = getRandomColor();
    ctx.save();
    drawLine(ctx, x1, y1, x2, y2, lineWidth, strokeStyle);
    ctx.restore();
}





