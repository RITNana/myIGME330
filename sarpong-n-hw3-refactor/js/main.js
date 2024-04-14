import * as options from "./options.js"

// store search term data and clear fields based on which DOM element is selected
const init = () => {

    // with the onclick event, store the search term into the webpage's localStorage
    document.querySelector("#search").onclick = options.getData;
    const prefix = "ns8363-"; // prefix for search key (based on my student username)
    const searchKey = prefix + "search"; // the term "search" appended to my username for full key
    const storedTerm = localStorage.getItem(searchKey); //storedTerm returns a string (the user input)

    if (storedTerm) {
        document.querySelector("#searchterm").value = storedTerm; // set the value to be storedTerm 
    } else {
        document.querySelector("#searchterm").value = "naruto"; // if there is no input to be stored, hold the input 'naruto'
    }


    document.querySelector("#filter").addEventListener("change", function () {
        options.getAnimeSchedule(); // Call the function to fetch data based on the selected day

        if (options.getAnimeSchedule) {
            document.querySelector("#searchterm").value = ""; // clear search field
            document.querySelector("#limit").value = ""; // clear limit selection
            document.querySelector("#genre").value = ""; // clear genre selection
        }
    });

    document.querySelector("#genre").addEventListener("change", function () {
        options.getGenres(); // Call the function to fetch data based on the selected genre

        if (options.getGenres()) {
            document.querySelector("#searchterm").value = ""; // clear search field
            document.querySelector("#limit").value = ""; // clear limit selection
            document.querySelector("#filter").value = ""; // clear genre selection
        }
    });


}
export {init}
