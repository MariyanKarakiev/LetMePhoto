"use strict";

const form = document.getElementById('form');
const body = document.getElementById('body');
const galleryContainer = document.getElementById("gallery");
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();
let imgsCount = 0

function populateGallery(galleryName) {
    galleryContainer.hidden = false;
    const widths = [767, 1024]
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
            imageCard.classList = [`image-link text-center ${imageType} px-0-2`];

            //for lazy loading 
            image.classList = ["lazy img-fluid mb-3  mx-auto rounded"];
            //for delivery of optimised images in gallery section
            image.srcset = srcsetArr;
            //for when optimised images are not available
            image.src = `${href2}/img${i}.jpg`

            imageLink.appendChild(image);
            imageCard.appendChild(imageLink);
            galleryContainer.appendChild(imageCard);
        }
    }
    galleryElementFactory(galleryContainer)
    galleryContainer.style.display = "block";
    galleryContainer.scrollIntoView({
        behavior: 'smooth' // You can also use 'auto' or 'instant'
    });
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
function addBgToCards() {
    // взимат се всички карти
    var cards = document.querySelectorAll('.card');

    //за всяка карта се излича img и при налична такава се задава bg-image
    cards.forEach((card) => {

        let img = card.children[0];
        img.addEventListener('load', function () {
            var selectedSrc = img.currentSrc || img.src;
            card.style.backgroundImage = 'url(' + selectedSrc + ')';
            // card.style.filter = 'brightness(0%)';
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
            //hide gallery
            window.scrollTo(0, 0);

            setTimeout(() => { galleryContainer.style.display = "none" }, 1000)

            for (let i = 0; i < components.length; i++) {
                let component = components[i];

                if (component.id == a.id) {
                    console.log(a.id + '  ' + component.id + 'if')
                    component.style.display = 'block'
                    console.log(component.style.display)

                }
                else {
                    console.log(a.id + '  ' + component.id)
                    component.style.display = 'none'
                    console.log(component.style.display)
                }
            }

        })
    }
}
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});

document.addEventListener("DOMContentLoaded", () => {
    animateOnIntersect();
    addBgToCards();
    addGalleryToAnchor();
    menuListeners();
});