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

// var trip = document.querySelector("#addTripCard").addEventListener("click", useData)
// document.querySelector("#addTripCard").addEventListener("click", addSupabase())
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
        // console.log(diffDays);
    });
});

document.querySelector("#addTripCard").addEventListener("click", function(){
    document.querySelector("#addTripCard").addEventListener("click", async (e) => {
        e.preventDefault();
        
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
        // document.getElementById('myForm').reset();
        console.log(data);

    })
    refreshData();

})


async function useData(){
    console.log("in useData");
    const cards = document.getElementById('my_div');


    const location = document.getElementById('location').value;
    const daterange = document.getElementById('daterange').value;


    // const l = trip.location;
    // console.log(l);
    // const dr = (trip.daterange);
    // console.log(dr);

    // const link = document.createElement('h5');
    // link.className = 'card-title';
    // link.innerHTML = "Rome, Italy";
    // cards.appendChild(link);
    
    // const newdate = document.createElement('p');
    // newdate.className = 'card-date';
    // newdate.innerHTML = "12/01/2022 - 12/03/2022";
    // cards.appendChild(newdate);

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
    // tripDetails.innerHTML += location;
    document.getElementById('myForm').reset();   

};


// function addSupabase() {
//     document.querySelector("#addTripCard").addEventListener("click", async (e) => {
//         e.preventDefault();
        
//         const location = document.getElementById('location').value;
//         const daterange = document.getElementById('daterange').value;
//         console.log(location);
//         console.log(daterange);
//         console.log(diffDays);

//         let { data, error } = await supabase
//             .from('trip')
//             .insert([
//                 { location: location, daterange: daterange , difference: diffDays},
//             ])
//         // document.getElementById('myForm').reset();
//         console.log(data);
//     });
//     refreshData();
 
// }

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
    useData(trip);

    // Object.keys(trip).forEach(key => {
    //     console.log(key); // 👉️ "name", "country"
    //     console.log(trip[key]); // 👉️ "Tom", "Chile"

    //     var info = trip[key];
    //     useData(info);
    // });
}

// window.addEventListener('DOMContentLoaded', (event) => {
//     if (removeP = true) {
//         console.log('DOM fully loaded and parsed');
//         refreshData();
//     // removePlaceholder()
//     }

// });

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