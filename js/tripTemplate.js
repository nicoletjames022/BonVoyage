// SupaBase Connection
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rarwudilqkyaxobekvcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcnd1ZGlscWt5YXhvYmVrdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MDU1OTEsImV4cCI6MTk4MzA4MTU5MX0.G4jez26w4I65JHemzGjlGUtXuksbUcIeIgFc8xBWWDM'
const supabase = createClient(supabaseUrl, supabaseKey)

window.onload = function() { 
    console.log('DOM loading');
    syncTimeline();
    if (removeP = true) {
        refreshData();
        // removePlaceholder()
    }
};

// Setting up the number of days from user input
function setDifferentDay(differenceInfo){
    console.log("in setDifferent ");
    const userDayInput = differenceInfo.difference;
    console.log(userDayInput);

    const days = document.getElementById('dateTimeline');
    let generateDays;
    for (let i = 1; i < userDayInput; i++) {
        console.log("in for loop ");
        generateDays = `<input type="radio" class="btn-check" name="btnradio" id="btnradio${i+1}" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio${i+1}">Day ${i+1}</label>`;

        days.innerHTML += generateDays;
    }
};
async function syncTimeline(){
    const urlParams = new URLSearchParams(window.location.search);
    const greetingValue = urlParams.get('greeting');
    console.log(greetingValue);  


    let { data: trip, error } = await supabase
    .from('trip')
    .select('difference')
    if (error) {
        console.error(error)
        return
    }
    Object.keys(trip).forEach(key => {
        // console.log(i);
        var differenceInfo = trip[key];
        setDifferentDay(differenceInfo);
    });
}


// remove and show placeholder texts
let removeP = false;
function removePlaceholder() {
    var placeholder = document.getElementById("replace");
    placeholder.remove();
    removeP = true;
}
document.querySelector("#show-addTrip").addEventListener("click", function(){
    if (!removeP) removePlaceholder();
    document.querySelector('.sm-text').style.display = "block";
});


// Showing & getting data
document.querySelector("#addTimelineCard").addEventListener("click", addSupabase)
async function addSupabase() {
    const locationName = document.getElementById('locationName').value;
    var t = document.querySelector('input[type="time"]').value;
    const time = t;
    const whichDay = document.getElementById('whichDay').value;
    const triptype = document.getElementById('tripCategory').value;

    let { data, error } = await supabase
        .from('timeline')
        .insert([
            { locationname: locationName, time: time, whichDay: whichDay, triptype: triptype },
        ])
    console.log(data, error);
    // if(removeP == true){
    //     refreshData();
    // }
    refreshData();

    // document.getElementById('myForm').reset();
}
async function refreshData(){
    let { data: timelinecard, error } = await supabase
    .from('timeline')
    .select('id, locationname, time, whichDay, triptype')
    .range(0,10)
    if (error) {
        console.error(error)
        return
    }
    Object.keys(timelinecard).forEach(key => {
        // console.log(timelinecard[key]); 

        var info = timelinecard[key];
        useTimelineData(info);
    });
    removePlaceholder()
}
async function useTimelineData(data){
    const whichDay = data.whichDay;
    const locationName = data.locationname;
    const time = data.time;
    const tripType = data.triptype;

    const cards = document.getElementById('my_div');
    const cardsTwo = document.getElementById('my_div2');
    const cardsThree = document.getElementById('my_div3');
    const cardsfour = document.getElementById('my_div4');
    // const cards = document.getElementsByClassName('tab-content');

    const timelineCards = `<div class="timeline-card tabs-content" data-tab=${whichDay}>
            <div class="card">
                <div class="card-body">
                    <h6><small>${time}</small></h6>
                    <h6><small>${tripType}</small></h6>
                    <h4 class="card-title">${locationName}</h4>
                </div>
            </div>
        </div>`;

    console.log(timelineCards);

    cards.innerHTML += timelineCards;
    document.getElementById('myForm').reset();  

};

function setupTabs(){
    document.querySelectorAll("#btnradio").forEach(btn => {
        btn.addEventListener("click", () => {

        })

    });
}


// async function useTimelineDataOne(timelinedataone){
//     const locationname = timelinedataone.locationname;
//     const t = timelinedataone.time;
//     const triptype = timelinedataone.triptype;

//     const locationName = locationname;
//     const time = t;
//     const tripType = triptype;
//     const cards = document.getElementById('my_div');

//     const timelineCards = `<section class="timeline-card">
//             <div class="card">
//                 <div class="card-body">
//                     <h6><small>${time}</small></h6>
//                     <h6><small>${tripType}</small></h6>
//                     <h4 class="card-title">${locationName}</h4>
//                 </div>
//             </div>
//         </section>`;

//     cards.innerHTML += timelineCards;
//     document.getElementById('myForm').reset();   
// };


// window.addEventListener('DOMContentLoaded', (event) => {
//     console.log('DOM fully loaded and parsed');
//     refreshData();
//     if (removeP = false) {
//         removePlaceholder()
//     }
// });











// DAY 2
document.querySelector("#show-addSecondTrip").addEventListener("click", function(){
    const placeholder = document.getElementById("replace");
    placeholder.remove();

    document.querySelector('.sm-text').style.display = "block";
});
document.querySelector("#addSecondTimelineCard").addEventListener("click", useDataTwo)

async function useDataTwo(){

    const locationName = document.getElementById('locationName2').value;
    var t = document.getElementById('time2').value;
    const time = t;
    const tripCategory = document.getElementById('tripCategory2').value;
    console.log(t);
    console.log(time);

    const timelineCards2 = `<section class="timeline-card">
            <div class="card">
                <div class="card-body">
                    <h6><small>${time}</small></h6>
                    <h6><small>${tripCategory}</small></h6>
                    <h4 class="card-title">${locationName}</h4>
                </div>
            </div>
        </section>`;

    append_to_div("secondDiv", timelineCards2);

};

document.querySelector("#addSecondTimelineCard").addEventListener("click", async (e) => {
    e.preventDefault();

    const locationName = document.getElementById('locationName2').value;
    var t = document.getElementById('time2').value;
    const time = t;
    const tripCategory = document.getElementById('tripCategory2').value;

    console.log(locationName);
    console.log(time);
    console.log(tripCategory);

    let { data, error } = await supabase
            .from('timelineCardsDay2')
            .insert([
                { locationName: locationName, time: time, tripCategory: tripCategory },
            ]) // insert data into supabase
        console.log(data, error);
    
    document.getElementById('mySecondForm').reset();
});


// DAY 3
document.querySelector("#show-addThirdTrip").addEventListener("click", function(){
    var placeholder = document.getElementById("replace");
    placeholder.remove();

    // document.querySelectorAll('.sm-text').style.display = "block";
});
document.querySelector("#addThirdTimelineCard").addEventListener("click", useDataThree)

async function useDataThree(){
    const locationName = document.getElementById('locationName3').value;
    var t = document.getElementById('time3').value;
    const time = t;
    const tripCategory = document.getElementById('tripCategory3').value;

    const timelineCards3 = `<section class="timeline-card">
            <div class="card">
                <div class="card-body">
                    <h6><small>${time}</small></h6>
                    <h6><small>${tripCategory}</small></h6>
                    <h4 class="card-title">${locationName}</h4>
                </div>
            </div>
        </section>`;

    append_to_div("thirdDiv", timelineCards3);

};

document.querySelector("#addThirdTimelineCard").addEventListener("click", async (e) => {
    e.preventDefault();

    const locationName = document.getElementById('locationName3').value;
    var t = document.getElementById('time3').value;
    const time = t;
    const tripCategory = document.getElementById('tripCategory3').value;

    console.log(locationName);
    console.log(time);
    console.log(tripCategory);

    let { data, error } = await supabase
            .from('timelineCardsDay3')
            .insert([
                { locationName: locationName, time: time, tripCategory: tripCategory },
            ]) // insert data into supabase
        console.log(data, error);
    
    document.getElementById('myThirdForm').reset();
});









// TIMELINE TABS
const tabs = document.querySelectorAll('[data-tab-value]')
const tabInfos = document.querySelectorAll('[data-tab-info]')
  
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document
            .querySelector(tab.dataset.tabValue);

        tabInfos.forEach(tabInfo => {
            tabInfo.classList.remove('active')
        })
    target.classList.add('active');
    })
})

