

"use strict";

const form = document.getElementById('form');
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();


function initPreloader() {
    $(document).ready(function ($) {
        $('body').addClass('loading');

        setTimeout(function () {
            $('.preloader').fadeOut();
            $('body').removeClass('loading');
        }, 6000)
    });

    $(window).load(function () {
        $('.preloader').fadeOut();
        $('body').removeClass('loading');
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
function populateGallery() {
    const galleryContainer = document.getElementById("gallery");
    const widths = [400, 800, 1200]
    const pageName = page.split('.')[0]
    const href = 'https://ik.imagekit.io/ycbriiund/LetMePhoto/' + pageName
    const href2 = 'images/' + pageName
    let tallImgNumbers = []
    let imgsCount = 0

    //sets number of images to be requested and images with numbers in their names that are tall
    switch (pageName) {
        case "portraits":
            imgsCount = 12
            tallImgNumbers = [2, 4, 5, 8, 10]
            break;
        case "balls_weddings":
            imgsCount = 9
            tallImgNumbers = [2, 4, 7]
            break;
        case "events":
            imgsCount = 11
            tallImgNumbers = [9]
            break;
        case "others":
            imgsCount = 0
            tallImgNumbers = [2, 4, 7]
            break;
    }

    function galleryElementFactory(galleryContainer) {
        for (let i = imgsCount; 0 < i; i--) {

            const imageCard = document.createElement('div');
            const imageLink = document.createElement('a');
            const image = document.createElement('img');

            let srcsetArr = widths.map(w => `${href}/tr:w-${w}/img${i}.jpg ${w}w`)

            let imageType = tallImgNumbers.includes(i) ? 'img-tall' : 'img-wide';
            imageCard.classList = [`image-link ${imageType} hidden`];

            //sets class for chocolat usage
            imageLink.classList = ["galleryImg"]
            //for when optimised images are not available in chocolat
            imageLink.href = `${href2}/img${i}.jpg`
            //for delivery of optimised images in chocolat
            imageLink.dataset.srcset = srcsetArr

            //for lazy loading 
            image.classList = ["lazy"];
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
function typewriter() {

    var TxtType = function (el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 70) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function () {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = this.txt;

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(function () {
            that.tick();
        }, delta);
    };

    window.onload = function () {
        var elements = document.getElementsByClassName('typewrite');
        for (var i = 0; i < elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
                new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
    };
}
function portfolio_height() {
    var portfolioSection = document.querySelector(".portfolio-section");
    var footer = document.querySelector(".footer");
    var main = document.querySelector(".main");
    var portfolioContainer = document.querySelector(".portfolio-container");

    if (page === "index.html" || page === "") {
        var portfolioBg = document.querySelector(".portfolio-section .bg-image");
        var mainBg = document.querySelector(".main .bg-image");
        var footerBg = document.querySelector(".footer .bg-image");

        portfolioContainer.style.top = mainBg.clientHeight + 'px';
        portfolioBg.style.height = (portfolioContainer.clientHeight) + 'px';
        portfolioSection.style.height = portfolioContainer.clientHeight + 'px';
        footerBg.style.top = (mainBg.clientHeight + portfolioContainer.clientHeight) + 'px';
        footerBg.style.height = (mainBg.clientHeight + portfolioContainer.clientHeight*0.60) + 'px'; 
    }
}
function emailSender() {
    form.addEventListener('submit', e => {
        e.preventDefault();
        alert("Изпратихте съобщението успешно!");
        let btn = document.querySelector(".contacts button")
        form.reset();
        btn.disabled =false;
    });
}
function animateOnIntersect() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
            else{
                entry.target.classList.remove("visible");
            }
        });
    })
    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el)=>observer.observe(el))
}

// $("button").click(()=>{
//    // $("button").disabled = false;
//    // console.log('reset')
// })
// $(document).scroll(() => {
//     if (!scrolled) {
//        // portfolio_height();
//       //  scrolled = true;
//     }
// })
// $(window).resize(function () {
//   //  portfolio_height();
// });
document.addEventListener("DOMContentLoaded",()=>{
    // initPreloader();
    // var lazyLoadInstance = new LazyLoad({
    // });
    // typewriter();
    // populateGallery();
    // portfolio_height();
    overlayMenu();
    animateOnIntersect();
   // emailSender();
    // Chocolat(document.querySelectorAll('.galleryImg'), {
    //     imageSize: 'contain',
    //     loop: true,
    // });

});