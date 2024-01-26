"use strict";

const form = document.getElementById('form');
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();


function animateOnIntersect() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
            // else{
            //     entry.target.classList.remove("visible");
            // }
        });
    })
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el)=>observer.observe(el))
}

document.addEventListener("DOMContentLoaded",()=>{
    animateOnIntersect();
});