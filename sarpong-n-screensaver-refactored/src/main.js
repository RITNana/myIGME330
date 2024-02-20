// import the arrow functions for style size
import { getRandomColor } from "./utils.js";
import { getRandomInt } from "./utils.js";

// import the functions to draw these shapes
import { drawRectangle, drawArc, drawLine, drawRandomRect, drawRandomArc, drawRandomLine } from "./canvas-utils.js";

let ctx;
let paused = false;
let canvas;
let createRectangles = true
let createArcs = true;
let createLines = true;

const init = () => {
    console.log("page loaded!");
    // A - `canvas` variable points at <canvas> tag
    canvas = document.querySelector("canvas");

    // B - the `ctx` variable points at a "2D drawing context"
    ctx = canvas.getContext("2d");
    drawRectangle(ctx, 20, 20, 600, 440, "#5F9EA0");
    drawRectangle(ctx, 120, 120, 400, 300, "#B0FF92", 10, "magenta")
    drawRectangle(ctx, 400, 200, 50, 150, "#5F00BA", 10, "skyblue")
    drawRectangle(ctx, 230, 300, 120, 100, "#ECA400", 10, "#006992")
    drawLine(ctx, 20, 20, 620, 460, 5, "magenta")
    drawLine(ctx, 620, 20, 20, 460, 5, "magenta")
    drawArc(ctx, 320, 240, 50, "yellow", 5, "magenta", 0, Math.PI * 2)
    drawArc(ctx, 320, 240, 20, "orange", 5, "grey", 0, Math.PI)
    drawArc(ctx, 300, 220, 5, "orange", 5, "grey", 0, Math.PI * 2)
    drawArc(ctx, 340, 220, 5, "orange", 5, "grey", 0, Math.PI * 2)
    drawLine(ctx, 20, 440, 440, 20, 20, "midnightblue")

    setupUI();
    update();
}

// schedule a call to update functuon every 1/60 of a second
// call these imported pure functions 
const update = () => {
    if (paused) return;
    requestAnimationFrame(update);
    if (createRectangles) {
        drawRandomRect(ctx, getRandomInt(0, 350), getRandomInt(100, 640), getRandomInt(0, 100),
            getRandomInt(100, 480), getRandomInt(10, 20), getRandomInt(20, 30), getRandomInt(10, 20),
            getRandomInt(20, 30))
    }

    if (createArcs) {
        drawRandomArc(ctx, getRandomInt(70, 100), getRandomInt(190, 640), getRandomInt(0, 100),
            getRandomInt(100, 480), getRandomInt(2, 15), getRandomInt(15, 50));
    }
    if (createLines) {
        drawRandomLine(ctx, getRandomInt(0, 300), getRandomInt(300, 640), getRandomInt(0, 240),
            getRandomInt(240, 400), getRandomInt(0, 300), getRandomInt(300, 640), getRandomInt(0, 240),
            getRandomInt(240, 400))
    }
}

// event handlers
const canvasClicked = (e) => {
    let arc = e.target.getBoundingClientRect(); // give us a rect where canvas was clicked on
    let mouseX = e.clientX - arc.x;
    let mouseY = e.clientY - arc.y;
    console.log(mouseX, mouseY);

    for (let i = 0; i < 10; i++) {
        let x = getRandomInt(-100, 100) + mouseX;
        let y = getRandomInt(-100, 100) + mouseY;
        let radius = getRandomInt(2, 12);
        let color = getRandomColor();
        drawArc(ctx, x, y, radius, color, getRandomInt(2, 12), getRandomColor())
    }
}

// helpers
const setupUI = () => {
    document.querySelector("#btn-pause").onclick = () => {
        paused = true;
    };

    document.querySelector("#btn-play").onclick = () => {
        if (paused) {
            paused = false;
            update();
        }
    }
    
    document.querySelector("#btn-clear").onclick = () => {
        paused = true; // pause animation
        ctx.clearRect(0, 0, canvas.width, canvas.height) // clear canvas
    }
    canvas.onclick = canvasClicked
    
    document.querySelector("#cb-rectangles").onclick = (e) => {
        createRectangles = e.target.checked;
    }

    document.querySelector("#cb-arcs").onclick = (e) => {
        createArcs = e.target.checked;
    }

    document.querySelector("#cb-lines").onclick = (e) => {
        createLines = e.target.checked;
    }
}
init();