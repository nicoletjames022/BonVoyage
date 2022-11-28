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

// Profile Pic
// const imgDiv = document.querySelector(".profile-picDiv");
// const img = document.querySelector("#photo");
// const file = document.querySelector("#file");
// const uploadBtn = document.querySelector("#uploadBtn");

// imgDiv.addEventListener('mouseenter', function() {
//     uploadBtn.style.display = "block"
// });
// imgDiv.addEventListener('mouseleave', function() {
//     uploadBtn.style.display = "none"
// });

// file.addEventListener('change', function(){
//     const chosenFile = this.files[0];

//     if(chosenFile) {
//         const reader = new FileReader();

//         reader.addEventListener('load', function(){
//             img.setAttribute('scr', reader.result);
//             console.log("here");
//         });
//         reader.readAsDataURL(chosenFile);
//     }
// });


document.querySelector("#update").addEventListener("click", updateProfile);

function updateProfile() {
    const placeholder = document.getElementById("description");
    placeholder.remove();

    console.log("in updateProfile");

    let newContainerDiv = document.createElement('div');
    let containerDiv = document.querySelector('.newDiv');

    newContainerDiv.classList.add('newDiv');
    containerDiv.appendChild(newContainerDiv);

    let name = document.getElementById('name').value;
    let tagline = document.getElementById('tagline').value;
    let about = document.getElementById('about').value;

    console.log(name, tagline, about);
    let changeProfile = `<div class="description">
        <h2 class="name">${name}</h2>
        <small id="tagline">${tagline}</small>
        <textarea id="about" class="text-center">${about}</textarea>
    </div>`;

    newContainerDiv.insertAdjacentHTML('beforebegin', changeProfile);
}
