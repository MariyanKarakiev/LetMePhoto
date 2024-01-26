"use strict";

const form = document.getElementById('form');
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();

function overlayMenu() {
    if (document.getElementsByClassName('.nav-overlay').length) {
        return false;
    }

    var body = undefined;
    var menu = undefined;
    var menuItems = undefined;

    var init = function init() {
        body = document.querySelector('body');
        menu = document.querySelector('.menu-btn');
        menuItems = document.querySelectorAll('.nav__list-item');
        applyListeners();
    };

    var applyListeners = function applyListeners() {

        menu.addEventListener('click', function () {
            return toggleClass(body, 'nav-active');
        });

        menuItems.forEach(i => {
            if (i.textContent.trim() == "Контакти") {
                i.addEventListener('click', function () {
                    return toggleClass(body, "nav-active")
                })
            }
        });

    };
    var toggleClass = function toggleClass(element, stringClass) {
        if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };
    init();
}
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