import { useState } from "react";
import './App.css'

const baseurl = "https://www.amiiboapi.com/api/amiibo/?name=";

const loadXHR = (url, callback) => {
  const xhr = new XMLHttpRequest();

  xhr.onload = (e) => {

    console.log(`In onload - HTTP Status Code = ${e.target.status}`);
    console.log(`Success - the file length is ${text.length}`);
  }
  xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
  xhr.open("GET", url);
  xhr.send();
 
}

const myCallBack = (e) => {
  const text = e.target.responseText
}

const App = () => {
  return <>
    <header>
      <h1>Amiibo Finder</h1>
    </header>
    <hr />
    <main>
      <button>Search</button>
      <label>
        Name: 
        <input />
      </label>
    </main>
    <hr />
    <footer>
      <p>&copy; 2023 Ace Coder</p>
    </footer>
  </>;
};

export default App;