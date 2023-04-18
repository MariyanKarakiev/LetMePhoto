

"use strict";

const form = document.getElementById('form');
let scrolled = false;
let path = window.location.pathname;
let page = path.split("/").pop();

// preloader
var initPreloader = function () {
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

//Overlay Menu Navigation
var overlayMenu = async function () {

    if (!$('.nav-overlay').length) {
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
var typewriter = function () {

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
var portfolio_height = function () {
    var portfolioSection = document.querySelector(".portfolio-section");
    var footer = document.querySelector(".footer");
    var main = document.querySelector(".main");
    var portfolioContainer = document.querySelector(".portfolio-container");

    if (page === "index.html") {
        var portfolioBg = document.querySelector(".portfolio-section .bg-image");
        var mainBg = document.querySelector(".main .bg-image");
        var footerBg = document.querySelector(".footer .bg-image");

        portfolioContainer.style.top = mainBg.clientHeight + 'px';
        portfolioBg.style.height = (portfolioContainer.clientHeight) + 'px';
        portfolioSection.style.height = portfolioContainer.clientHeight + 'px';
        footerBg.style.top = (mainBg.clientHeight + portfolioContainer.clientHeight) + 'px';
        footerBg.style.height = (mainBg.clientHeight + portfolioContainer.clientHeight) + 'px';
    }
}
var alertForSendEmail = function () {
    form.addEventListener('submit', e => {
        e.preventDefault();
        alert("Изпратихте съобщението успешно!");
    });
}
$(document).scroll(() => {
    if (!scrolled) {
        portfolio_height();
        scrolled = true;
    }
})
$(window).resize(function () {
    portfolio_height();
});
$(document).ready(function () {
    initPreloader();
    var lazyLoadInstance = new LazyLoad({
    });
    typewriter();
    overlayMenu();
    alertForSendEmail();

    const galleryContainer = document.getElementById("gallery");
    const href = 'https://ik.imagekit.io/ycbriiund/LetMePhoto/' + page.split('.')[0] + '/'
    const pageName = page.split('.')[0]
    //const href = 'images/' + page.split('.')[0] + '/'
    let tallImgNumbers = []
    let imgsCount = 0

    switch (pageName) {
        case "portraits":
            imgsCount = 12
            tallImgNumbers = [2, 4, 5, 8, 10]
            break;
        case "balls_weddings":
            imgsCount = 9
            tallImgNumbers = [2, 4, 7]
            break;

        case "еvents":
            imgsCount = 0
            tallImgNumbers = [2, 4, 7]
            break;

        case "others":
            imgsCount = 0
            tallImgNumbers = [2, 4, 7]
            break;

    }

    const widths = [400, 800, 1200]

    if (page !== "index.html") {

        for (let i = imgsCount; 0 < i; i--) {
            let srcset = ''
            const imageCard = document.createElement('div');
            const imageClickable = document.createElement('a');
            const image = document.createElement('img');

            let srcsetArr = widths.map(w => `${href}/tr:w-${w}/img${i}.jpg ${w}w`)

            console.log(srcsetArr.join(','))

            imageCard.classList = ["image-link"];
            tallImgNumbers.includes(i) ? imageCard.classList.add('img-tall') : imageCard.classList.add('img-wide');
            imageClickable.classList = ["galleryImg"]
            // imageClickable.href = `${href}/tr:w-/img${i}.jpg ${}`
            // image.classList = ["lazy"];
            // image.src = `${href}/tr:w-800/img${i}.jpg`

            image.srcset = srcsetArr;
            console.log(`${href}img${i}.jpg`)
            imageClickable.appendChild(image);
            imageCard.appendChild(imageClickable);
            galleryContainer.appendChild(imageCard);
        }


        Chocolat(document.querySelectorAll('.galleryImg'), {
            imageSize: 'contain',
            loop: true,
        });
    }

    portfolio_height();

});