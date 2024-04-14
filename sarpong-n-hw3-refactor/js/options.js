import * as loaded from "./data.js";

let term = ""; // we declared `term` out here because we will need it later

// create the API url to obtain data for anime genres to display for the webpage
export const getGenres = () => {

    // create const variable to hold out API link
    const NEWER_API_URL = "https://api.jikan.moe/v4/anime?"; // 

    // create a url variable to hold the API
    let genreURL = NEWER_API_URL;

    // grab the user chosen search 'genre' from the <select> and append it to the URL
    let genre = document.querySelector("#genre").value;

    // set query parameters to build up our API url
    genreURL += "&genres=" + genre;
    genreURL += "&sfw";

    // create a new XHR object
    let xhr = new XMLHttpRequest();

    //  set the onload handler
    xhr.onload = loaded.genreDataLoaded;

    // onerror handler if our data is searched for correctly
    xhr.onerror = dataError;

    //  open connection and send the request
    xhr.open("GET", genreURL);
    xhr.send();

}

// create the API url to obtain data for anime schedules to display for the webpage
export const getAnimeSchedule = () => {
    // main entry point to web service
    const NEW_API_URL = "https://api.jikan.moe/v4/schedules/";

    // build up URL string
    let schURL = NEW_API_URL;

    // grab the user chosen search 'genre' from the <select> and append it to the URL
    let filter = document.querySelector("#filter").value;
    schURL += filter;

    // append 'Safe For Work' to our url
    schURL += "?sfw";

    // create a new XHR object
    let xhr = new XMLHttpRequest();

    // onerror handler if our data is searched for correctly
    xhr.onload = loaded.scheduleDataLoaded;

    // onerror handler if our data is searched for correctly
    xhr.onerror = dataError;

    //  open connection and send the request
    xhr.open("GET", schURL);
    xhr.send();


}

// creating url and request for getting data based on genres from the Jikan Anime Finder API
export const getData = () => {
    // 1 - main entry point to web service
    const SERVICE_URL = "https://api.jikan.moe/v4/anime?";


    // No API Key required!

    // 2 - build up our URL string
    let url = SERVICE_URL;


    // 3 - parse the user entered term we wish to search
    term = document.querySelector("#searchterm").value;
    localStorage.setItem("ns8363-search", term);



    // get rid of any leading and trailing spaces
    term = term.trim();
    // encode spaces and special characters
    term = encodeURIComponent(term);

    // if there's no term to search then bail out of the function (return does this)
    if (term.length < 1) {
        document.querySelector("#debug").innerHTML = "<b>Enter a search term first!</b>";
        return;
    }

    // append search term and 'Safe For Work' parameters to URL
    url += "&q=" + term;
    url += "&sfw";

    //	grab the user chosen search 'limit' from the <select> and append it to the URL
    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;



    // 4 - update the UI
    document.querySelector("#debug").innerHTML = "<b>Searching for '" + term + "'</b>";

    // display UI to console for testing
    //  console.log(url);

    // 5 - create a new XHR object
    let xhr = new XMLHttpRequest();

    // 6 - set the onload handler
    xhr.onload = loaded.dataLoaded;

    // 7 - set the onerror handler
    xhr.onerror = dataError;

    // 8 - open connection and send the request
    xhr.open("GET", url);
    xhr.send();



}

// if an error occurs when requesting the data from the Jikan Anime API
export const dataError = (e) => {
    //  console.log("An error occurred");
}
