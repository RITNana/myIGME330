
// import from utils JS file
import { randomElement } from "./utils.js";


//console.log(words1[0]);

/*document.querySelector("#myButton").addEventListener("click", loadBabble);
document.querySelector("#fiveButton").addEventListener("click", loadBabble); */

// add listener event and have content of my webpage load
document.addEventListener("DOMContentLoaded", () =>{

// loading in the data and setting a callback to parse data  
const loadBabble = () => {
   // create a url to reference our data
   const url = "data/babble-data.json";

   // create an xhr to retrieve data from the url 
   const xhr = new XMLHttpRequest();

   // when the data loads
   xhr.onload = (e) => {
      // make sure the status code is sent to the console
      console.log(`In onload - HTTP Status Code = ${e.target.status}`);

      // set a callback to parse our JSON data, returning the text we received and sending the request 
      babbleLoaded(xhr.responseText)
   }

   // if an error is populated, send it to the console along witht the status code
   xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
   xhr.open("GET", url); // reinitializes the request we sent (GET)
   xhr.send(); // send request to the server
}

// parsing our JSON string into am object and controlling the DOM
const babbleLoaded = (responseText) => {
   
   // turn the JSON string into an object
   // initialize the values of the "words" array from the property names in the object
   const json = JSON.parse(responseText);
   const words1 = json.babble1;
   const words2 = json.babble2;
   const words3 = json.babble3;

// reference the button DOM elements
// when the buttons are clicked, will call the function that generates the technobabble
   document.querySelector("#myButton").addEventListener("click", () => generateTechno(1));
   document.querySelector("#fiveButton").addEventListener("click", () => generateTechno(5));

   // when the buttons are clicked, will call the function that generates the technobabble
     // when the buttons are clicked, will call the function that generates the technobabble
   const generateTechno = (num) => {
      
      // reference the div with a class ID of output
      document.querySelector("#output").innerHTML = "";

      // create a loop to construct and update the <div> with as many technobabble lines as needed
      for (let i = 0; i < num; i++) {
         document.querySelector("#output").innerHTML += `<div>${randomElement(words1)} ${randomElement(words2)} ${randomElement(words3)}</div>`;
      }
   }
   startUp();

   // generate the starting "babble" text
   function startUp(){
      generateTechno(1);
   }
}
loadBabble();


})
