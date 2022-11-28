
// NAV
const tabs = document.querySelectorAll(".tab");

tabs.forEach((clickedTab) => {
    clickedTab.addEventListener('click', () =>{
        tabs.forEach((tab) => {
            tab.classList.remove("active");
        });

        clickedTab.classList.add("active");
        const clickedTabColor = getComputedStyle(clickedTab).getPropertyValue("color");
        console.log(clickedTabColor);
    });
});

// MAP
navigator.geolocation.getCurrentPosition(
    function (position) {
        initMap(position.coords.latitude, position.coords.longitude);
    },
    function errorCallback(error) {
        console.log(error);
    }
);

let map;

async function initMap(lat, lng) {
    var myLatLng = {
        lat,
        lng,
    };
    console.log(myLatLng);
    
    const localContextMapView = new google.maps.localContext.LocalContextMapView({
        element: document.getElementById("map"),
        placeTypePreferences: [
        { type: "restaurant" },
        { type: "tourist_attraction" }, 
        { type: "park" }, 
        { type: "cafe" }, 
        { type: "shopping_mall" }, 
        { type: "university" }, 
        ],
        maxPlaceCount: 20,
    });
    map = localContextMapView.map;
    map.setOptions({
        center: myLatLng,
        zoom: 14,
    });

    const marker = new google.maps.Marker({ position: myLatLng });
    marker.setMap(map);

}

window.initMap = initMap;


