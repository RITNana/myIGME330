import * as options from "./options.js"

export const genreDataLoaded = (e) => {
    //  e.target is the xhr object
    let xhr = e.target;


     console.log(xhr.responseText);

    // turn the text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);

    // set results equal to the data held in the JSON 
    let results = obj.data;
    console.log(results)

    // console.log("results length: " + results.length);

    // will hold our string templating
    let bigString = ""

    // if no results are found, display an error message for the specific anime name used
    if (!results) {
        document.querySelector(".container").innerHTML = `<p><i>Problem! <b>No results for "${options.filter}"</b></i></p>`;
        return;
    }

    // iterate through the JSON data by using our initialized variable results
    for (let i = 0; i < results.length; i++) {
        let result = results[i];
        let genreURL = result.url;
        let title = result.title;
        let rating = result.rating;
        let synopsis = result.synopsis

        // set image for each anime result to the property name in the JSON
        let thumbnailURL = result.images.jpg.image_url;

        // if there is no image found, show the 'no image' picture
        if (!thumbnailURL) thumbnailURL = "images/no-image-found.png";

        // ES6 - String templating to hold our genre data 
        let line = `
        <div class="column is-one-fifth">
        <div class = 'result-container'>
         <div class = 'result'> <img src = '${thumbnailURL}' alt = '${title}'/> </div>
         <p class='name'>  <a href='${genreURL}'>${title}</a></p>
         <div class = 'rating'>  <p> ${rating} </p> 
         <p> ${synopsis} </p> 
         <p class = 'nameLink'> <a href='${genreURL}' target = '_blank'>${title}</a> </p>
         </div>
        </div>
        </div>`;

        // add this string templating line to our bigString
        bigString += line;


    }
    // output the entire content based on bigString
    document.querySelector(".columns.is-multiline").innerHTML = bigString;
    document.querySelector("#debug").innerHTML = "<b id = 'found' class = 'has-text-success has-text-weight-bold p-2'>Success!</b><p><i class = p-2>Here are " + results.length + " results";
}

// Display the shcedule data based on the request we sent to the XML
export const scheduleDataLoaded = (e) => {
    //  e.target is the xhr object
    let xhr = e.target;

    // xhr.responseText is the JSON file that was downloaded
    // console.log(xhr.responseText)

    let obj = JSON.parse(xhr.responseText);

    let results = obj.data;
    //  console.log("results length: " + results.length);

    // will hold out string templating
    let bigString = ""

    // if no results are found, display an error message for the specific anime name used
    if (!results) {
        document.querySelector("#debug").innerHTML = `<p><i>Problem! <b>No results for "${options.filter}"</b></i></p>`;
        return;
    }

    // 6 - put together HTML

    // iterate through the JSON data by using our initialized variable results
    for (let i = 0; i < results.length; i++) {
        let result = results[i]; // call every single element in each index
        let schURL = result.url; // set the url property in the JSON to our url variable
        let title = result.title; // set the title property in the JSON to our title variable
        let rating = result.rating; // set the rating property in the JSON declared to pur rating variable
        let synopsis = result.synopsis // set the synopsis property in the JSON declared to our synopsis variable

        let thumbnailURL = result.images.jpg.image_url; // set image for each anime result to the property name in the JSON
        if (!thumbnailURL) thumbnailURL = "images/no-image-found.png"; // if there is no image found, show the 'no image' picture

        // ES6 String templating to display the schedule data
        let line = `
        <div class="column is-one-fifth">
        <div class = 'result-container'>
       <div class = 'result'> <img src = '${thumbnailURL}' alt = '${title}'/> </div>
       <p class='name'>  <a href='${schURL}'>${title}</a></p>
       <div class = 'rating'>  <p> ${rating} </p> 
       <p> ${synopsis} </p>
       <p class = 'nameLink'> <a href='${schURL}' target = '_blank'>${title}</a> </p>
       </div>
      </div>
      </div>`;

        // add line to bigString
        bigString += line;

    }

    // 7 - display final results to user with bigString
    document.querySelector(".columns.is-multiline").innerHTML = bigString;
    document.querySelector("#debug").innerHTML = "<b id  = 'found' class = 'has-text-success has-text-weight-bold p-2'>Success!</b><p><i class = p-2>Here are " + results.length + " results";

}



// displaying the anime search term data based on the requests for certain properties
export const dataLoaded = (e) => {
    // 1 - e.target is the xhr object
    let xhr = e.target;

    // 2 - xhr.responseText is the JSON file we just downloaded
    //  console.log(xhr.responseText);

    // 3 - turn the text into a parsable JavaScript object
    let obj = JSON.parse(xhr.responseText);

    // 4 - if there are no results, print a message and return
    if (obj.error) {

        document.querySelector("#debug").innerHTML = `<p><i>Problem! <b>No search term Found! Please enter a search term</b></i></p>`;
        return; // Bail out
    }




    let results = obj.data;
    // console.log("results length: " + results.length)
    let bigString = "";

    // if no results are found, display an error message for the specific anime name used
    if (!results) {
        document.querySelector("#debug").innerHTML = `<p><i>Problem! <b>No results for "${options.term}"</b></i></p>`;
        return;
    }

    // 5 - if there is an array of results, loop through them

    for (let i = 0; i < results.length; i++) {
        let result = results[i]; // call every single element in each index
        let url = result.url; // set the url property in the JSON to our url variable
        let title = result.title; // set the title property in the JSON to our title variable
        let rating = result.rating; // set the rating property in the JSON declared to pur rating variable
        let synopsis = result.synopsis; // set the synopsis property in the JSON declared to our synopsis variable

        // set image for each anime result to the property name in the JSON
        let thumbnailURL = result.images.jpg.image_url;

        // if there is no image found, show the 'no image' picture
        if (!thumbnailURL) thumbnailURL = "images/no-image-found.png";

        // ES6 - String templating to display our anime search data 
        let line = `
        <div class="column is-one-fifth">
        <div class = 'result-container'>
        <div class = 'result'> <img src = '${thumbnailURL}' alt = '${title}'/> </div>
        <p class='name'>  <a href='${url}'>${title}</a></p>
        <div class = 'rating'>  <p> ${rating} </p> 
        <p> ${synopsis} </p>
        <p class = 'nameLink'> <a href='${url}' target = '_blank'>${title}</a> </p>
        </div>
       </div>
       </div>`;


        // add our display to bigString
        bigString += line;

    }

    // 7 - display final results to user
    document.querySelector(".columns.is-multiline").innerHTML = bigString;

    // success message when results are found 
    document.querySelector("#debug").innerHTML = "<b id = 'found' class = 'has-text-success has-text-weight-bold p-2'>Success!</b><p><i class = p-2>Here are " + results.length + " results for '" + options.term + "'</i></p>";

}