"use strict";

const form = document.getElementById('form');
const body = document.getElementById('body');
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();
let imgsCount = 0

function populateGallery(galleryName) {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.hidden = false;
    const widths = [400, 800, 1200]
    const pageName = 'portraits'
    const href = 'https://ik.imagekit.io/ycbriiund/LetMePhoto/' + galleryName
    const href2 = 'images/' + galleryName
    let tallImgNumbers = []

    //sets number of images to be requested and images with numbers in their names that are tall
    switch (galleryName) {
        case "portraits":
            imgsCount = 12
            break;
        case "balls_weddings":
            imgsCount = 9
            break;
        case "events":
            imgsCount = 11
            break;
        case "others":
            imgsCount = 0
            break;
    }

    function galleryElementFactory(galleryContainer) {
        //clean images
        while (galleryContainer.firstChild) {
            galleryContainer.removeChild(galleryContainer.firstChild)
        }

        for (let i = imgsCount; 1 <= i; i--) {

            const imageCard = document.createElement('div');
            const imageLink = document.createElement('a');
            const image = document.createElement('img');

            let srcsetArr = widths.map(w => `${href}/tr:w-${w}/img${i}.jpg ${w}w`)

            let imageType = tallImgNumbers.includes(i) ? 'img-tall' : 'img-wide';
            imageCard.classList = [`image-link ${imageType}`];

            //sets class for chocolat usage
            imageLink.classList = ["galleryImg"]
            //for when optimised images are not available in chocolat
            imageLink.href = `${href2}/img${i}.jpg`
            //for delivery of optimised images in chocolat
            imageLink.dataset.srcset = srcsetArr

            //for lazy loading 
            image.classList = ["lazy img-fluid"];
            //for delivery of optimised images in gallery section
            image.srcset = srcsetArr;
            //for when optimised images are not available
            image.src = `${href2}/img${i}.jpg`

            imageLink.appendChild(image);
            imageCard.appendChild(imageLink);
            galleryContainer.appendChild(imageCard);
        }
    }

    if (page !== "index.html") {
        galleryElementFactory(galleryContainer);
    }
}
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
    hiddenElements.forEach((el) => observer.observe(el))
}
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
    animateOnIntersect();

    // Get all anchor elements within the carousel
    var carouselAnchors = document.querySelectorAll('.carousel-item a');

    // Add click event listeners to each anchor
    carouselAnchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            // Prevent the default behavior (e.g., following the link)
            event.preventDefault();
            // Get the text content of the clicked anchor's parent carousel-caption
            console.log(anchor.id)
            populateGallery(anchor.id);
            window.location.href = anchor.getAttribute('href');
        });
    });
});