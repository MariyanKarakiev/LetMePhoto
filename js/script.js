(function ($) {

  "use strict";

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
          console.log("clicked");
        return toggleClass(body, 'nav-active');
      });
    };
    var toggleClass = function toggleClass(element, stringClass) {
      if (element.classList.contains(stringClass)) element.classList.remove(stringClass); else element.classList.add(stringClass);
    };
    init();
  }

  var typewriter = async function () {
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

    window.onload =async function () {
      var elements = document.getElementsByClassName('typewrite');
      for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
         new TxtType(elements[i], await JSON.parse(toRotate), period);
        }
      }
    };
  }

  var portfolio_height = function() {
    var heightPortfolio = document.querySelector(".portfolio-container");
    var section = document.querySelector(".portfolio-section");
    var bg = document.querySelector(".portfolio-section .bg-image");
    var main = document.querySelector(".main");
    var footer = document.querySelector(".footer .bg-image");

    var assignV = function () {
      bg.style.height = heightPortfolio.clientHeight + 'px';
      section.style.height = heightPortfolio.clientHeight + 'px';
      footer.style.top = (heightPortfolio.clientHeight + main.clientHeight) + 'px';
      console.log(window.innerHeight)
    }

    assignV();
  }

  $(window).resize(async function () {
    await portfolio_height();
  });

  $(document).ready(function () {
    
    initPreloader();
    portfolio_height();
    overlayMenu();
    typewriter();
    Chocolat(document.querySelectorAll('.image-link'), {
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


/*------------------------------------*\
       Plugins - Table of contents
   \*------------------------------------*/
/*
 - Bootstrap
 - Chocolat
 - Jarallax


/* Chocolat-1.0.4 */
/* jQuery plugin for lightbox */
!function() {
    "use strict";
    let e = void 0;
    function t(e, t) {
        return new Promise(s=>{
            const i = ()=>{
                t.removeEventListener("transitionend", i),
                s()
            }
            ;
            t.addEventListener("transitionend", i);
            const l = t.getAttribute("class")
              , n = t.getAttribute("style");
            e(),
            l === t.getAttribute("class") && n === t.getAttribute("style") && i(),
            0 === parseFloat(getComputedStyle(t).transitionDuration) && i()
        }
        )
    }
    function s({src: e, srcset: t, sizes: s}) {
        const i = new Image;
        return i.src = e,
        t && (i.srcset = t),
        s && (i.sizes = s),
        "decode"in i ? new Promise((e,t)=>{
            i.decode().then(()=>{
                e(i)
            }
            ).catch(()=>{
                t(i)
            }
            )
        }
        ) : new Promise((e,t)=>{
            i.onload = e(i),
            i.onerror = t(i)
        }
        )
    }
    function i(e) {
        let t, s;
        const {imgHeight: i, imgWidth: l, containerHeight: n, containerWidth: a, canvasWidth: o, canvasHeight: c, imageSize: h} = e
          , r = i / l;
        return "cover" == h ? r < n / a ? s = (t = n) / r : t = (s = a) * r : "native" == h ? (t = i,
        s = l) : (r > c / o ? s = (t = c) / r : t = (s = o) * r,
        "scale-down" === h && (s >= l || t >= i) && (s = l,
        t = i)),
        {
            height: t,
            width: s
        }
    }
    function l(e) {
        return e.requestFullscreen ? e.requestFullscreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen() : e.msRequestFullscreen ? e.msRequestFullscreen() : Promise.reject()
    }
    function n() {
        return document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen ? document.msExitFullscreen() : Promise.reject()
    }
    const a = {
        container: document.body,
        className: void 0,
        imageSize: "scale-down",
        fullScreen: !1,
        loop: !1,
        linkImages: !0,
        setIndex: 0,
        firstImageIndex: 0,
        lastImageIndex: !1,
        currentImageIndex: void 0,
        allowZoom: !0,
        closeOnBackgroundClick: !0,
        setTitle: function() {
            return ""
        },
        description: function() {
            return this.images[this.settings.currentImageIndex].title
        },
        pagination: function() {
            const e = this.settings.lastImageIndex + 1;
            return this.settings.currentImageIndex + 1 + "/" + e
        },
        afterInitialize() {},
        afterMarkup() {},
        afterImageLoad() {},
        afterClose() {},
        zoomedPaddingX: function(e, t) {
            return 0
        },
        zoomedPaddingY: function(e, t) {
            return 0
        }
    };
    class o {
        constructor(e, t) {
            this.settings = t,
            this.elems = {},
            this.images = [],
            this.events = [],
            this.state = {
                fullScreenOpen: !1,
                initialZoomState: null,
                initialized: !1,
                timer: !1,
                visible: !1
            },
            this._cssClasses = ["chocolat-open", "chocolat-in-container", "chocolat-cover", "chocolat-zoomable", "chocolat-zoomed", "chocolat-zooming-in", "chocolat-zooming-out"],
            NodeList.prototype.isPrototypeOf(e) || HTMLCollection.prototype.isPrototypeOf(e) ? e.forEach((e,t)=>{
                this.images.push({
                    title: e.getAttribute("title"),
                    src: e.getAttribute("href"),
                    srcset: e.getAttribute("data-srcset"),
                    sizes: e.getAttribute("data-sizes")
                }),
                this.off(e, "click.chocolat"),
                this.on(e, "click.chocolat", e=>{
                    this.init(t),
                    e.preventDefault()
                }
                )
            }
            ) : this.images = e,
            this.settings.container instanceof Element || this.settings.container instanceof HTMLElement ? this.elems.container = this.settings.container : this.elems.container = document.body,
            this.api = {
                open: e=>(e = parseInt(e) || 0,
                this.init(e)),
                close: ()=>this.close(),
                next: ()=>this.change(1),
                prev: ()=>this.change(-1),
                goto: e=>this.open(e),
                current: ()=>this.settings.currentImageIndex,
                position: ()=>this.position(this.elems.img),
                destroy: ()=>this.destroy(),
                set: (e,t)=>(this.settings[e] = t,
                t),
                get: e=>this.settings[e],
                getElem: e=>this.elems[e]
            }
        }
        init(e) {
            return this.state.initialized || (this.markup(),
            this.attachListeners(),
            this.settings.lastImageIndex = this.images.length - 1,
            this.state.initialized = !0),
            this.settings.afterInitialize.call(this),
            this.load(e)
        }
        load(e) {
            if (this.state.visible || (this.state.visible = !0,
            setTimeout(()=>{
                this.elems.overlay.classList.add("chocolat-visible"),
                this.elems.wrapper.classList.add("chocolat-visible")
            }
            , 0),
            this.elems.container.classList.add("chocolat-open")),
            this.settings.fullScreen && l(this.elems.wrapper),
            this.settings.currentImageIndex === e)
                return Promise.resolve();
            let i, n, a = setTimeout(()=>{
                this.elems.loader.classList.add("chocolat-visible")
            }
            , 1e3), o = setTimeout(()=>{
                o = void 0,
                i = t(()=>{
                    this.elems.imageCanvas.classList.remove("chocolat-visible")
                }
                , this.elems.imageCanvas)
            }
            , 80);
            return s(this.images[e]).then(e=>(n = e,
            o ? (clearTimeout(o),
            Promise.resolve()) : i)).then(()=>{
                const t = e + 1;
                return null != this.images[t] && s(this.images[t]),
                this.settings.currentImageIndex = e,
                this.elems.description.textContent = this.settings.description.call(this),
                this.elems.pagination.textContent = this.settings.pagination.call(this),
                this.arrows(),
                this.position(n).then(()=>(this.elems.loader.classList.remove("chocolat-visible"),
                clearTimeout(a),
                this.appear(n)))
            }
            ).then(()=>{
                this.elems.container.classList.toggle("chocolat-zoomable", this.zoomable(n, this.elems.wrapper)),
                this.settings.afterImageLoad.call(this)
            }
            )
        }
        position({naturalHeight: e, naturalWidth: s}) {
            const l = {
                imgHeight: e,
                imgWidth: s,
                containerHeight: this.elems.container.clientHeight,
                containerWidth: this.elems.container.clientWidth,
                canvasWidth: this.elems.imageCanvas.clientWidth,
                canvasHeight: this.elems.imageCanvas.clientHeight,
                imageSize: this.settings.imageSize
            }
              , {width: n, height: a} = i(l);
            return t(()=>{
                Object.assign(this.elems.imageWrapper.style, {
                    width: n + "px",
                    height: a + "px"
                })
            }
            , this.elems.imageWrapper)
        }
        appear(e) {
            return this.elems.imageWrapper.removeChild(this.elems.img),
            this.elems.img = e,
            this.elems.img.setAttribute("class", "chocolat-img"),
            this.elems.imageWrapper.appendChild(this.elems.img),
            t(()=>{
                this.elems.imageCanvas.classList.add("chocolat-visible")
            }
            , this.elems.imageCanvas)
        }
        change(e) {
            if (!this.state.visible)
                return;
            if (!this.settings.linkImages)
                return;
            this.zoomOut();
            const t = this.settings.currentImageIndex + parseInt(e);
            if (t > this.settings.lastImageIndex) {
                if (this.settings.loop)
                    return this.load(this.settings.firstImageIndex)
            } else {
                if (!(t < this.settings.firstImageIndex))
                    return this.load(t);
                if (this.settings.loop)
                    return this.load(this.settings.lastImageIndex)
            }
        }
        arrows() {
            this.settings.loop ? (this.elems.left.classList.add("active"),
            this.elems.right.classList.add("active")) : this.settings.linkImages ? (this.elems.right.classList.toggle("active", this.settings.currentImageIndex !== this.settings.lastImageIndex),
            this.elems.left.classList.toggle("active", this.settings.currentImageIndex !== this.settings.firstImageIndex)) : (this.elems.left.classList.remove("active"),
            this.elems.right.classList.remove("active"))
        }
        close() {
            if (this.state.fullScreenOpen)
                return void n();
            this.state.visible = !1;
            const e = t(()=>{
                this.elems.overlay.classList.remove("chocolat-visible")
            }
            , this.elems.overlay)
              , s = t(()=>{
                this.elems.wrapper.classList.remove("chocolat-visible")
            }
            , this.elems.wrapper);
            return Promise.all([e, s]).then(()=>{
                this.elems.container.classList.remove("chocolat-open"),
                this.settings.afterClose.call(this)
            }
            )
        }
        destroy() {
            for (let e = this.events.length - 1; e >= 0; e--) {
                const {element: t, eventName: s} = this.events[e];
                this.off(t, s)
            }
            this.state.initialized && (this.state.fullScreenOpen && n(),
            this.settings.currentImageIndex = void 0,
            this.state.visible = !1,
            this.state.initialized = !1,
            this.elems.container.classList.remove(...this._cssClasses),
            this.elems.wrapper.parentNode.removeChild(this.elems.wrapper))
        }
        markup() {
            this.elems.container.classList.add("chocolat-open", this.settings.className),
            "cover" == this.settings.imageSize && this.elems.container.classList.add("chocolat-cover"),
            this.elems.container !== document.body && this.elems.container.classList.add("chocolat-in-container"),
            this.elems.wrapper = document.createElement("div"),
            this.elems.wrapper.setAttribute("id", "chocolat-content-" + this.settings.setIndex),
            this.elems.wrapper.setAttribute("class", "chocolat-wrapper"),
            this.elems.container.appendChild(this.elems.wrapper),
            this.elems.overlay = document.createElement("div"),
            this.elems.overlay.setAttribute("class", "chocolat-overlay"),
            this.elems.wrapper.appendChild(this.elems.overlay),
            this.elems.loader = document.createElement("div"),
            this.elems.loader.setAttribute("class", "chocolat-loader"),
            this.elems.wrapper.appendChild(this.elems.loader),
            this.elems.layout = document.createElement("div"),
            this.elems.layout.setAttribute("class", "chocolat-layout"),
            this.elems.wrapper.appendChild(this.elems.layout),
            this.elems.top = document.createElement("div"),
            this.elems.top.setAttribute("class", "chocolat-top"),
            this.elems.layout.appendChild(this.elems.top),
            this.elems.center = document.createElement("div"),
            this.elems.center.setAttribute("class", "chocolat-center"),
            this.elems.layout.appendChild(this.elems.center),
            this.elems.left = document.createElement("div"),
            this.elems.left.setAttribute("class", "chocolat-left"),
            this.elems.center.appendChild(this.elems.left),
            this.elems.imageCanvas = document.createElement("div"),
            this.elems.imageCanvas.setAttribute("class", "chocolat-image-canvas"),
            this.elems.center.appendChild(this.elems.imageCanvas),
            this.elems.imageWrapper = document.createElement("div"),
            this.elems.imageWrapper.setAttribute("class", "chocolat-image-wrapper"),
            this.elems.imageCanvas.appendChild(this.elems.imageWrapper),
            this.elems.img = document.createElement("img"),
            this.elems.img.setAttribute("class", "chocolat-img"),
            this.elems.imageWrapper.appendChild(this.elems.img),
            this.elems.right = document.createElement("div"),
            this.elems.right.setAttribute("class", "chocolat-right"),
            this.elems.center.appendChild(this.elems.right),
            this.elems.bottom = document.createElement("div"),
            this.elems.bottom.setAttribute("class", "chocolat-bottom"),
            this.elems.layout.appendChild(this.elems.bottom),
            this.elems.close = document.createElement("span"),
            this.elems.close.setAttribute("class", "chocolat-close"),
            this.elems.top.appendChild(this.elems.close),
            this.elems.description = document.createElement("span"),
            this.elems.description.setAttribute("class", "chocolat-description"),
            this.elems.bottom.appendChild(this.elems.description),
            this.elems.pagination = document.createElement("span"),
            this.elems.pagination.setAttribute("class", "chocolat-pagination"),
            this.elems.bottom.appendChild(this.elems.pagination),
            this.elems.setTitle = document.createElement("span"),
            this.elems.setTitle.setAttribute("class", "chocolat-set-title"),
            this.elems.setTitle.textContent = this.settings.setTitle(),
            this.elems.bottom.appendChild(this.elems.setTitle),
            this.elems.fullscreen = document.createElement("span"),
            this.elems.fullscreen.setAttribute("class", "chocolat-fullscreen"),
            this.elems.bottom.appendChild(this.elems.fullscreen),
            this.settings.afterMarkup.call(this)
        }
        attachListeners() {
            this.off(document, "keydown.chocolat"),
            this.on(document, "keydown.chocolat", e=>{
                this.state.initialized && (37 == e.keyCode ? this.change(-1) : 39 == e.keyCode ? this.change(1) : 27 == e.keyCode && this.close())
            }
            );
            const t = this.elems.wrapper.querySelector(".chocolat-right");
            this.off(t, "click.chocolat"),
            this.on(t, "click.chocolat", ()=>{
                this.change(1)
            }
            );
            const s = this.elems.wrapper.querySelector(".chocolat-left");
            this.off(s, "click.chocolat"),
            this.on(s, "click.chocolat", ()=>{
                this.change(-1)
            }
            ),
            this.off(this.elems.close, "click.chocolat"),
            this.on(this.elems.close, "click.chocolat", this.close.bind(this)),
            this.off(this.elems.fullscreen, "click.chocolat"),
            this.on(this.elems.fullscreen, "click.chocolat", ()=>{
                this.state.fullScreenOpen ? n() : l(this.elems.wrapper)
            }
            ),
            this.off(document, "fullscreenchange.chocolat"),
            this.on(document, "fullscreenchange.chocolat", ()=>{
                document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement ? this.state.fullScreenOpen = !0 : this.state.fullScreenOpen = !1
            }
            ),
            this.off(document, "webkitfullscreenchange.chocolat"),
            this.on(document, "webkitfullscreenchange.chocolat", ()=>{
                document.fullscreenElement || document.webkitCurrentFullScreenElement || document.webkitFullscreenElement ? this.state.fullScreenOpen = !0 : this.state.fullScreenOpen = !1
            }
            ),
            this.settings.closeOnBackgroundClick && (this.off(this.elems.overlay, "click.chocolat"),
            this.on(this.elems.overlay, "click.chocolat", this.close.bind(this))),
            this.off(this.elems.wrapper, "click.chocolat"),
            this.on(this.elems.wrapper, "click.chocolat", ()=>{
                null !== this.state.initialZoomState && this.state.visible && (this.elems.container.classList.add("chocolat-zooming-out"),
                this.zoomOut().then(()=>{
                    this.elems.container.classList.remove("chocolat-zoomed"),
                    this.elems.container.classList.remove("chocolat-zooming-out")
                }
                ))
            }
            ),
            this.off(this.elems.imageWrapper, "click.chocolat"),
            this.on(this.elems.imageWrapper, "click.chocolat", e=>{
                null === this.state.initialZoomState && this.elems.container.classList.contains("chocolat-zoomable") && (e.stopPropagation(),
                this.elems.container.classList.add("chocolat-zooming-in"),
                this.zoomIn(e).then(()=>{
                    this.elems.container.classList.add("chocolat-zoomed"),
                    this.elems.container.classList.remove("chocolat-zooming-in")
                }
                ))
            }
            ),
            this.on(this.elems.wrapper, "mousemove.chocolat", e=>{
                if (null === this.state.initialZoomState || !this.state.visible)
                    return;
                const t = this.elems.wrapper.getBoundingClientRect()
                  , s = t.top + window.scrollY
                  , i = t.left + window.scrollX
                  , l = this.elems.wrapper.clientHeight
                  , n = this.elems.wrapper.clientWidth
                  , a = this.elems.img.width
                  , o = this.elems.img.height
                  , c = [e.pageX - n / 2 - i, e.pageY - l / 2 - s];
                let h = 0;
                if (a > n) {
                    const e = this.settings.zoomedPaddingX(a, n);
                    h = c[0] / (n / 2),
                    h *= (a - n) / 2 + e
                }
                let r = 0;
                if (o > l) {
                    const e = this.settings.zoomedPaddingY(o, l);
                    r = c[1] / (l / 2),
                    r *= (o - l) / 2 + e
                }
                this.elems.img.style.marginLeft = -h + "px",
                this.elems.img.style.marginTop = -r + "px"
            }
            ),
            this.on(window, "resize.chocolat", t=>{
                this.state.initialized && this.state.visible && function(t, s) {
                    clearTimeout(e),
                    e = setTimeout(function() {
                        s()
                    }, t)
                }(50, ()=>{
                    const e = {
                        imgHeight: this.elems.img.naturalHeight,
                        imgWidth: this.elems.img.naturalWidth,
                        containerHeight: this.elems.wrapper.clientHeight,
                        containerWidth: this.elems.wrapper.clientWidth,
                        canvasWidth: this.elems.imageCanvas.clientWidth,
                        canvasHeight: this.elems.imageCanvas.clientHeight,
                        imageSize: this.settings.imageSize
                    }
                      , {width: t, height: s} = i(e);
                    this.position(this.elems.img).then(()=>{
                        this.elems.container.classList.toggle("chocolat-zoomable", this.zoomable(this.elems.img, this.elems.wrapper))
                    }
                    )
                }
                )
            }
            )
        }
        zoomable(e, t) {
            const s = t.clientWidth
              , i = t.clientHeight
              , l = !(!this.settings.allowZoom || !(e.naturalWidth > s || e.naturalHeight > i))
              , n = e.clientWidth > e.naturalWidth || e.clientHeight > e.naturalHeight;
            return l && !n
        }
        zoomIn(e) {
            return this.state.initialZoomState = this.settings.imageSize,
            this.settings.imageSize = "native",
            this.position(this.elems.img)
        }
        zoomOut(e) {
            return this.settings.imageSize = this.state.initialZoomState || this.settings.imageSize,
            this.state.initialZoomState = null,
            this.elems.img.style.margin = 0,
            this.position(this.elems.img)
        }
        on(e, t, s) {
            const i = this.events.push({
                element: e,
                eventName: t,
                cb: s
            });
            e.addEventListener(t.split(".")[0], this.events[i - 1].cb)
        }
        off(e, t) {
            const s = this.events.findIndex(s=>s.element === e && s.eventName === t);
            this.events[s] && (e.removeEventListener(t.split(".")[0], this.events[s].cb),
            this.events.splice(s, 1))
        }
    }
    const c = [];
    window.Chocolat = function(e, t) {
        const s = Object.assign({}, a, {
            images: []
        }, t, {
            setIndex: c.length
        })
          , i = new o(e,s);
        return c.push(i),
        i
    }
}();

/*!
 * Jarallax v2.0.2 (https://github.com/nk-o/jarallax)
 * Copyright 2022 nK <https://nkdev.info>
 * Licensed under MIT (https://github.com/nk-o/jarallax/blob/master/LICENSE)
 */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).jarallax = t()
}(this, (function() {
    "use strict";
    function e(e) {
        "complete" === document.readyState || "interactive" === document.readyState ? e() : document.addEventListener("DOMContentLoaded", e, {
            capture: !0,
            once: !0,
            passive: !0
        })
    }
    let t;
    t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
    var i = t;
    const {navigator: o} = i
      , n = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(o.userAgent);
    let a, s;
    function l() {
        n ? (!a && document.body && (a = document.createElement("div"),
        a.style.cssText = "position: fixed; top: -9999px; left: 0; height: 100vh; width: 0;",
        document.body.appendChild(a)),
        s = (a ? a.clientHeight : 0) || i.innerHeight || document.documentElement.clientHeight) : s = i.innerHeight || document.documentElement.clientHeight
    }
    l(),
    i.addEventListener("resize", l),
    i.addEventListener("orientationchange", l),
    i.addEventListener("load", l),
    e((()=>{
        l()
    }
    ));
    const r = [];
    function m() {
        r.length && (r.forEach(((e,t)=>{
            const {instance: o, oldData: n} = e
              , a = o.$item.getBoundingClientRect()
              , l = {
                width: a.width,
                height: a.height,
                top: a.top,
                bottom: a.bottom,
                wndW: i.innerWidth,
                wndH: s
            }
              , m = !n || n.wndW !== l.wndW || n.wndH !== l.wndH || n.width !== l.width || n.height !== l.height
              , c = m || !n || n.top !== l.top || n.bottom !== l.bottom;
            r[t].oldData = l,
            m && o.onResize(),
            c && o.onScroll()
        }
        )),
        i.requestAnimationFrame(m))
    }
    let c = 0;
    class p {
        constructor(e, t) {
            const i = this;
            i.instanceID = c,
            c += 1,
            i.$item = e,
            i.defaults = {
                type: "scroll",
                speed: .5,
                imgSrc: null,
                imgElement: ".jarallax-img",
                imgSize: "cover",
                imgPosition: "50% 50%",
                imgRepeat: "no-repeat",
                keepImg: !1,
                elementInViewport: null,
                zIndex: -100,
                disableParallax: !1,
                disableVideo: !1,
                videoSrc: null,
                videoStartTime: 0,
                videoEndTime: 0,
                videoVolume: 0,
                videoLoop: !0,
                videoPlayOnlyVisible: !0,
                videoLazyLoading: !0,
                onScroll: null,
                onInit: null,
                onDestroy: null,
                onCoverImage: null
            };
            const n = i.$item.dataset || {}
              , a = {};
            if (Object.keys(n).forEach((e=>{
                const t = e.substr(0, 1).toLowerCase() + e.substr(1);
                t && void 0 !== i.defaults[t] && (a[t] = n[e])
            }
            )),
            i.options = i.extend({}, i.defaults, a, t),
            i.pureOptions = i.extend({}, i.options),
            Object.keys(i.options).forEach((e=>{
                "true" === i.options[e] ? i.options[e] = !0 : "false" === i.options[e] && (i.options[e] = !1)
            }
            )),
            i.options.speed = Math.min(2, Math.max(-1, parseFloat(i.options.speed))),
            "string" == typeof i.options.disableParallax && (i.options.disableParallax = new RegExp(i.options.disableParallax)),
            i.options.disableParallax instanceof RegExp) {
                const e = i.options.disableParallax;
                i.options.disableParallax = ()=>e.test(o.userAgent)
            }
            if ("function" != typeof i.options.disableParallax && (i.options.disableParallax = ()=>!1),
            "string" == typeof i.options.disableVideo && (i.options.disableVideo = new RegExp(i.options.disableVideo)),
            i.options.disableVideo instanceof RegExp) {
                const e = i.options.disableVideo;
                i.options.disableVideo = ()=>e.test(o.userAgent)
            }
            "function" != typeof i.options.disableVideo && (i.options.disableVideo = ()=>!1);
            let s = i.options.elementInViewport;
            s && "object" == typeof s && void 0 !== s.length && ([s] = s),
            s instanceof Element || (s = null),
            i.options.elementInViewport = s,
            i.image = {
                src: i.options.imgSrc || null,
                $container: null,
                useImgTag: !1,
                position: "fixed"
            },
            i.initImg() && i.canInitParallax() && i.init()
        }
        css(e, t) {
            return "string" == typeof t ? i.getComputedStyle(e).getPropertyValue(t) : (Object.keys(t).forEach((i=>{
                e.style[i] = t[i]
            }
            )),
            e)
        }
        extend(e, ...t) {
            return e = e || {},
            Object.keys(t).forEach((i=>{
                t[i] && Object.keys(t[i]).forEach((o=>{
                    e[o] = t[i][o]
                }
                ))
            }
            )),
            e
        }
        getWindowData() {
            return {
                width: i.innerWidth || document.documentElement.clientWidth,
                height: s,
                y: document.documentElement.scrollTop
            }
        }
        initImg() {
            const e = this;
            let t = e.options.imgElement;
            return t && "string" == typeof t && (t = e.$item.querySelector(t)),
            t instanceof Element || (e.options.imgSrc ? (t = new Image,
            t.src = e.options.imgSrc) : t = null),
            t && (e.options.keepImg ? e.image.$item = t.cloneNode(!0) : (e.image.$item = t,
            e.image.$itemParent = t.parentNode),
            e.image.useImgTag = !0),
            !!e.image.$item || (null === e.image.src && (e.image.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            e.image.bgImage = e.css(e.$item, "background-image")),
            !(!e.image.bgImage || "none" === e.image.bgImage))
        }
        canInitParallax() {
            return !this.options.disableParallax()
        }
        init() {
            const e = this
              , t = {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden"
            };
            let o = {
                pointerEvents: "none",
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden",
                willChange: "transform,opacity"
            };
            if (!e.options.keepImg) {
                const t = e.$item.getAttribute("style");
                if (t && e.$item.setAttribute("data-jarallax-original-styles", t),
                e.image.useImgTag) {
                    const t = e.image.$item.getAttribute("style");
                    t && e.image.$item.setAttribute("data-jarallax-original-styles", t)
                }
            }
            if ("static" === e.css(e.$item, "position") && e.css(e.$item, {
                position: "relative"
            }),
            "auto" === e.css(e.$item, "z-index") && e.css(e.$item, {
                zIndex: 0
            }),
            e.image.$container = document.createElement("div"),
            e.css(e.image.$container, t),
            e.css(e.image.$container, {
                "z-index": e.options.zIndex
            }),
            "fixed" === this.image.position && e.css(e.image.$container, {
                "-webkit-clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            }),
            e.image.$container.setAttribute("id", `jarallax-container-${e.instanceID}`),
            e.$item.appendChild(e.image.$container),
            e.image.useImgTag ? o = e.extend({
                "object-fit": e.options.imgSize,
                "object-position": e.options.imgPosition,
                "max-width": "none"
            }, t, o) : (e.image.$item = document.createElement("div"),
            e.image.src && (o = e.extend({
                "background-position": e.options.imgPosition,
                "background-size": e.options.imgSize,
                "background-repeat": e.options.imgRepeat,
                "background-image": e.image.bgImage || `url("${e.image.src}")`
            }, t, o))),
            "opacity" !== e.options.type && "scale" !== e.options.type && "scale-opacity" !== e.options.type && 1 !== e.options.speed || (e.image.position = "absolute"),
            "fixed" === e.image.position) {
                const t = function(e) {
                    const t = [];
                    for (; null !== e.parentElement; )
                        1 === (e = e.parentElement).nodeType && t.push(e);
                    return t
                }(e.$item).filter((e=>{
                    const t = i.getComputedStyle(e)
                      , o = t["-webkit-transform"] || t["-moz-transform"] || t.transform;
                    return o && "none" !== o || /(auto|scroll)/.test(t.overflow + t["overflow-y"] + t["overflow-x"])
                }
                ));
                e.image.position = t.length ? "absolute" : "fixed"
            }
            o.position = e.image.position,
            e.css(e.image.$item, o),
            e.image.$container.appendChild(e.image.$item),
            e.onResize(),
            e.onScroll(!0),
            e.options.onInit && e.options.onInit.call(e),
            "none" !== e.css(e.$item, "background-image") && e.css(e.$item, {
                "background-image": "none"
            }),
            e.addToParallaxList()
        }
        addToParallaxList() {
            r.push({
                instance: this
            }),
            1 === r.length && i.requestAnimationFrame(m)
        }
        removeFromParallaxList() {
            const e = this;
            r.forEach(((t,i)=>{
                t.instance.instanceID === e.instanceID && r.splice(i, 1)
            }
            ))
        }
        destroy() {
            const e = this;
            e.removeFromParallaxList();
            const t = e.$item.getAttribute("data-jarallax-original-styles");
            if (e.$item.removeAttribute("data-jarallax-original-styles"),
            t ? e.$item.setAttribute("style", t) : e.$item.removeAttribute("style"),
            e.image.useImgTag) {
                const i = e.image.$item.getAttribute("data-jarallax-original-styles");
                e.image.$item.removeAttribute("data-jarallax-original-styles"),
                i ? e.image.$item.setAttribute("style", t) : e.image.$item.removeAttribute("style"),
                e.image.$itemParent && e.image.$itemParent.appendChild(e.image.$item)
            }
            e.image.$container && e.image.$container.parentNode.removeChild(e.image.$container),
            e.options.onDestroy && e.options.onDestroy.call(e),
            delete e.$item.jarallax
        }
        clipContainer() {}
        coverImage() {
            const e = this
              , t = e.image.$container.getBoundingClientRect()
              , i = t.height
              , {speed: o} = e.options
              , n = "scroll" === e.options.type || "scroll-opacity" === e.options.type;
            let a = 0
              , l = i
              , r = 0;
            return n && (0 > o ? (a = o * Math.max(i, s),
            s < i && (a -= o * (i - s))) : a = o * (i + s),
            1 < o ? l = Math.abs(a - s) : 0 > o ? l = a / o + Math.abs(a) : l += (s - i) * (1 - o),
            a /= 2),
            e.parallaxScrollDistance = a,
            r = n ? (s - l) / 2 : (i - l) / 2,
            e.css(e.image.$item, {
                height: `${l}px`,
                marginTop: `${r}px`,
                left: "fixed" === e.image.position ? `${t.left}px` : "0",
                width: `${t.width}px`
            }),
            e.options.onCoverImage && e.options.onCoverImage.call(e),
            {
                image: {
                    height: l,
                    marginTop: r
                },
                container: t
            }
        }
        isVisible() {
            return this.isElementInViewport || !1
        }
        onScroll(e) {
            const t = this
              , o = t.$item.getBoundingClientRect()
              , n = o.top
              , a = o.height
              , l = {};
            let r = o;
            if (t.options.elementInViewport && (r = t.options.elementInViewport.getBoundingClientRect()),
            t.isElementInViewport = 0 <= r.bottom && 0 <= r.right && r.top <= s && r.left <= i.innerWidth,
            !e && !t.isElementInViewport)
                return;
            const m = Math.max(0, n)
              , c = Math.max(0, a + n)
              , p = Math.max(0, -n)
              , d = Math.max(0, n + a - s)
              , g = Math.max(0, a - (n + a - s))
              , u = Math.max(0, -n + s - a)
              , f = 1 - (s - n) / (s + a) * 2;
            let h = 1;
            if (a < s ? h = 1 - (p || d) / a : c <= s ? h = c / s : g <= s && (h = g / s),
            "opacity" !== t.options.type && "scale-opacity" !== t.options.type && "scroll-opacity" !== t.options.type || (l.transform = "translate3d(0,0,0)",
            l.opacity = h),
            "scale" === t.options.type || "scale-opacity" === t.options.type) {
                let e = 1;
                0 > t.options.speed ? e -= t.options.speed * h : e += t.options.speed * (1 - h),
                l.transform = `scale(${e}) translate3d(0,0,0)`
            }
            if ("scroll" === t.options.type || "scroll-opacity" === t.options.type) {
                let e = t.parallaxScrollDistance * f;
                "absolute" === t.image.position && (e -= n),
                l.transform = `translate3d(0,${e}px,0)`
            }
            t.css(t.image.$item, l),
            t.options.onScroll && t.options.onScroll.call(t, {
                section: o,
                beforeTop: m,
                beforeTopEnd: c,
                afterTop: p,
                beforeBottom: d,
                beforeBottomEnd: g,
                afterBottom: u,
                visiblePercent: h,
                fromViewportCenter: f
            })
        }
        onResize() {
            this.coverImage()
        }
    }
    const d = function(e, t, ...i) {
        ("object" == typeof HTMLElement ? e instanceof HTMLElement : e && "object" == typeof e && null !== e && 1 === e.nodeType && "string" == typeof e.nodeName) && (e = [e]);
        const o = e.length;
        let n, a = 0;
        for (; a < o; a += 1)
            if ("object" == typeof t || void 0 === t ? e[a].jarallax || (e[a].jarallax = new p(e[a],t)) : e[a].jarallax && (n = e[a].jarallax[t].apply(e[a].jarallax, i)),
            void 0 !== n)
                return n;
        return e
    };
    d.constructor = p;
    const g = i.jQuery;
    if (void 0 !== g) {
        const e = function(...e) {
            Array.prototype.unshift.call(e, this);
            const t = d.apply(i, e);
            return "object" != typeof t ? t : this
        };
        e.constructor = d.constructor;
        const t = g.fn.jarallax;
        g.fn.jarallax = e,
        g.fn.jarallax.noConflict = function() {
            return g.fn.jarallax = t,
            this
        }
    }
    return e((()=>{
        d(document.querySelectorAll("[data-jarallax]"))
    }
    )),
    d
}
));
//# sourceMappingURL=jarallax.min.js.map
