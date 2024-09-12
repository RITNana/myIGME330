import * as map from "./map.js";
import * as ajax from "./ajax.js";
import * as storage from "./storage.js"

// I. Variables & constants
// NB - it's easy to get [longitude,latitude] coordinates with this tool: http://geojson.io/
const lnglatNYS = [-75.71615970715911, 43.025810763917775];
const lnglatUSA = [-98.5696, 39.8282];

let geojson;
let favoriteIds = ["????"];

let key = "favorites";
let feature

// write the favoriteIDs to our storage 
const writeItems = () => {
	storage.writeToLocalStorage(key, favoriteIds)
  }

// II. Functions
const setupUI = () => {
	// NYS Zoom 5.2
	document.querySelector("#btn1").onclick = () => {
		map.setZoomLevel(5.2);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatNYS);
	};

	// NYS isometric view
	document.querySelector("#btn2").onclick = () => {
		map.setZoomLevel(5.5);
		map.setPitchAndBearing(45, 0);
		map.flyTo(lnglatNYS);
	};


	// World zoom 0
	document.querySelector("#btn3").onclick = () => {
		map.setZoomLevel(3);
		map.setPitchAndBearing(0, 0);
		map.flyTo(lnglatNYS);
	};

	// add to favorites button
	document.querySelector("#btn-favorite").onclick = () => {
		addToFavorites(feature.id);
	}

	// delete from favorites button
	document.querySelector("#btn-unfavorite").onclick = () => {
		deleteFromFavorites(feature.id)
	}
}

// show the details of our map icons, displaying their title, address, phone number and URL
const showFeatureDetails = (id) => {
	console.log(`showFeatureDetails - id=${id}`);
	 feature = getFeatureById(id);
	document.querySelector("#details-1").innerHTML = `Info for ${feature.properties.title}`;
	document.querySelector("#details-2").innerHTML = `Address: ${feature.properties.address} <br> 
	Phone: <a href = "tel: ${feature.properties.phone}">${feature.properties.phone}</a> <br> 
	Website: <a href = "${feature.properties.url}">${feature.properties.url}</a>`

	// if one of the markers chosen IS a favorite, deactive the favorite button but show the both buttons
	if (favoriteIds.includes(id)) {
		document.querySelector("#btn-favorite").disabled = true;
		document.querySelector("#btn-unfavorite").disabled = false;

		document.querySelector("#btn-favorite").style.display = "block"
		document.querySelector("#btn-unfavorite").style.display = "block";
	} else if(!favoriteIds.includes(id)){ // deactivate the delete button and show both buttons
		document.querySelector("#btn-favorite").disabled = false;
		document.querySelector("#btn-unfavorite").disabled = true;

		document.querySelector("#btn-favorite").style.display = "block"
		document.querySelector("#btn-unfavorite").style.display = "block";
	}


	document.querySelector("#details-3").innerHTML = `${feature.properties.description}`
	
	

};

// returns the features by the id parameter passed in
const getFeatureById = (id) => {
	return geojson.features.find((feature) => feature.id === id)
}

// refresh out favorutes list, showing our added and subtracted favorites
const refreshFavorites = () => {
	const favoritesContainer = document.querySelector("#favorites-list");
	favoritesContainer.innerHTML = "";
	for (const id of favoriteIds) {
		favoritesContainer.appendChild(createFavoriteElement(id))
	}
}

// create the element to hold a favorite
const createFavoriteElement = (id) => {
	 feature = getFeatureById(id);
	const a = document.createElement("a");
	a.className = "panel-block";
	a.id = feature.id
	a.onclick = () => {
		showFeatureDetails(a.id);
		map.setZoomLevel(6);
		map.flyTo(feature.geometry.coordinates);
	};
	a.innerHTML = `
	<span class ="panel-icon">
	<i class = "fas fa-map-pin"></i>
	</span>
	${feature.properties.title}
	`;
	return a;
};

// push the favorite element to out list and write it to out storage 
const addToFavorites = (id) => {
	favoriteIds.push(id);
	refreshFavorites();
	showFeatureDetails(id);
	writeItems();
}


// delete favorite from our list and update storage
const deleteFromFavorites = (id) => {
	const index = favoriteIds.indexOf(id);
	if (index > -1) {
		favoriteIds.splice(index, 1);
	  }
	refreshFavorites();
	showFeatureDetails(id);
	writeItems();
}

// read from our local storage 
const ReadFromStorage = () => {
	// Load the items array from local storage
	favoriteIds = storage.readFromLocalStorage(key);
	// Check if the loaded value is an array, and if not, set items to an empty array
	if (!Array.isArray(favoriteIds)) {
		favoriteIds = [];
	}

	
};


// when the page loads, perform these functions
const init = () => {
	map.initMap(lnglatNYS);
	ReadFromStorage();
	ajax.downloadFile("data/parks.geojson", (str) => {
		geojson = JSON.parse(str);
		console.log(geojson);
		map.addMarkersToMap(geojson, showFeatureDetails)
		refreshFavorites();
		setupUI();
		
	})
};

init();