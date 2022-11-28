// SupaBase Connection
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rarwudilqkyaxobekvcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcnd1ZGlscWt5YXhvYmVrdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MDU1OTEsImV4cCI6MTk4MzA4MTU5MX0.G4jez26w4I65JHemzGjlGUtXuksbUcIeIgFc8xBWWDM'
const supabase = createClient(supabaseUrl, supabaseKey)

// Day 1

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
document.querySelector("#addTimelineCard").addEventListener("click", useData)




function append_to_div(div_name, data){
    document.getElementById(div_name).innerHTML += data;
    // var changeDom = document.getElementById(div_name).appendChild(data)
    // div_name.appendChild(changeDom)
}

async function useData(){
    const locationName = document.getElementById('locationName').value;
    const t = document.querySelector('input[type="time"]');
    const time = t.value;
    const tripCategory = document.getElementById('tripCategory').value;

    const timelineCards = `<section class="timeline-card">
            <div class="card">
                <div class="card-body">
                    <h6><small>${time}</small></h6>
                    <h6><small>${tripCategory}</small></h6>
                    <h4 class="card-title">${locationName}</h4>
                </div>
            </div>
        </section>`;

    append_to_div("my_div", timelineCards);

};
document.querySelector("#addTimelineCard").addEventListener("click", async (e) => {
    e.preventDefault();

    const locationName = document.getElementById('locationName').value;
    const t = document.querySelector('input[type="time"]');
    const time = t.value;
    const tripCategory = document.getElementById('tripCategory').value;

    console.log(locationName);
    console.log(time);
    console.log(tripCategory);

    let { data, error } = await supabase
            .from('timelineCards')
            .insert([
                { locationName: locationName, time: time, tripCategory: tripCategory },
            ]) // insert data into supabase
        console.log(data, error);
    
    document.getElementById('myForm').reset();    
    
});

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

