// SupaBase Connection
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rarwudilqkyaxobekvcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcnd1ZGlscWt5YXhvYmVrdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MDU1OTEsImV4cCI6MTk4MzA4MTU5MX0.G4jez26w4I65JHemzGjlGUtXuksbUcIeIgFc8xBWWDM'
const supabase = createClient(supabaseUrl, supabaseKey)

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
     navigator.serviceWorker.register('../web-server.js').then( () => {
      console.log('Service Worker Registered')
     })
   })
}

let removeP = false;
function removePlaceholder() {
    var placeholder = document.getElementById("replace");
    placeholder.remove();
    removeP = true;
}

document.querySelector("#show-addTrip").addEventListener("click", function(){
    if (!removeP) removePlaceholder();
});

document.querySelector("#addTripCard").addEventListener("click", addSupabase)

let diffDays = 0;
$(function() {
    $('input[name="daterange"]').daterangepicker({
        opens: 'left',
    }, function(start, end, label) {
        var date1 = new Date(start.format('YYYY-MM-DD'));
        var date2 = new Date(end.format('YYYY-MM-DD'));
        var timeDiff = Math.abs(date2.getTime() - date1.getTime()); 
        diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24) + 1); 
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});

async function useData(trip){
    console.log("in useData");
    const l = trip.location;
    const dr = (trip.daterange);

    const cards = document.getElementById('my_div');
    const location = l;
    const daterange = dr;

    const tripDetails = `<a href="tripTemplate.html">
                <button id="trip-card">
                    <div class="card" style="width: 32rem; height: 30%">
                        <div class="card-body">
                        <h5 class="card-title">${location}</h5>
                        <p class="card-date">${daterange}</p>
                        </div>
                    </div>
                </button>
            </a>
        <div class="break"></div>`;
        
    cards.innerHTML += tripDetails;
    // document.getElementById('myForm').reset();   
};


async function addSupabase() {
    const location = document.getElementById('location').value;
    const daterange = document.getElementById('daterange').value;

    console.log(location);
    console.log(daterange);
    console.log(diffDays);

    let { data, error } = await supabase
        .from('trip')
        .insert([
            { location: location, daterange: daterange , difference: diffDays},
        ])

    refreshData();
    document.getElementById('myForm').reset();
}

async function refreshData(){
    let { data: trip, error } = await supabase
    .from('trip')
    .select('location, daterange')
    .range(0,10)
    if (error) {
        console.error(error)
        return
    }
    console.log("in refresh");
    console.log(trip);
    // useData(trip);

    Object.keys(trip).forEach(key => {
        console.log(key); // 👉️ "name", "country"
        console.log(trip[key]); // 👉️ "Tom", "Chile"

        var info = trip[key];
        useData(info);
    });
    removePlaceholder()
}

window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    refreshData();
    if (removeP = false) {
        removePlaceholder()
    }

});

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



// function append_to_div(div_name, data){
//     // document.getElementById(div_name).innerHTML += data;

//     let newContainerDiv = document.createElement('div');
//     let containerDiv = document.querySelector('.newDiv');
    
//     newContainerDiv.classList.add('newDiv');
//     containerDiv.appendChild(newContainerDiv);

//     newContainerDiv.insertAdjacentHTML('beforebegin', data);
// }


// window.onload = function() {
//     localStorage.getItem(supabase)
//     localStorage.getItem("sections")
//     var values = [],
//         keys = Object.keys(localStorage),
//         i = keys.length;

//     while ( i-- ) {
//         values.push( localStorage.getItem(keys[i]) );
//     }

//     return values;
// }