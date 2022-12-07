// SupaBase Connection
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rarwudilqkyaxobekvcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcnd1ZGlscWt5YXhvYmVrdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MDU1OTEsImV4cCI6MTk4MzA4MTU5MX0.G4jez26w4I65JHemzGjlGUtXuksbUcIeIgFc8xBWWDM'
const supabase = createClient(supabaseUrl, supabaseKey)

window.onload = function() { 
    console.log('DOM loading');
    refreshData();
    syncTimeline();
    if (removeP = false) {
        removePlaceholder()
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
        generateDays = `<input type="radio" class="btn-check" name="btnradio" id="btnradio" data-for-tab="${i+1}" autocomplete="off">
        <label class="btn btn-outline-primary" for="btnradio${i+1}">Day ${i+1}</label>`;

        days.innerHTML += generateDays;
    }
};
async function syncTimeline(){
    const param = document.querySelector('#card-title');
    var href = document.querySelector('a').getAttribute('href');
    var hrefa = document.querySelector('a').href;
    console.log(href);
    console.log(param);


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

