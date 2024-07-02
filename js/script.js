"use strict";

const form = document.getElementById('form');
const body = document.querySelector('body');
const galleryContainer = document.getElementById("gallery");
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();
let imgsCount = 0

function populateGallery(galleryName) {
    const widths = [400, 767, 1200]
    const pageName = 'portraits'
    const href = 'https://ik.imagekit.io/ycbriiund/LetMePhoto/' + galleryName
    const href2 = 'images/' + galleryName
    let tallImgNumbers = []

    //sets number of images to be requested and images with numbers in their names that are tall
    switch (galleryName) {
        case "portraitss":
            imgsCount = 16
            break;
        case "balls":
            imgsCount = 13
            break;
        case "events":
            imgsCount = 11
            break;
        case "weddings":
            imgsCount = 7
            break;
        case "products":
            imgsCount = 20
            break;
        case "street":
            imgsCount = 3
            break;
    }
    galleryElementFactory(galleryContainer)
    galleryContainer.hidden = false;
    galleryContainer.style.display = "block";
    //     galleryContainer.scrollIntoView({
    //         behavior: 'smooth' // You can also use 'auto' or 'instant'
    // })


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
            imageCard.classList = [`image-link text-center ${imageType}`];

            //for lazy loading 
            image.classList = ["lazy img-fluid mb-3 mx-auto rounded"];
            //for delivery of optimised images in gallery section
            image.srcset = srcsetArr;
            //for when optimised images are not available
            image.src = `${href2}/img${i}.jpg`

            imageLink.appendChild(image);
            imageCard.appendChild(imageLink);
            galleryContainer.appendChild(imageCard);
        }
    }
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
function addBgToCards() {
    // взимат се всички карти
    var cards = document.querySelectorAll('.card');

    //за всяка карта се излича img и при налична такава се задава bg-image
    cards.forEach((card) => {

        let img = card.children[0];
        img.addEventListener('load', function () {
            var selectedSrc = img.currentSrc || img.src;
            card.style.backgroundImage = 'url(' + selectedSrc + ')';
        });

        if (!img.completed) {
            var selectedSrc = img.currentSrc || img.src;
            card.style.backgroundImage = 'url(' + selectedSrc + ')';
        }
    });
};
function addGalleryToAnchor() {
    // Get all anchor elements within the carousel
    var carouselAnchors = document.querySelectorAll('.carousel-item a');

    // Add click event listeners to each anchor
    carouselAnchors.forEach(function (anchor) {
        anchor.addEventListener('click', function (event) {
            // Prevent the default behavior (e.g., following the link)
            event.preventDefault();
            // Get the text content of the clicked anchor's parent carousel-caption
            populateGallery(anchor.id);
        });
    });
}
function menuListeners() {
    const menu = document.getElementById('menu');
    const components = document.getElementsByClassName('component');
    const ancorsInMenu = menu.children;

    for (let i = 0; i < ancorsInMenu.length; i++) {
        let a = ancorsInMenu[i];

        a.addEventListener('click', (e) => {
            console.log(a)
            e.preventDefault();
            window.scrollTo(0, 0);

            if(a.id=='home'){
galleryContainer.style.display = "none";
            }
            
            for (let i = 0; i < components.length; i++) {
                let component = components[i];

                if (component.id == a.id) {
                    component.style.display = 'block'
                }
                else {
                    component.style.display = 'none'  
                }
            }

        })
    }
}
function loadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    var images = [...document.querySelectorAll('img')];
    body.style.height = '100vh !important';
    window.addEventListener("load", () => { setInterval(() => { loadingScreen.style.display = "none"; }, 2000); })

}

document.addEventListener("DOMContentLoaded", () => {
    loadingScreen();
    animateOnIntersect();
    addBgToCards();
    addGalleryToAnchor();
    menuListeners();
});