import * as storage from "./storage.js"
let items = ["???"]

// create name for key
let key = "items";

//  write items
const writeItems = () => {
  storage.writeToLocalStorage(key, items)
}

// I. declare and implement showItems()
// - this will show the contents of the items array in the <ol>
const showItems = () => {
  let html = "";
  // loop though items and stick each array element into an <li>
  html += `<ol> ${items.map(i => `<li>${i}</li>`).join("")}</ol>`
  document.querySelector(".ml-4").innerHTML = html;
  // use array.map()!
  // update the innerHTML of the <ol> already on the page
};


// II. declare and implement addItem(str)
// - this will add `str` to the `items` array (so long as `str` is length greater than 0)
const addItem = str => {
  if(str.length > 0){
    items.push(str)
  }
};

// Also:
// - call `addItem()`` when the button is clicked, and also clear out the <input>
// - and be sure to update .localStorage by calling `writeToLocalStorage("items",items)`
document.querySelector("#btn-add").addEventListener("click", () => {
  addItem(document.querySelector("#thing-text").value)
  document.querySelector("#thing-text").value = "";
  writeItems();
  showItems();
})

// When the page loads:
// - load in the `items` array from storage.js and display the current items
// you might want to double-check that you loaded an array ...
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// ... and if you didn't, set `items` to an empty array
document.addEventListener("DOMContentLoaded", () => {
  // Load the items array from local storage
  items = storage.readFromLocalStorage(key);
  
  // Check if the loaded value is an array, and if not, set items to an empty array
  if (!Array.isArray(items)) {
    items = [];
  }
  showItems();
});

// Got it working? 
// - Add a "Clear List" button that empties the items array
document.querySelector("#btn-clear").addEventListener("click", () => {
  items = [];
  writeItems();
})