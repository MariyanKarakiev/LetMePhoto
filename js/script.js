"use strict";

const gallery_data =
{
    "portraitss": {
        "name": "portraitss",
        "img_count": 16,
        "img_sizes": {
            "1": "tall",
        }
    },
    "balls": {
        "name": "balls",
        "img_count": 13,
        "img_sizes": {
            "2": "tall",
            "4": "tall",
            "7": "tall",      
        },
        "text":""
    },
    "events": {
        "name": "events",
        "img_count": 11,
        "img_sizes": { 
        }
    },
    "weddings": {
        "name": "weddings",
        "img_count": 7,
        "img_sizes": {
            "7": "tall"
        }
    },
    "products": {
        "name": "products",
        "img_count": 20,
        "img_sizes": {
        
        },
         "text":""
    },
    "street": {
        "name": "street",
        "img_count": 3,
        "img_sizes": {
            "1": "tall"
        }
    }
}

const widths = [400, 767, 1200]
const form = document.getElementById('form');
const body = document.querySelector('body');
const galleryContainer = document.getElementById("gallery");
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();
let imgsCount = 0

function populateGallery(galleryName) {

    galleryElementFactory(galleryName, galleryContainer);
    galleryContainer.hidden = false;
    galleryContainer.style.display = "grid";
    //     galleryContainer.scrollIntoView({
    //         behavior: 'smooth' // You can also use 'auto' or 'instant'
    // })
}
function galleryElementFactory(galleryName, galleryContainer) {
    const galleryData = gallery_data[galleryName]
    const href = 'https://ik.imagekit.io/ycbriiund/LetMePhoto/' + galleryData.name
    const href2 = 'images/' + galleryData.name

    // clean gallery
    while (galleryContainer.firstChild) {
        galleryContainer.removeChild(galleryContainer.firstChild)
    }

    // populate
    for (let i = galleryData.img_count; 1 <= i; i--) {
        const image = document.createElement('img');
        const imageSize = galleryData.img_sizes[i];
        image.classList.add(`lazy`);
        
        const card = document.createElement('div');
        card.classList.add('card');
        if (imageSize) {
            card.classList.add(`card-${imageSize}`);
            console.log(`card-${imageSize}`)
        }

        //for delivery of optimised images
        let srcsetArr = widths.map(w => `${href}/tr:w-${w}/img${i}.jpg ${w}w`)
        image.srcset = srcsetArr;
        //for when optimised images are not available
        image.src = `${href2}/img${i}.jpg`

        card.appendChild(image);
        galleryContainer.appendChild(card);
    }
    addBgToCards();
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
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

            if (a.id == 'home') {
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
function highlightOpen() {
    const text = document.getElementById("highlight1");

    text.addEventListener('click', (e) => {
        e.preventDefault();
        homeButton.click();
        populateGallery('products');
        document.getElementById("gallery").scrollIntoView({ behavior: 'smooth' })
    })
}

function galleryFactory(galleryName) {
    gallery_data[galleryName]
}



document.addEventListener("DOMContentLoaded", () => {
    loadingScreen();
    animateOnIntersect();
    addGalleryToAnchor();
    addBgToCards();
    menuListeners();
    highlightOpen();
});