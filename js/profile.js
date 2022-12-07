import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = 'https://rarwudilqkyaxobekvcn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhcnd1ZGlscWt5YXhvYmVrdmNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njc1MDU1OTEsImV4cCI6MTk4MzA4MTU5MX0.G4jez26w4I65JHemzGjlGUtXuksbUcIeIgFc8xBWWDM'
const supabase = createClient(supabaseUrl, supabaseKey)

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

// Update Infomation
document.querySelector("#update").addEventListener("click", updateProfile);

function updateProfile() {
    console.log("in updateProfile");

    const updateProfile = document.getElementById('profileContent');

    const name = document.getElementById('name').value;
    const tagline = document.getElementById('tagline').value;
    const about = document.getElementById('about').value;

    console.log(name, tagline, about);
    let changeProfile =
        `<div class="row justify-content-center" id="profileContent"> 
        <div class="col-6">
            <h2 class="name">${name}</h2>
        </div>
        <div class="col">
            <button class="editPopup" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
                <i class="fa-solid fa-user-pen"></i>
            </button>
        </div>
        <div class="row">
            <small class="tagline">${tagline}</small>
        </div>
        <div class="row">
            <textarea class="about">${about}</textarea>
            </div>
        </div>`;

    updateProfile.innerHTML = changeProfile;
}
