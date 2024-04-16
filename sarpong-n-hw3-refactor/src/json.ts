export const loadJSON = () => {
    // - using XHR to retireve data from URL
    
    const url = "./data/av-data.json";
    const xhr = new XMLHttpRequest;

    xhr.onload = (e) => {
        let json;

        try{

            // targeting the retrieved JSON data from the XML request
            // declare and intialize a variable to parse, or convert, JSON string into an object
            
            json = JSON.parse(xhr.responseText)
        } catch{
            console.log("BAD JSON!");
            return;
        }

        const obj = json;

        // display the list items of audio files in a new array and join array

        let html = ""
        html += `<h2>${obj.title}</h2>`
        html += `<ol>${obj.audioFiles.map(w => `<li>${w}</li>`).join("")}</ol>`
        html += `<p>${obj.instructions}</p>`

         // reference the <div> and update the HTMl webpage 
        document.querySelector("#output").innerHTML = html;
    };

    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${xhr.status}`);
    xhr.open("GET", url); // reinitializes the request we sent "GET"
    xhr.send(); // send request to the server
}

