import data from "./data.json" with {type: "json"};

const thumbnailsDiv = document.getElementById("thumbnails");
const detailsDiv = document.getElementById("details");
const moreButton = document.getElementById("more");

const searchInput = document.getElementById("search");
const priceInput = document.getElementById("price");

// STATE
let selectedDestination = data[0]; //de destination waarvan de details getoond worden
// let searchBy = "";
let priceFilter = undefined;

renderData(data);

function renderData(destinations) {
    console.log("renderData", destinations);


    detailsDiv.innerHTML = destinations
        .map(renderDestinationDetails)
        .join(' ')


    thumbnailsDiv.innerHTML = destinations
        .filter((destinationSearch) => {
            const search = searchInput.value.toLowerCase()
            return destinationSearch.destinationName.toLowerCase().includes(search)
        })
        .filter((priceSearch) => {
            const price = priceInput.value
            return priceSearch.priceRangeEur > (price)
        })
        .map(renderDestinationThumbnail).join(' ')



    //TODO fill detailsDiv.innerHTML with results of renderDestinationDetails(selectedDestination)

    //TODO fill thumbnailsDiv.innerHTML with results of renderDestinationThumbnail
}

function renderDestinationThumbnail(destination) {
    const image = 'img/placeholder.jpeg';
    return `
	<div id = "dest-${destination.id}" class="">
		<div class="card m-1 p-1">
			<div class="card-header bg-dark text-white p-0">
			    <img src="${destination.imageUrl ? destination.imageUrl : image}" class="card-img-top object-fit-cover" />
			</div>
		</div>
	</div>
  `;
}

function renderDestinationDetails(destination) {
    const image = 'img/placeholder.jpeg';
    return `
        <div class="container-fluid">
			<div class="row mb-2">
			    <h2 style="background-color: black; color: white">${destination.destinationName}</h2>
                <div class="col-12 col-md-6">
                    <img src="${destination.imageUrl ? destination.imageUrl : image}" class="card-img-top object-fit-cover" />
                </div>
                <div class="col-12 col-md-6">
                <p>${destination.city} in ${destination.country}</p>
                <p>${destination.description}</p>
                </div>
             </div>
             <div>
                <p class="mb-0">gemiddelde temperatuur: ${destination.averageTemperatureC} °C</p>
                <p class="mb-0">beste seizoen: ${destination.bestTravelSeason}</p>
                <p>prijs: van ${destination.priceRangeEur}</p>
                <div style="border: solid lightgray 1px; border-radius: 4px">
                    <p>activiteiten in ${destination.destinationName}:</p>
                    <ol>
                        <li>${destination.popularActivities}</li>
                    </ol>
                </div>
             </div>
        </div>
    `
}

searchInput.addEventListener("input", () => renderData(data));

priceInput.addEventListener("input", () => renderData(data));

moreButton.addEventListener("click", () => renderData(data))

//- toon details destination (pas hiervoor aan: functie renderDestinationDetails)
//- toon destination thumbnails (pas hiervoor aan: functies renderData en renderDestinationThumbnail)
//- ol activities
//- search by name
//- search by price
//- click thumbnail: show details
