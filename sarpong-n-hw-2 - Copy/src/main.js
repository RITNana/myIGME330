/*
  main.js is primarily responsible for hooking up the UI to the rest of the application 
  and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';
import * as json from './json.js';


let drawParams = {
  showBars: true,
  showCircles: true,
  toggleWave: false,
  noiseLevel: 0,
  invertLevel: 0,
  embossLevel: 0
};

let highshelf = false;
let lowshelf = false;





let barsCb = document.querySelector("#cb-bars");
let circlesCb = document.querySelector("#cb-circles");
let trebleBox = document.querySelector("#cb-highshelf");
let bassBox = document.querySelector("#cb-lowshelf");

let noiseSlider = document.querySelector("#slider-noise");
let invertSlider = document.querySelector("#slider-invert");
let embossSlider = document.querySelector("#slider-emboss");



// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
  sound1: "media/New Adventure Theme.mp3"
});

// what will be loaded onto our window on default
const init = () => {
  barsCb.checked = true;
  circlesCb.checked = true;
  
 
// setting the checks to not be checked yet
  trebleBox.checked = highshelf;
  bassBox.checked = lowshelf;

 

  audio.setupWebaudio(DEFAULTS.sound1);
 // console.log("init called");
 // console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
  let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
  setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode, btnplay)
  loop()
}

const setupUI = (canvasElement) => {
  json.loadJSON();

  // A - hookup fullscreen button
  const fsButton = document.querySelector("#btn-fs");

  // add .onclick event to button 
  btnplay.onclick = e => {
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
  let volumeSlider = document.querySelector("#slider-volume");
  let volumeLabel = document.querySelector("#label-volume");



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
  let trackSheet = document.querySelector("#select-track");
  // add .onchange event to <select>
  trackSheet.onchange = e => {
    // pause the current track if it is playing
    audio.loadSoundFile(e.target.value);
    if (btnplay.dataset.playing == "yes") {
      btnplay.dispatchEvent(new MouseEvent("click"));
    }
  };

  // change the filter values based on user input of slider
noiseSlider.addEventListener("input", () => {
  drawParams.noiseLevel = parseFloat(noiseSlider.value);
  canvas.draw(drawParams);
})

invertSlider.addEventListener("input", () => {
  drawParams.invertLevel = parseFloat(invertSlider.value);
  canvas.draw(drawParams);
})

embossSlider.addEventListener("input", () => {
  drawParams.embossLevel = parseFloat(embossSlider.value);
  canvas.draw(drawParams);
})

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

  // event handler for trebleBox checking to see if the checbox has been clicked by input
  trebleBox.onchange = e =>{
    highshelf = e.target.checked;
    toggleHighshelf()
  }

  // event handler for bassBox checking to see if the checbox has been clicked by input
  bassBox.onchange = e =>{
    lowshelf = e.target.checked;
    toggleLowshelf();
  }

  // changing the data being displayed
  document.querySelector("#change-data").onchange = e => {
    if(e.target.value == "frequency"){
      drawParams.toggleWave = false ;
    } else {
      drawParams.toggleWave = true;
    }
  }
} // end setupUI

// creating the treble node
function toggleHighshelf(){
  if(highshelf){
    audio.highBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime); 
    audio.highBiquadFilter.gain.setValueAtTime(20, audio.audioCtx.currentTime);
  }else{
    audio.highBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
  }
}

// creating the bass node
function toggleLowshelf(){
  if(lowshelf){
    audio.lowBiquadFilter.frequency.setValueAtTime(1000, audio.audioCtx.currentTime); // we created the `biquadFilter` (i.e. "treble") node last time
    audio.lowBiquadFilter.gain.setValueAtTime(10, audio.audioCtx.currentTime);
  }else{
    audio.lowBiquadFilter.gain.setValueAtTime(0, audio.audioCtx.currentTime);
  }
}
// run for 60fps
const loop = () => {
  setTimeout(() => {
    canvas.draw(drawParams);
    loop();
  }, 1000 / 60);
};

export { init };