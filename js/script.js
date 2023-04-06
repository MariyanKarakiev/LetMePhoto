(function ($) {

    "use strict";

    const form = document.getElementById('form');

    let path = window.location.pathname;
    let page = path.split("/").pop();

    // preloader
    var initPreloader = function () {
        $(document).ready(function ($) {
            $('body').addClass('loading');
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

            menuItems.forEach(i => i.addEventListener('click', function () {
                return toggleClass(body, "nav-active")
            }));
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
            this.period = parseInt(period, 10) || 2000;
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
                var period = elements[i].getAttribute('data-period'); console.log(i);
                if (toRotate) {
                    new TxtType(elements[i], JSON.parse(toRotate), period);
                }
            }
        };
    }

    var portfolio_height = function () {
        var portfolioContainer = document.querySelector(".portfolio-container");
        var portfolioSection = document.querySelector(".portfolio-section");

        var portfolioBg = document.querySelector(".portfolio-section .bg-image");
        var mainBg = document.querySelector(".main .bg-image");
        var main = document.querySelector(".main");

        var footerBg = document.querySelector(".footer .bg-image");
        var footer = document.querySelector(".footer");

        var assignV = function () {
            if (page === "index.html") {
                portfolioBg.style.height = (portfolioContainer.clientHeight) + 'px';
                portfolioSection.style.height = portfolioContainer.clientHeight + 'px';
                portfolioContainer.style.top = mainBg.clientHeight + 'px';
                footerBg.style.height = (footer.clientHeight + portfolioBg.clientHeight) + 'px';
                footerBg.style.top = (mainBg.clientHeight + portfolioContainer.clientHeight) + 'px';
            }
            else {
                portfolioSection.style.height = portfolioContainer.clientHeight + portfolioContainer.clientHeight * 0.25 + 'px';
                footer.style.top = (main.clientHeight + portfolioSection.clientHeight * .88) + 'px';
            }
        }

        assignV();
    }

    var alertForSendEmail = function () {
        form.addEventListener('submit', e => {
            e.preventDefault();
            alert("Изпратихте съобщението успешно!");
        });
    }

    $(window).resize(function () {
        portfolio_height();
    });

    $(document).ready(function () {

        initPreloader();
        portfolio_height();
        overlayMenu();
        typewriter();
        alertForSendEmail();

        if (page !== "index.html")
            Chocolat(document.querySelectorAll('.galleryImg'), {
                imageSize: 'contain',
                loop: true,
            });
    });

})(jQuery);

/*
(function() {
  var triggerBttn = document.getElementById( 'trigger-overlay' ),
    overlay = document.querySelector( 'div.overlay' ),
    closeBttn = overlay.querySelector( 'button.overlay-close' );
    transEndEventNames = {
      'WebkitTransition': 'webkitTransitionEnd',
      'MozTransition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'msTransition': 'MSTransitionEnd',
      'transition': 'transitionend'
    },
    transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
    support = { transitions : Modernizr.csstransitions };
 
  function toggleOverlay() {
    if( classie.has( overlay, 'open' ) ) {
      classie.remove( overlay, 'open' );
      classie.add( overlay, 'close' );
      var onEndTransitionFn = function( ev ) {
        if( support.transitions ) {
          if( ev.propertyName !== 'visibility' ) return;
          this.removeEventListener( transEndEventName, onEndTransitionFn );
        }
        classie.remove( overlay, 'close' );
      };
      if( support.transitions ) {
        overlay.addEventListener( transEndEventName, onEndTransitionFn );
      }
      else {
        onEndTransitionFn();
      }
    }
    else if( !classie.has( overlay, 'close' ) ) {
      classie.add( overlay, 'open' );
    }
  }
 
  triggerBttn.addEventListener( 'click', toggleOverlay );
  closeBttn.addEventListener( 'click', toggleOverlay );
});
*/
