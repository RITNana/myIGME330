/*
  main.js is primarily responsible for hooking up the UI to the rest of the application 
  and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './canvas.js';

let drawParams = {
  showGradient: true,
  showBars: true,
  showCircles: true,
  showNoise: false,
  showInvert: false,
  showEmboss: false
};


let gradientCb = document.querySelector("#gradientCB");
let barsCb = document.querySelector("#barsCB");
let circlesCb = document.querySelector("#circlesCB");
let noiseCb = document.querySelector("#noiseCB");
let invertCb = document.querySelector("#invertCB");
let embossCb = document.querySelector("#embossCB");



// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/New Adventure Theme.mp3"
});

function init() {
  gradientCb.checked = true;
  barsCb.checked = true;
  circlesCb.checked = true;
  noiseCb.checked = false;
  invertCb.checked = false;
  embossCb.checked = false;

  audio.setupWebaudio(DEFAULTS.sound1);
  console.log("init called");
  console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode)
  loop()
}

function setupUI(canvasElement) {
  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");

  // add .onclick event to button 
  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);

    // check if context is in suspended state (autoplay policy)
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if (e.target.dataset.playing == "no") {
      // if track is currently paused, play it
      audio.playCurrentSound();
      e.target.dataset.playing = "yes"; // the CSS will set the text to "Pause"
    } else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no"; // the CSS will set the text to "Play"
    }
  };

  fsButton.onclick = e => {
    console.log("goFullscreen() called");
    utils.goFullscreen(canvasElement);
  };

  // B - hookup volume slider and label
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  // add .oninput to slider
  volumeSlider.oninput = e => {
    // set the gain
    audio.setVolume(e.target.value);
    // update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value / 2 * 100));
  };

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // C - hook up track <select>
  let trackSheet = document.querySelector("#trackSelect");
  // add .onchange event to <select>
  trackSheet.onchange = e => {
    // pause the current track if it is playing
    audio.loadSoundFile(e.target.value);
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new MouseEvent("click"));
    }
  };


  // Event handler for 'Show Gradient' Button
  gradientCb.addEventListener("change", () => {
    if (!gradientCb.checked) {
      canvas.draw(drawParams.showGradient = false)
    } else {
      canvas.draw(drawParams.showGradient = true)
    }
  });

  // Event handler for 'Show Bars' Button
  barsCb.addEventListener("change", () => {
    if (!barsCb.checked) {
      canvas.draw(drawParams.showBars = false)
    } else {
      canvas.draw(drawParams.showBars = true)
    }
  });

  // Event handler for 'Show Circles' Button
  circlesCb.addEventListener("change", () => {
    if (!circlesCb.checked) {
      canvas.draw(drawParams.showCircles = false)
    } else {
      canvas.draw(drawParams.showCircles = true)
    }
  })

  // Event handler for 'Show Noise' Button
  noiseCb.addEventListener("change", () => {
    if (!noiseCb.checked) {
      canvas.draw(drawParams.showNoise = false)
    } else {
      canvas.draw(drawParams.showNoise = true)
    }
  })

  // Event handler for 'Invert Colors' Button
  invertCb.addEventListener("change", () => {
    if (invertCb.checked) {
      canvas.draw(drawParams.showInvert = true)
    } else {
      canvas.draw(drawParams.showInvert = false)
    }
  })

  // Event handler for 'Show Emboss' Button
  embossCb.addEventListener("change", () => {
    if (embossCb.checked) {
      canvas.draw(drawParams.showEmboss = true)
    } else {
      canvas.draw(drawParams.showEmboss = false)
    }
  })



} // end setupUI


function loop() {
  requestAnimationFrame(loop);
  canvas.draw(drawParams)

}

export { init };