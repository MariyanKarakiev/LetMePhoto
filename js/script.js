"use strict";

const gallery_data =
{
    "portraitss": {
        "name": "portraitss",
        "img_count": 16,
        "img_sizes": {
            "2": "tall",
            "3": "tall",
            "4": "tall",
            "6": "tall",
            "9": "tall",
            "9": "tall",
            "11": "tall",
            "12": "tall",
            "13": "tall",
            "16": "tall",
        },
        "textCards": {
            "19": {
                "title": "ПРОДУКТОВА ФОТОСЕСИЯ ЗА РЕСТОРАНТ",
                "content": ``
            }
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
        "textCards": {
            "13": {
                "id": "prom_session",
                "title": "ЗАСНЕМАНЕ НА АБИТУРИЕНТСКА ФОТОСЕСИЯ",
                "content": `С гордост представяме нашата абитуриентска фотосесия с красивата абитуриентка Дани. Екипът на LetMePhoto имаше
                удоволствието да улови магията и емоцията на този незабравим момент. Всяка снимка отразява радостта, красотата и вълнението,
                които съпътстват този специален ден. Ние, от LetMePhoto, разбираме значението на абитуриентския бал и се стремим да създадем 
                спомени, които ще останат завинаги. Разгледайте нашата галерия, за да видите още примери от нашата професионална фотография и да се уверите в качеството на нашата работа.`,
                "card_size": ""
            }
        }
    },
    "events": {
        "name": "events",
        "img_count": 11,
        "img_sizes": {
            "2": "tall",
            "4": "tall",
            "7": "tall",
        },
        "textCards": {
            "19": {
                "title": "ПРОДУКТОВА ФОТОСЕСИЯ ЗА РЕСТОРАНТ",
                "content": `Разгледайте нашата сватбена галерия, за да откриете още вдъхновяващи примери от нашата професионална фотография. Ние предлагаме разнообразни услуги - 
                от сватбени и абитуриентски фотосесии до заснемане на специални събития, като гарантираме висококачествени и емоционално наситени снимки.`,
                "card_size": ""
            }
        }
    },
    "weddings": {
        "name": "weddings",
        "img_count": 7,
        "img_sizes": {
            "7": "tall"
        },
        "textCards": {
            "6": {
                "id":"gz_wedding_session",
                "title": "СВАТБАТА НА ГЕОРГИ И ЗДРАВКА",
                "content": `С огромно удоволствие представяме вълнуващите мигове от сватбата на Георги и Здравка, заснети от талантливия екип на LetMePhoto. 
                Целта ни беше да уловим всяка искра любов и щастие, които озариха този специален ден. Резултатът е серия от снимки, които разказват историята 
                - от емоционалния момент на подписването и красивата церемония на венчавката до веселите танци и смеха по време на празненството, запечатвайки всеки вълнуващ миг и искрена усмивка.
                `,
                "card_size": ""
            },
            "5": {
                "id":"",
                "title": "",
                "content": `Разгледайте сватбената ни галерия, за да откриете още вдъхновяващи примери от нашата фотография. Ние предлагаме разнообразни услуги - от сватбени и абитуриентски фотосесии до заснемане на специални събития, като гарантираме висококачествени и емоционално наситени снимки.
                С LetMePhoto ще запазите вашите най-ценни моменти в изящни и уникални кадри. Свържете се с нас днес, за да резервирате вашата фотосесия и да създадете вечни спомени.`,
                "card_size": ""
            }
        }
    },
    "products": {
        "name": "products",
        "img_count": 20,
        "img_sizes": {

        },
        "textCards": {
            "20": {
                "id": "alinea_session",
                "title": "ПРОДУКТОВА ФОТОСЕСИЯ ЗА РЕСТОРАНТ",
                "content": `Представяме нашата продуктова фотосесия за изискания ресторант <a href="https://www.facebook.com/profile.php?id=100092984575732">Alinea</a>.Колективът на LetMePhoto имаше удоволствието да улови съвършенството и детайлите на кулинарните творения в този изключителен ресторант.Всяка снимка отразява високите
        стандарти и изтънчеността на <a href="https://www.facebook.com/profile.php?id=100092984575732">Alinea</a>, предлагайки ви визуално пиршество, което съчетава
        изкуството на фотографията и кулинарията.Надяваме се, че ще се насладите на тези 
        кадри и ще усетите страстта и майсторството, които влагаме във всяка една от тях.
        Разгледайте галерията ни, за да видите още примери от нашата професионална продуктова фотография.`,
                "card_size": ""
            }
        }


    },
    "street": {
        "name": "street",
        "img_count": 3,
        "img_sizes": {
            "2": "tall",
            "3": "tall"
        },
        "textCards": {
            "3": {
                "title": "ПРОДУКТОВА ФОТОСЕСИЯ ЗА РЕСТОРАНТ",
                "content": ``,
                "card_size": ""
            }
        }
    }
}

const widths = [400, 767, 1200]
const form = document.getElementById('form');
const body = document.querySelector('body');
let h = document.getElementById('home');

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
    let galleryCards = '';

    // clean gallery
    while (galleryContainer.firstChild) {
        galleryContainer.removeChild(galleryContainer.firstChild)
    }

    // populate
    for (let i = galleryData.img_count; 1 <= i; i--) {
        let href = 'https://ik.imagekit.io/ycbriiund/LetMePhoto/' + galleryData.name
        let href2 = 'images/' + galleryData.name
        const imageSize = galleryData.img_sizes[i];
        href = widths.map(w => `${href}/tr:w-${w}/img${i}.jpg ${w}w`)

        let imgCard = `<div class="card ${galleryData.img_sizes[i] ? 'card-' + galleryData.img_sizes[i] : ''}">
                    <img class="lazy" src="${href2}"
                        srcset="${href}">
                    </div>`

        let textCard = galleryData.textCards[i];

        if (textCard) {
            let textCardHtml = `<div class="card card-${textCard.card_size} px-4 py-auto" id="${textCard.id}">
                        <a class="mb-3">${textCard.title}</a>
                        <p>${textCard.content}</p>
                    </div>`
            galleryCards += textCardHtml;
        }

        galleryCards += imgCard;
    }
    galleryContainer.innerHTML = galleryCards;
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
            if (selectedSrc) {
                card.style.backgroundImage = 'url(' + selectedSrc + ')';
            }
            card.style.backgroundImage = 'url(' + selectedSrc + ')';
        });
        if (!img.completed) {
            var selectedSrc = img.currentSrc || img.src;
            if (selectedSrc) {
                card.style.backgroundImage = 'url(' + selectedSrc + ')';
            }
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
            e.preventDefault();
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
            if (a.id == 'home') {
                h.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
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
    let anchors = document.querySelectorAll('.highlight-section .card a');

    for (let i = 0; i < anchors.length; i++) {
        console.log(anchors[i])
        anchors[i].addEventListener('click', (e) => {
            e.preventDefault();
            var gallery = anchors[i].attributes['gallery'].nodeValue

            populateGallery(gallery);
            console.log(h.style.height == 'auto')
            if (screen.width <= 767) {
                window.scrollTo({
                    top: findPosition(document.getElementById(anchors[i].attributes['target'].nodeValue)) - 100,
                    left: 0,
                    behavior: 'smooth'
                })
            }
            else {
                h.scrollTo({
                    top: findPosition(document.getElementById(anchors[i].attributes['target'].nodeValue)) - 100,
                    left: 0,
                    behavior: 'smooth'
                })
            }
        })
    }
}
function findPosition(obj) {
    var currenttop = 0;
    if (obj.offsetParent) {
        do {
            currenttop += obj.offsetTop;
        } while ((obj = obj.offsetParent));
        return [currenttop];
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadingScreen();
    animateOnIntersect();
    addGalleryToAnchor();
    addBgToCards();
    menuListeners();
    highlightOpen();

});