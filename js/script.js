// SupaBase Connection
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rarwudilqkyaxobekvcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcnd1ZGlscWt5YXhvYmVrdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MDU1OTEsImV4cCI6MTk4MzA4MTU5MX0.G4jez26w4I65JHemzGjlGUtXuksbUcIeIgFc8xBWWDM'
const supabase = createClient(supabaseUrl, supabaseKey)

if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
}

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
const cards = document.querySelector("#addTripCard").addEventListener("click", addSupabase)

// let main;
// export default main = async () => {
//     let { data: trip, error } = await supabase
//     .from('tripcards')
//     .select('id, location, daterange')
//     .range(0,10)
//     if (error) {
//         console.error(error)
//         return
//     }
//     console.log(trip)
// }

async function useData(){
    let { data: trip, error } = await supabase
    .from('trip')
    .select('location, daterange')
    .range(0,10)
    if (error) {
        console.error(error)
        return
    }
    console.log(trip)

    // const location = document.getElementById('location').value;
    // const daterange = document.getElementById('daterange').value;

    return trip.forEach(async trip => {
        
        const tripDetails = `<a href="tripTemplate.html">
                <button id="trip-card">
                    <div class="card" style="width: 30rem; height: 30%">
                        <div class="card-body">
                        <h5 class="card-title">${location}</h5>
                        <p class="card-date">${daterange}</p>
                        </div>
                    </div>
                </button>
            </a>
        <div class="break"></div>`;
        document.getElementById("my_div").innerHTML += tripDetails;
        await apex.pwa.isInstallable();
        
    });
    
    const tripDetails = `<a href="tripTemplate.html">
                <button id="trip-card">
                    <div class="card" style="width: 30rem; height: 30%">
                        <div class="card-body">
                        <h5 class="card-title">${location}</h5>
                        <p class="card-date">${daterange}</p>
                        </div>
                    </div>
                </button>
            </a>
        <div class="break"></div>`;

    document.getElementById("my_div").innerHTML += tripDetails;
    

    // let newContainerDiv = document.createElement('div');
    // let containerDiv = document.querySelector('.newDiv');
    // newContainerDiv.classList.add('newDiv');
    // containerDiv.appendChild(newContainerDiv);
    // newContainerDiv.insertAdjacentHTML('beforebegin', tripDetails);

};
// window.onload.addEventListener("DOMContentloaded", addSupabase)

function addSupabase() {
    document.querySelector("#addTripCard").addEventListener("click", async (e) => {
        e.preventDefault();
        
        const location = document.getElementById('location').value;
        var daterange = document.getElementById('daterange').value;
        console.log(location);
        console.log(daterange);
        console.log(diffDays);

        let { data, error } = await supabase
            .from('trip')
            .insert([
                { location: location, daterange: daterange , difference: diffDays},
            ])
        // document.getElementById('myForm').reset();
    });

    useData();

    document.getElementById('myForm').reset();    
}



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