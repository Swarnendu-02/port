( () => {
    "use strict";
    const e = {
        smoother: null,
        splitInstances: []
    };
    function t() {
        for (var e = document.querySelectorAll("#smooth-content *"), t = 0; t < e.length; t++) {
            var s = e[t];
            if (!s.hasAttribute("data-scroll-ignore") && !(s.scrollHeight <= s.clientHeight)) {
                var i = getComputedStyle(s).overflowY;
                "auto" !== i && "scroll" !== i || s.setAttribute("data-scroll-ignore", "")
            }
        }
    }
    function s() {
        if ("undefined" == typeof ScrollSmoother)
            return;
        if ("undefined" == typeof OvaneConfig || !OvaneConfig.smoothScroll || !OvaneConfig.smoothScroll.enable)
            return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        if (window.innerWidth < 1024)
            return;
        gsap.registerPlugin(ScrollSmoother),
        e.smoother && (e.smoother.kill(),
        e.smoother = null);
        const s = document.getElementById("smooth-wrapper");
        if (!s)
            return;
        const i = document.getElementById("wpadminbar");
        if (i) {
            const e = i.offsetHeight;
            s.style.top = e + "px",
            s.style.height = "calc(100% - " + e + "px)"
        }
        let o = OvaneConfig.smoothScroll.normalize;
        if (o && (o = {
            allowNestedScroll: !0,
            type: "pointer,touch,wheel",
            ignore: ["[data-lenis-prevent]", "[data-scroll-ignore]", "[data-overlayscrollbars-viewport]", "textarea", "select", ".a2a_full", ".a2a_full_services", ".mobile-menu", ".search-overlay", ".newsletter-modal", ".wpcf7-form", ".os-viewport", ".jkp-content"].join(", ")
        }),
        t(),
        e.smoother = ScrollSmoother.create({
            wrapper: "#smooth-wrapper",
            content: "#smooth-content",
            smooth: OvaneConfig.smoothScroll.speed || 1,
            smoothTouch: !!OvaneConfig.smoothScroll.touch && .1,
            normalizeScroll: o,
            effects: !0,
            ignoreMobileResize: !0
        }),
        "undefined" != typeof MutationObserver) {
            var r = document.getElementById("smooth-content");
            r && new MutationObserver(t).observe(r, {
                childList: !0,
                subtree: !0
            })
        }
    }
    function i() {
        const t = document.querySelector(".site-header");
        if (!t)
            return;
        if ("false" === t.dataset.sticky)
            return;
        if ("undefined" != typeof ScrollTrigger && e.smoother)
            return ScrollTrigger.create({
                start: 50,
                end: "max",
                onToggle: function(e) {
                    e.isActive ? t.classList.add("is-scrolled") : t.classList.remove("is-scrolled")
                }
            }),
            t.style.position = "fixed",
            t.style.left = "0",
            void (t.style.right = "0");
        let s = !1;
        function i() {
            window.scrollY > 50 ? t.classList.add("is-scrolled") : t.classList.remove("is-scrolled"),
            s = !1
        }
        window.addEventListener("scroll", function() {
            s || (requestAnimationFrame(i),
            s = !0)
        }, {
            passive: !0
        }),
        i()
    }
    function o(e) {
        const t = e.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (!t.length)
            return null;
        const s = t[0]
          , i = t[t.length - 1];
        function o(e) {
            "Tab" === e.key && (e.shiftKey ? document.activeElement === s && (e.preventDefault(),
            i.focus()) : document.activeElement === i && (e.preventDefault(),
            s.focus()))
        }
        return e.addEventListener("keydown", o),
        function() {
            e.removeEventListener("keydown", o)
        }
    }
    function r() {
        const e = document.querySelector(".site-header__hamburger")
          , t = document.querySelector(".mobile-menu")
          , s = document.querySelector(".mobile-menu__close");
        if (!e || !t)
            return;
        const i = t.querySelectorAll(".mobile-menu__panel")
          , r = t.querySelector(".mobile-menu__panel--root");
        let n = []
          , a = null;
        function l() {
            i.forEach(function(e) {
                e.classList.remove("is-active", "is-pushed")
            }),
            r && r.classList.add("is-active"),
            n = []
        }
        function c() {
            t.classList.remove("is-open"),
            e.setAttribute("aria-expanded", "false"),
            t.setAttribute("aria-hidden", "true"),
            document.body.style.overflow = "",
            a && (a(),
            a = null),
            setTimeout(l, 400)
        }
        function d() {
            return t.classList.contains("is-open")
        }
        e.addEventListener("click", function() {
            d() ? c() : (l(),
            t.classList.add("is-open"),
            e.setAttribute("aria-expanded", "true"),
            t.setAttribute("aria-hidden", "false"),
            document.body.style.overflow = "hidden",
            a = o(t))
        }),
        s && s.addEventListener("click", c),
        t.addEventListener("click", function(e) {
            const s = e.target.closest(".mobile-menu__arrow");
            if (s)
                return e.preventDefault(),
                void function(e) {
                    let s = t.querySelector(".mobile-menu__panel.is-active");
                    const i = t.querySelector('[data-panel="' + e + '"]');
                    i && (s && (n.push(s.getAttribute("data-panel")),
                    s.classList.remove("is-active"),
                    s.classList.add("is-pushed")),
                    i.classList.remove("is-pushed"),
                    i.classList.add("is-active"))
                }(s.getAttribute("data-open"));
            if (e.target.closest(".mobile-menu__back"))
                return e.preventDefault(),
                void function() {
                    if (!n.length)
                        return;
                    let e = t.querySelector(".mobile-menu__panel.is-active");
                    const s = n.pop()
                      , i = t.querySelector('[data-panel="' + s + '"]');
                    i && (e && (e.classList.remove("is-active"),
                    e.style.transform = "translateX(100%)",
                    setTimeout(function() {
                        e.style.transform = ""
                    }, 350)),
                    i.classList.remove("is-pushed"),
                    i.classList.add("is-active"))
                }();
            const i = e.target.closest(".mobile-menu__link");
            i?.getAttribute("href") && "#" !== i.getAttribute("href") && c()
        }),
        document.addEventListener("keydown", function(t) {
            "Escape" === t.key && d() && (c(),
            e.focus())
        })
    }
    let n = !1;
    function a() {
        if (n)
            return;
        const e = document.querySelector(".search-toggle")
          , t = document.querySelector(".search-overlay")
          , s = document.querySelector(".search-overlay__close")
          , i = document.querySelector(".search-overlay__input");
        if (!e || !t)
            return;
        n = !0;
        let r = null;
        function a() {
            t.classList.remove("is-open"),
            t.setAttribute("aria-hidden", "true"),
            e.setAttribute("aria-expanded", "false"),
            document.body.style.overflow = "",
            i && (i.value = ""),
            r && (r(),
            r = null),
            e.focus()
        }
        e.addEventListener("click", function(s) {
            s.preventDefault(),
            s.stopPropagation(),
            t.classList.add("is-open"),
            t.setAttribute("aria-hidden", "false"),
            e.setAttribute("aria-expanded", "true"),
            document.body.style.overflow = "hidden",
            setTimeout(function() {
                i && i.focus(),
                r = o(t)
            }, 300)
        }),
        s && s.addEventListener("click", function(e) {
            e.preventDefault(),
            a()
        }),
        document.addEventListener("keydown", function(e) {
            "Escape" === e.key && t.classList.contains("is-open") && a()
        }),
        t.addEventListener("click", function(e) {
            e.target === t && a()
        })
    }
    let l = !1;
    function c(e, t, s={}) {
        const {threshold: i=.1, rootMargin: o="0px", persistent: r=!1} = s;
        if ("undefined" == typeof IntersectionObserver)
            return Array.from(e).forEach(function(e) {
                t({
                    target: e,
                    isIntersecting: !0
                }, null)
            }),
            {
                destroy: function() {}
            };
        let n = r ? 1 / 0 : e.length;
        const a = new IntersectionObserver(function(e, s) {
            e.forEach(function(e) {
                e.isIntersecting && (t(e, s),
                r || (s.unobserve(e.target),
                n--,
                n <= 0 && s.disconnect()))
            })
        }
        ,{
            threshold: i,
            rootMargin: o
        });
        return Array.from(e).forEach(function(e) {
            a.observe(e)
        }),
        {
            destroy: function() {
                a.disconnect()
            }
        }
    }
    let d = null;
    function u() {
        const e = document.querySelectorAll(".section-divider:not(.is-ready)");
        e.length && (e.forEach(function(e) {
            e.classList.add("is-ready");
            e.querySelectorAll(".section-divider__path").forEach(function(t) {
                try {
                    const e = Math.ceil(t.getTotalLength());
                    t.style.strokeDasharray = e,
                    t.style.strokeDashoffset = e
                } catch (t) {
                    e.classList.add("is-drawn")
                }
            })
        }),
        d = c(e, function(e) {
            e.target.classList.add("is-drawn")
        }, {
            threshold: .3
        }))
    }
    function p() {
        document.querySelectorAll(".faq-item__trigger").forEach(function(e) {
            e.addEventListener("click", function() {
                const t = "true" === e.getAttribute("aria-expanded")
                  , s = document.getElementById(e.getAttribute("aria-controls"));
                s && (e.setAttribute("aria-expanded", t ? "false" : "true"),
                s.style.maxHeight = t ? null : s.scrollHeight + "px")
            })
        })
    }
    let f = null;
    function m() {
        const e = document.querySelector(".jk-scroll-indicator")
          , t = document.querySelector(".hero-section");
        e && t && (f = c([t], function(t) {
            t.isIntersecting ? e.classList.remove("is-hidden") : e.classList.add("is-hidden")
        }, {
            threshold: .1,
            persistent: !0
        }))
    }
    function g(e) {
        return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
    }
    function h(e={}, t={}) {
        const s = ["__proto__", "constructor", "prototype"];
        Object.keys(t).filter(e => s.indexOf(e) < 0).forEach(s => {
            void 0 === e[s] ? e[s] = t[s] : g(t[s]) && g(e[s]) && Object.keys(t[s]).length > 0 && h(e[s], t[s])
        }
        )
    }
    const v = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: {
            blur() {},
            nodeName: ""
        },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({
            initEvent() {}
        }),
        createElement: () => ({
            children: [],
            childNodes: [],
            style: {},
            setAttribute() {},
            getElementsByTagName: () => []
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function y() {
        const e = "undefined" != typeof document ? document : {};
        return h(e, v),
        e
    }
    const w = {
        document: v,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState() {},
            pushState() {},
            go() {},
            back() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({
            getPropertyValue: () => ""
        }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: e => "undefined" == typeof setTimeout ? (e(),
        null) : setTimeout(e, 0),
        cancelAnimationFrame(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };
    function b() {
        const e = "undefined" != typeof window ? window : {};
        return h(e, w),
        e
    }
    function _(e, t=0) {
        return setTimeout(e, t)
    }
    function S() {
        return Date.now()
    }
    function E(e, t="x") {
        const s = b();
        let i, o, r;
        const n = function(e) {
            const t = b();
            let s;
            return t.getComputedStyle && (s = t.getComputedStyle(e, null)),
            !s && e.currentStyle && (s = e.currentStyle),
            s || (s = e.style),
            s
        }(e);
        return s.WebKitCSSMatrix ? (o = n.transform || n.webkitTransform,
        o.split(",").length > 6 && (o = o.split(", ").map(e => e.replace(",", ".")).join(", ")),
        r = new s.WebKitCSSMatrix("none" === o ? "" : o)) : (r = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,"),
        i = r.toString().split(",")),
        "x" === t && (o = s.WebKitCSSMatrix ? r.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
        "y" === t && (o = s.WebKitCSSMatrix ? r.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
        o || 0
    }
    function T(e) {
        return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1)
    }
    function L(e) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement ? e instanceof HTMLElement : e && (1 === e.nodeType || 11 === e.nodeType)
    }
    function x(...e) {
        const t = Object(e[0]);
        for (let s = 1; s < e.length; s += 1) {
            const i = e[s];
            if (null != i && !L(i)) {
                const e = Object.keys(Object(i)).filter(e => "__proto__" !== e && "constructor" !== e && "prototype" !== e);
                for (let s = 0, o = e.length; s < o; s += 1) {
                    const o = e[s]
                      , r = Object.getOwnPropertyDescriptor(i, o);
                    void 0 !== r && r.enumerable && (T(t[o]) && T(i[o]) ? i[o].__swiper__ ? t[o] = i[o] : x(t[o], i[o]) : !T(t[o]) && T(i[o]) ? (t[o] = {},
                    i[o].__swiper__ ? t[o] = i[o] : x(t[o], i[o])) : t[o] = i[o])
                }
            }
        }
        return t
    }
    function C(e, t, s) {
        e.style.setProperty(t, s)
    }
    function k({swiper: e, targetPosition: t, side: s}) {
        const i = b()
          , o = -e.translate;
        let r, n = null;
        const a = e.params.speed;
        e.wrapperEl.style.scrollSnapType = "none",
        i.cancelAnimationFrame(e.cssModeFrameID);
        const l = t > o ? "next" : "prev"
          , c = (e, t) => "next" === l && e >= t || "prev" === l && e <= t
          , d = () => {
            r = (new Date).getTime(),
            null === n && (n = r);
            const l = Math.max(Math.min((r - n) / a, 1), 0)
              , u = .5 - Math.cos(l * Math.PI) / 2;
            let p = o + u * (t - o);
            if (c(p, t) && (p = t),
            e.wrapperEl.scrollTo({
                [s]: p
            }),
            c(p, t))
                return e.wrapperEl.style.overflow = "hidden",
                e.wrapperEl.style.scrollSnapType = "",
                setTimeout( () => {
                    e.wrapperEl.style.overflow = "",
                    e.wrapperEl.scrollTo({
                        [s]: p
                    })
                }
                ),
                void i.cancelAnimationFrame(e.cssModeFrameID);
            e.cssModeFrameID = i.requestAnimationFrame(d)
        }
        ;
        d()
    }
    function q(e) {
        return e.querySelector(".swiper-slide-transform") || e.shadowRoot && e.shadowRoot.querySelector(".swiper-slide-transform") || e
    }
    function A(e, t="") {
        const s = b()
          , i = [...e.children];
        return s.HTMLSlotElement && e instanceof HTMLSlotElement && i.push(...e.assignedElements()),
        t ? i.filter(e => e.matches(t)) : i
    }
    function M(e) {
        try {
            return
        } catch (e) {}
    }
    function P(e, t=[]) {
        const s = document.createElement(e);
        return s.classList.add(...Array.isArray(t) ? t : function(e="") {
            return e.trim().split(" ").filter(e => !!e.trim())
        }(t)),
        s
    }
    function I(e, t) {
        return b().getComputedStyle(e, null).getPropertyValue(t)
    }
    function O(e) {
        let t, s = e;
        if (s) {
            for (t = 0; null !== (s = s.previousSibling); )
                1 === s.nodeType && (t += 1);
            return t
        }
    }
    function z(e, t) {
        const s = [];
        let i = e.parentElement;
        for (; i; )
            t ? i.matches(t) && s.push(i) : s.push(i),
            i = i.parentElement;
        return s
    }
    function j(e, t, s) {
        const i = b();
        return s ? e["width" === t ? "offsetWidth" : "offsetHeight"] + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-right" : "margin-top")) + parseFloat(i.getComputedStyle(e, null).getPropertyValue("width" === t ? "margin-left" : "margin-bottom")) : e.offsetWidth
    }
    function B(e) {
        return (Array.isArray(e) ? e : [e]).filter(e => !!e)
    }
    function D(e, t="") {
        "undefined" != typeof trustedTypes ? e.innerHTML = trustedTypes.createPolicy("html", {
            createHTML: e => e
        }).createHTML(t) : e.innerHTML = t
    }
    let G, V, $;
    function F() {
        return G || (G = function() {
            const e = b()
              , t = y();
            return {
                smoothScroll: t.documentElement && t.documentElement.style && "scrollBehavior"in t.documentElement.style,
                touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch)
            }
        }()),
        G
    }
    function H(e={}) {
        return V || (V = function({userAgent: e}={}) {
            const t = F()
              , s = b()
              , i = s.navigator.platform
              , o = e || s.navigator.userAgent
              , r = {
                ios: !1,
                android: !1
            }
              , n = s.screen.width
              , a = s.screen.height
              , l = o.match(/(Android);?[\s\/]+([\d.]+)?/);
            let c = o.match(/(iPad)(?!\1).*OS\s([\d_]+)/);
            const d = o.match(/(iPod)(.*OS\s([\d_]+))?/)
              , u = !c && o.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
              , p = "Win32" === i;
            let f = "MacIntel" === i;
            return !c && f && t.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(`${n}x${a}`) >= 0 && (c = o.match(/(Version)\/([\d.]+)/),
            c || (c = [0, 1, "13_0_0"]),
            f = !1),
            l && !p && (r.os = "android",
            r.android = !0),
            (c || u || d) && (r.os = "ios",
            r.ios = !0),
            r
        }(e)),
        V
    }
    function N() {
        return $ || ($ = function() {
            const e = b()
              , t = H();
            let s = !1;
            function i() {
                const t = e.navigator.userAgent.toLowerCase();
                return t.indexOf("safari") >= 0 && t.indexOf("chrome") < 0 && t.indexOf("android") < 0
            }
            if (i()) {
                const t = String(e.navigator.userAgent);
                if (t.includes("Version/")) {
                    const [e,i] = t.split("Version/")[1].split(" ")[0].split(".").map(e => Number(e));
                    s = e < 16 || 16 === e && i < 2
                }
            }
            const o = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)
              , r = i();
            return {
                isSafari: s || r,
                needPerspectiveFix: s,
                need3dFix: r || o && t.ios,
                isWebView: o
            }
        }()),
        $
    }
    var R = {
        on(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            const o = s ? "unshift" : "push";
            return e.split(" ").forEach(e => {
                i.eventsListeners[e] || (i.eventsListeners[e] = []),
                i.eventsListeners[e][o](t)
            }
            ),
            i
        },
        once(e, t, s) {
            const i = this;
            if (!i.eventsListeners || i.destroyed)
                return i;
            if ("function" != typeof t)
                return i;
            function o(...s) {
                i.off(e, o),
                o.__emitterProxy && delete o.__emitterProxy,
                t.apply(i, s)
            }
            return o.__emitterProxy = t,
            i.on(e, o, s)
        },
        onAny(e, t) {
            const s = this;
            if (!s.eventsListeners || s.destroyed)
                return s;
            if ("function" != typeof e)
                return s;
            const i = t ? "unshift" : "push";
            return s.eventsAnyListeners.indexOf(e) < 0 && s.eventsAnyListeners[i](e),
            s
        },
        offAny(e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed)
                return t;
            if (!t.eventsAnyListeners)
                return t;
            const s = t.eventsAnyListeners.indexOf(e);
            return s >= 0 && t.eventsAnyListeners.splice(s, 1),
            t
        },
        off(e, t) {
            const s = this;
            return !s.eventsListeners || s.destroyed ? s : s.eventsListeners ? (e.split(" ").forEach(e => {
                void 0 === t ? s.eventsListeners[e] = [] : s.eventsListeners[e] && s.eventsListeners[e].forEach( (i, o) => {
                    (i === t || i.__emitterProxy && i.__emitterProxy === t) && s.eventsListeners[e].splice(o, 1)
                }
                )
            }
            ),
            s) : s
        },
        emit(...e) {
            const t = this;
            if (!t.eventsListeners || t.destroyed)
                return t;
            if (!t.eventsListeners)
                return t;
            let s, i, o;
            "string" == typeof e[0] || Array.isArray(e[0]) ? (s = e[0],
            i = e.slice(1, e.length),
            o = t) : (s = e[0].events,
            i = e[0].data,
            o = e[0].context || t),
            i.unshift(o);
            return (Array.isArray(s) ? s : s.split(" ")).forEach(e => {
                t.eventsAnyListeners && t.eventsAnyListeners.length && t.eventsAnyListeners.forEach(t => {
                    t.apply(o, [e, ...i])
                }
                ),
                t.eventsListeners && t.eventsListeners[e] && t.eventsListeners[e].forEach(e => {
                    e.apply(o, i)
                }
                )
            }
            ),
            t
        }
    };
    const W = (e, t, s) => {
        t && !e.classList.contains(s) ? e.classList.add(s) : !t && e.classList.contains(s) && e.classList.remove(s)
    }
    ;
    const Y = (e, t, s) => {
        t && !e.classList.contains(s) ? e.classList.add(s) : !t && e.classList.contains(s) && e.classList.remove(s)
    }
    ;
    const X = (e, t) => {
        if (!e || e.destroyed || !e.params)
            return;
        const s = t.closest(e.isElement ? "swiper-slide" : `.${e.params.slideClass}`);
        if (s) {
            let t = s.querySelector(`.${e.params.lazyPreloaderClass}`);
            !t && e.isElement && (s.shadowRoot ? t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`) : requestAnimationFrame( () => {
                s.shadowRoot && (t = s.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),
                t && !t.lazyPreloaderManaged && t.remove())
            }
            )),
            t && !t.lazyPreloaderManaged && t.remove()
        }
    }
      , U = (e, t) => {
        if (!e.slides[t])
            return;
        const s = e.slides[t].querySelector('[loading="lazy"]');
        s && s.removeAttribute("loading")
    }
      , K = e => {
        if (!e || e.destroyed || !e.params)
            return;
        let t = e.params.lazyPreloadPrevNext;
        const s = e.slides.length;
        if (!s || !t || t < 0)
            return;
        t = Math.min(t, s);
        const i = "auto" === e.params.slidesPerView ? e.slidesPerViewDynamic() : Math.ceil(e.params.slidesPerView)
          , o = e.activeIndex;
        if (e.params.grid && e.params.grid.rows > 1) {
            const s = o
              , r = [s - t];
            return r.push(...Array.from({
                length: t
            }).map( (e, t) => s + i + t)),
            void e.slides.forEach( (t, s) => {
                r.includes(t.column) && U(e, s)
            }
            )
        }
        const r = o + i - 1;
        if (e.params.rewind || e.params.loop)
            for (let i = o - t; i <= r + t; i += 1) {
                const t = (i % s + s) % s;
                (t < o || t > r) && U(e, t)
            }
        else
            for (let i = Math.max(o - t, 0); i <= Math.min(r + t, s - 1); i += 1)
                i !== o && (i > r || i < o) && U(e, i)
    }
    ;
    var J = {
        updateSize: function() {
            const e = this;
            let t, s;
            const i = e.el;
            t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i.clientWidth,
            s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i.clientHeight,
            0 === t && e.isHorizontal() || 0 === s && e.isVertical() || (t = t - parseInt(I(i, "padding-left") || 0, 10) - parseInt(I(i, "padding-right") || 0, 10),
            s = s - parseInt(I(i, "padding-top") || 0, 10) - parseInt(I(i, "padding-bottom") || 0, 10),
            Number.isNaN(t) && (t = 0),
            Number.isNaN(s) && (s = 0),
            Object.assign(e, {
                width: t,
                height: s,
                size: e.isHorizontal() ? t : s
            }))
        },
        updateSlides: function() {
            const e = this;
            function t(t, s) {
                return parseFloat(t.getPropertyValue(e.getDirectionLabel(s)) || 0)
            }
            const s = e.params
              , {wrapperEl: i, slidesEl: o, rtlTranslate: r, wrongRTL: n} = e
              , a = e.virtual && s.virtual.enabled
              , l = a ? e.virtual.slides.length : e.slides.length
              , c = A(o, `.${e.params.slideClass}, swiper-slide`)
              , d = a ? e.virtual.slides.length : c.length;
            let u = [];
            const p = []
              , f = [];
            let m = s.slidesOffsetBefore;
            "function" == typeof m && (m = s.slidesOffsetBefore.call(e));
            let g = s.slidesOffsetAfter;
            "function" == typeof g && (g = s.slidesOffsetAfter.call(e));
            const h = e.snapGrid.length
              , v = e.slidesGrid.length
              , y = e.size - m - g;
            let w = s.spaceBetween
              , b = -m
              , _ = 0
              , S = 0;
            if (void 0 === y)
                return;
            "string" == typeof w && w.indexOf("%") >= 0 ? w = parseFloat(w.replace("%", "")) / 100 * y : "string" == typeof w && (w = parseFloat(w)),
            e.virtualSize = -w - m - g,
            c.forEach(e => {
                r ? e.style.marginLeft = "" : e.style.marginRight = "",
                e.style.marginBottom = "",
                e.style.marginTop = ""
            }
            ),
            s.centeredSlides && s.cssMode && (C(i, "--swiper-centered-offset-before", ""),
            C(i, "--swiper-centered-offset-after", "")),
            s.cssMode && (C(i, "--swiper-slides-offset-before", `${m}px`),
            C(i, "--swiper-slides-offset-after", `${g}px`));
            const E = s.grid && s.grid.rows > 1 && e.grid;
            let T;
            E ? e.grid.initSlides(c) : e.grid && e.grid.unsetSlides();
            const L = "auto" === s.slidesPerView && s.breakpoints && Object.keys(s.breakpoints).filter(e => void 0 !== s.breakpoints[e].slidesPerView).length > 0;
            for (let i = 0; i < d; i += 1) {
                T = 0;
                const o = c[i];
                if (!o || (E && e.grid.updateSlide(i, o, c),
                "none" !== I(o, "display"))) {
                    if (a && "auto" === s.slidesPerView)
                        s.virtual.slidesPerViewAutoSlideSize && (T = s.virtual.slidesPerViewAutoSlideSize),
                        T && o && (s.roundLengths && (T = Math.floor(T)),
                        o.style[e.getDirectionLabel("width")] = `${T}px`);
                    else if ("auto" === s.slidesPerView) {
                        L && (o.style[e.getDirectionLabel("width")] = "");
                        const i = getComputedStyle(o)
                          , r = o.style.transform
                          , n = o.style.webkitTransform;
                        if (r && (o.style.transform = "none"),
                        n && (o.style.webkitTransform = "none"),
                        s.roundLengths)
                            T = e.isHorizontal() ? j(o, "width", !0) : j(o, "height", !0);
                        else {
                            const e = t(i, "width")
                              , s = t(i, "padding-left")
                              , r = t(i, "padding-right")
                              , n = t(i, "margin-left")
                              , a = t(i, "margin-right")
                              , l = i.getPropertyValue("box-sizing");
                            if (l && "border-box" === l)
                                T = e + n + a;
                            else {
                                const {clientWidth: t, offsetWidth: i} = o;
                                T = e + s + r + n + a + (i - t)
                            }
                        }
                        r && (o.style.transform = r),
                        n && (o.style.webkitTransform = n),
                        s.roundLengths && (T = Math.floor(T))
                    } else
                        T = (y - (s.slidesPerView - 1) * w) / s.slidesPerView,
                        s.roundLengths && (T = Math.floor(T)),
                        o && (o.style[e.getDirectionLabel("width")] = `${T}px`);
                    o && (o.swiperSlideSize = T),
                    f.push(T),
                    s.centeredSlides ? (b = b + T / 2 + _ / 2 + w,
                    0 === _ && 0 !== i && (b = b - y / 2 - w),
                    0 === i && (b = b - y / 2 - w),
                    Math.abs(b) < .001 && (b = 0),
                    s.roundLengths && (b = Math.floor(b)),
                    S % s.slidesPerGroup === 0 && u.push(b),
                    p.push(b)) : (s.roundLengths && (b = Math.floor(b)),
                    (S - Math.min(e.params.slidesPerGroupSkip, S)) % e.params.slidesPerGroup === 0 && u.push(b),
                    p.push(b),
                    b = b + T + w),
                    e.virtualSize += T + w,
                    _ = T,
                    S += 1
                }
            }
            if (e.virtualSize = Math.max(e.virtualSize, y) + g,
            r && n && ("slide" === s.effect || "coverflow" === s.effect) && (i.style.width = `${e.virtualSize + w}px`),
            s.setWrapperSize && (i.style[e.getDirectionLabel("width")] = `${e.virtualSize + w}px`),
            E && e.grid.updateWrapperSize(T, u),
            !s.centeredSlides) {
                const t = "auto" !== s.slidesPerView && s.slidesPerView % 1 != 0
                  , i = s.snapToSlideEdge && !s.loop && ("auto" === s.slidesPerView || t);
                let o = u.length;
                if (i) {
                    let e;
                    if ("auto" === s.slidesPerView) {
                        e = 1;
                        let t = 0;
                        for (let s = f.length - 1; s >= 0 && (t += f[s] + (s < f.length - 1 ? w : 0),
                        t <= y); s -= 1)
                            e = f.length - s
                    } else
                        e = Math.floor(s.slidesPerView);
                    o = Math.max(d - e, 0)
                }
                const r = [];
                for (let t = 0; t < u.length; t += 1) {
                    let n = u[t];
                    s.roundLengths && (n = Math.floor(n)),
                    i ? t <= o && r.push(n) : u[t] <= e.virtualSize - y && r.push(n)
                }
                u = r,
                Math.floor(e.virtualSize - y) - Math.floor(u[u.length - 1]) > 1 && (i || u.push(e.virtualSize - y))
            }
            if (a && s.loop) {
                const t = f[0] + w;
                if (s.slidesPerGroup > 1) {
                    const i = Math.ceil((e.virtual.slidesBefore + e.virtual.slidesAfter) / s.slidesPerGroup)
                      , o = t * s.slidesPerGroup;
                    for (let e = 0; e < i; e += 1)
                        u.push(u[u.length - 1] + o)
                }
                for (let i = 0; i < e.virtual.slidesBefore + e.virtual.slidesAfter; i += 1)
                    1 === s.slidesPerGroup && u.push(u[u.length - 1] + t),
                    p.push(p[p.length - 1] + t),
                    e.virtualSize += t
            }
            if (0 === u.length && (u = [0]),
            0 !== w) {
                const t = e.isHorizontal() && r ? "marginLeft" : e.getDirectionLabel("marginRight");
                c.filter( (e, t) => !(s.cssMode && !s.loop) || t !== c.length - 1).forEach(e => {
                    e.style[t] = `${w}px`
                }
                )
            }
            if (s.centeredSlides && s.centeredSlidesBounds) {
                let e = 0;
                f.forEach(t => {
                    e += t + (w || 0)
                }
                ),
                e -= w;
                const t = e > y ? e - y : 0;
                u = u.map(e => e <= 0 ? -m : e > t ? t + g : e)
            }
            if (s.centerInsufficientSlides) {
                let e = 0;
                if (f.forEach(t => {
                    e += t + (w || 0)
                }
                ),
                e -= w,
                e < y) {
                    const t = (y - e) / 2;
                    u.forEach( (e, s) => {
                        u[s] = e - t
                    }
                    ),
                    p.forEach( (e, s) => {
                        p[s] = e + t
                    }
                    )
                }
            }
            if (Object.assign(e, {
                slides: c,
                snapGrid: u,
                slidesGrid: p,
                slidesSizesGrid: f
            }),
            s.centeredSlides && s.cssMode && !s.centeredSlidesBounds) {
                C(i, "--swiper-centered-offset-before", -u[0] + "px"),
                C(i, "--swiper-centered-offset-after", e.size / 2 - f[f.length - 1] / 2 + "px");
                const t = -e.snapGrid[0]
                  , s = -e.slidesGrid[0];
                e.snapGrid = e.snapGrid.map(e => e + t),
                e.slidesGrid = e.slidesGrid.map(e => e + s)
            }
            if (d !== l && e.emit("slidesLengthChange"),
            u.length !== h && (e.params.watchOverflow && e.checkOverflow(),
            e.emit("snapGridLengthChange")),
            p.length !== v && e.emit("slidesGridLengthChange"),
            s.watchSlidesProgress && e.updateSlidesOffset(),
            e.emit("slidesUpdated"),
            !(a || s.cssMode || "slide" !== s.effect && "fade" !== s.effect)) {
                const t = `${s.containerModifierClass}backface-hidden`
                  , i = e.el.classList.contains(t);
                d <= s.maxBackfaceHiddenSlides ? i || e.el.classList.add(t) : i && e.el.classList.remove(t)
            }
        },
        updateAutoHeight: function(e) {
            const t = this
              , s = []
              , i = t.virtual && t.params.virtual.enabled;
            let o, r = 0;
            "number" == typeof e ? t.setTransition(e) : !0 === e && t.setTransition(t.params.speed);
            const n = e => i ? t.slides[t.getSlideIndexByData(e)] : t.slides[e];
            if ("auto" !== t.params.slidesPerView && t.params.slidesPerView > 1)
                if (t.params.centeredSlides)
                    (t.visibleSlides || []).forEach(e => {
                        s.push(e)
                    }
                    );
                else
                    for (o = 0; o < Math.ceil(t.params.slidesPerView); o += 1) {
                        const e = t.activeIndex + o;
                        if (e > t.slides.length && !i)
                            break;
                        s.push(n(e))
                    }
            else
                s.push(n(t.activeIndex));
            for (o = 0; o < s.length; o += 1)
                if (void 0 !== s[o]) {
                    const e = s[o].offsetHeight;
                    r = e > r ? e : r
                }
            (r || 0 === r) && (t.wrapperEl.style.height = `${r}px`)
        },
        updateSlidesOffset: function() {
            const e = this
              , t = e.slides
              , s = e.isElement ? e.isHorizontal() ? e.wrapperEl.offsetLeft : e.wrapperEl.offsetTop : 0;
            for (let i = 0; i < t.length; i += 1)
                t[i].swiperSlideOffset = (e.isHorizontal() ? t[i].offsetLeft : t[i].offsetTop) - s - e.cssOverflowAdjustment()
        },
        updateSlidesProgress: function(e=this && this.translate || 0) {
            const t = this
              , s = t.params
              , {slides: i, rtlTranslate: o, snapGrid: r} = t;
            if (0 === i.length)
                return;
            void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
            let n = -e;
            o && (n = e),
            t.visibleSlidesIndexes = [],
            t.visibleSlides = [];
            let a = s.spaceBetween;
            "string" == typeof a && a.indexOf("%") >= 0 ? a = parseFloat(a.replace("%", "")) / 100 * t.size : "string" == typeof a && (a = parseFloat(a));
            for (let e = 0; e < i.length; e += 1) {
                const l = i[e];
                let c = l.swiperSlideOffset;
                s.cssMode && s.centeredSlides && (c -= i[0].swiperSlideOffset);
                const d = (n + (s.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + a)
                  , u = (n - r[0] + (s.centeredSlides ? t.minTranslate() : 0) - c) / (l.swiperSlideSize + a)
                  , p = -(n - c)
                  , f = p + t.slidesSizesGrid[e]
                  , m = p >= 0 && p <= t.size - t.slidesSizesGrid[e]
                  , g = p >= 0 && p < t.size - 1 || f > 1 && f <= t.size || p <= 0 && f >= t.size;
                g && (t.visibleSlides.push(l),
                t.visibleSlidesIndexes.push(e)),
                W(l, g, s.slideVisibleClass),
                W(l, m, s.slideFullyVisibleClass),
                l.progress = o ? -d : d,
                l.originalProgress = o ? -u : u
            }
        },
        updateProgress: function(e) {
            const t = this;
            if (void 0 === e) {
                const s = t.rtlTranslate ? -1 : 1;
                e = t && t.translate && t.translate * s || 0
            }
            const s = t.params
              , i = t.maxTranslate() - t.minTranslate();
            let {progress: o, isBeginning: r, isEnd: n, progressLoop: a} = t;
            const l = r
              , c = n;
            if (0 === i)
                o = 0,
                r = !0,
                n = !0;
            else {
                o = (e - t.minTranslate()) / i;
                const s = Math.abs(e - t.minTranslate()) < 1
                  , a = Math.abs(e - t.maxTranslate()) < 1;
                r = s || o <= 0,
                n = a || o >= 1,
                s && (o = 0),
                a && (o = 1)
            }
            if (s.loop) {
                const s = t.getSlideIndexByData(0)
                  , i = t.getSlideIndexByData(t.slides.length - 1)
                  , o = t.slidesGrid[s]
                  , r = t.slidesGrid[i]
                  , n = t.slidesGrid[t.slidesGrid.length - 1]
                  , l = Math.abs(e);
                a = l >= o ? (l - o) / n : (l + n - r) / n,
                a > 1 && (a -= 1)
            }
            Object.assign(t, {
                progress: o,
                progressLoop: a,
                isBeginning: r,
                isEnd: n
            }),
            (s.watchSlidesProgress || s.centeredSlides && s.autoHeight) && t.updateSlidesProgress(e),
            r && !l && t.emit("reachBeginning toEdge"),
            n && !c && t.emit("reachEnd toEdge"),
            (l && !r || c && !n) && t.emit("fromEdge"),
            t.emit("progress", o)
        },
        updateSlidesClasses: function() {
            const e = this
              , {slides: t, params: s, slidesEl: i, activeIndex: o} = e
              , r = e.virtual && s.virtual.enabled
              , n = e.grid && s.grid && s.grid.rows > 1
              , a = e => A(i, `.${s.slideClass}${e}, swiper-slide${e}`)[0];
            let l, c, d;
            if (r)
                if (s.loop) {
                    let t = o - e.virtual.slidesBefore;
                    t < 0 && (t = e.virtual.slides.length + t),
                    t >= e.virtual.slides.length && (t -= e.virtual.slides.length),
                    l = a(`[data-swiper-slide-index="${t}"]`)
                } else
                    l = a(`[data-swiper-slide-index="${o}"]`);
            else
                n ? (l = t.find(e => e.column === o),
                d = t.find(e => e.column === o + 1),
                c = t.find(e => e.column === o - 1)) : l = t[o];
            l && (n || (d = function(e, t) {
                const s = [];
                for (; e.nextElementSibling; ) {
                    const i = e.nextElementSibling;
                    t ? i.matches(t) && s.push(i) : s.push(i),
                    e = i
                }
                return s
            }(l, `.${s.slideClass}, swiper-slide`)[0],
            s.loop && !d && (d = t[0]),
            c = function(e, t) {
                const s = [];
                for (; e.previousElementSibling; ) {
                    const i = e.previousElementSibling;
                    t ? i.matches(t) && s.push(i) : s.push(i),
                    e = i
                }
                return s
            }(l, `.${s.slideClass}, swiper-slide`)[0],
            s.loop && 0 === !c && (c = t[t.length - 1]))),
            t.forEach(e => {
                Y(e, e === l, s.slideActiveClass),
                Y(e, e === d, s.slideNextClass),
                Y(e, e === c, s.slidePrevClass)
            }
            ),
            e.emitSlidesClasses()
        },
        updateActiveIndex: function(e) {
            const t = this
              , s = t.rtlTranslate ? t.translate : -t.translate
              , {snapGrid: i, params: o, activeIndex: r, realIndex: n, snapIndex: a} = t;
            let l, c = e;
            const d = e => {
                let s = e - t.virtual.slidesBefore;
                return s < 0 && (s = t.virtual.slides.length + s),
                s >= t.virtual.slides.length && (s -= t.virtual.slides.length),
                s
            }
            ;
            if (void 0 === c && (c = function(e) {
                const {slidesGrid: t, params: s} = e
                  , i = e.rtlTranslate ? e.translate : -e.translate;
                let o;
                for (let e = 0; e < t.length; e += 1)
                    void 0 !== t[e + 1] ? i >= t[e] && i < t[e + 1] - (t[e + 1] - t[e]) / 2 ? o = e : i >= t[e] && i < t[e + 1] && (o = e + 1) : i >= t[e] && (o = e);
                return s.normalizeSlideIndex && (o < 0 || void 0 === o) && (o = 0),
                o
            }(t)),
            i.indexOf(s) >= 0)
                l = i.indexOf(s);
            else {
                const e = Math.min(o.slidesPerGroupSkip, c);
                l = e + Math.floor((c - e) / o.slidesPerGroup)
            }
            if (l >= i.length && (l = i.length - 1),
            c === r && !t.params.loop)
                return void (l !== a && (t.snapIndex = l,
                t.emit("snapIndexChange")));
            if (c === r && t.params.loop && t.virtual && t.params.virtual.enabled)
                return void (t.realIndex = d(c));
            const u = t.grid && o.grid && o.grid.rows > 1;
            let p;
            if (t.virtual && o.virtual.enabled)
                p = o.loop ? d(c) : c;
            else if (u) {
                const e = t.slides.find(e => e.column === c);
                let s = parseInt(e.getAttribute("data-swiper-slide-index"), 10);
                Number.isNaN(s) && (s = Math.max(t.slides.indexOf(e), 0)),
                p = Math.floor(s / o.grid.rows)
            } else if (t.slides[c]) {
                const e = t.slides[c].getAttribute("data-swiper-slide-index");
                p = e ? parseInt(e, 10) : c
            } else
                p = c;
            Object.assign(t, {
                previousSnapIndex: a,
                snapIndex: l,
                previousRealIndex: n,
                realIndex: p,
                previousIndex: r,
                activeIndex: c
            }),
            t.initialized && K(t),
            t.emit("activeIndexChange"),
            t.emit("snapIndexChange"),
            (t.initialized || t.params.runCallbacksOnInit) && (n !== p && t.emit("realIndexChange"),
            t.emit("slideChange"))
        },
        updateClickedSlide: function(e, t) {
            const s = this
              , i = s.params;
            let o = e.closest(`.${i.slideClass}, swiper-slide`);
            !o && s.isElement && t && t.length > 1 && t.includes(e) && [...t.slice(t.indexOf(e) + 1, t.length)].forEach(e => {
                !o && e.matches && e.matches(`.${i.slideClass}, swiper-slide`) && (o = e)
            }
            );
            let r, n = !1;
            if (o)
                for (let e = 0; e < s.slides.length; e += 1)
                    if (s.slides[e] === o) {
                        n = !0,
                        r = e;
                        break
                    }
            if (!o || !n)
                return s.clickedSlide = void 0,
                void (s.clickedIndex = void 0);
            s.clickedSlide = o,
            s.virtual && s.params.virtual.enabled ? s.clickedIndex = parseInt(o.getAttribute("data-swiper-slide-index"), 10) : s.clickedIndex = r,
            i.slideToClickedSlide && void 0 !== s.clickedIndex && s.clickedIndex !== s.activeIndex && s.slideToClickedSlide()
        }
    };
    var Z = {
        getTranslate: function(e=(this.isHorizontal() ? "x" : "y")) {
            const {params: t, rtlTranslate: s, translate: i, wrapperEl: o} = this;
            if (t.virtualTranslate)
                return s ? -i : i;
            if (t.cssMode)
                return i;
            let r = E(o, e);
            return r += this.cssOverflowAdjustment(),
            s && (r = -r),
            r || 0
        },
        setTranslate: function(e, t) {
            const s = this
              , {rtlTranslate: i, params: o, wrapperEl: r, progress: n} = s;
            let a, l = 0, c = 0;
            s.isHorizontal() ? l = i ? -e : e : c = e,
            o.roundLengths && (l = Math.floor(l),
            c = Math.floor(c)),
            s.previousTranslate = s.translate,
            s.translate = s.isHorizontal() ? l : c,
            o.cssMode ? r[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -c : o.virtualTranslate || (s.isHorizontal() ? l -= s.cssOverflowAdjustment() : c -= s.cssOverflowAdjustment(),
            r.style.transform = `translate3d(${l}px, ${c}px, 0px)`);
            const d = s.maxTranslate() - s.minTranslate();
            a = 0 === d ? 0 : (e - s.minTranslate()) / d,
            a !== n && s.updateProgress(e),
            s.emit("setTranslate", s.translate, t)
        },
        minTranslate: function() {
            return -this.snapGrid[0]
        },
        maxTranslate: function() {
            return -this.snapGrid[this.snapGrid.length - 1]
        },
        translateTo: function(e=0, t=this.params.speed, s=!0, i=!0, o) {
            const r = this
              , {params: n, wrapperEl: a} = r;
            if (r.animating && n.preventInteractionOnTransition)
                return !1;
            const l = r.minTranslate()
              , c = r.maxTranslate();
            let d;
            if (d = i && e > l ? l : i && e < c ? c : e,
            r.updateProgress(d),
            n.cssMode) {
                const e = r.isHorizontal();
                if (0 === t)
                    a[e ? "scrollLeft" : "scrollTop"] = -d;
                else {
                    if (!r.support.smoothScroll)
                        return k({
                            swiper: r,
                            targetPosition: -d,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    a.scrollTo({
                        [e ? "left" : "top"]: -d,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            return 0 === t ? (r.setTransition(0),
            r.setTranslate(d),
            s && (r.emit("beforeTransitionStart", t, o),
            r.emit("transitionEnd"))) : (r.setTransition(t),
            r.setTranslate(d),
            s && (r.emit("beforeTransitionStart", t, o),
            r.emit("transitionStart")),
            r.animating || (r.animating = !0,
            r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                r.onTranslateToWrapperTransitionEnd = null,
                delete r.onTranslateToWrapperTransitionEnd,
                r.animating = !1,
                s && r.emit("transitionEnd"))
            }
            ),
            r.wrapperEl.addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd))),
            !0
        }
    };
    function Q({swiper: e, runCallbacks: t, direction: s, step: i}) {
        const {activeIndex: o, previousIndex: r} = e;
        let n = s;
        n || (n = o > r ? "next" : o < r ? "prev" : "reset"),
        e.emit(`transition${i}`),
        t && "reset" === n ? e.emit(`slideResetTransition${i}`) : t && o !== r && (e.emit(`slideChangeTransition${i}`),
        "next" === n ? e.emit(`slideNextTransition${i}`) : e.emit(`slidePrevTransition${i}`))
    }
    var ee = {
        slideTo: function(e=0, t, s=!0, i, o) {
            "string" == typeof e && (e = parseInt(e, 10));
            const r = this;
            let n = e;
            n < 0 && (n = 0);
            const {params: a, snapGrid: l, slidesGrid: c, previousIndex: d, activeIndex: u, rtlTranslate: p, wrapperEl: f, enabled: m} = r;
            if (!m && !i && !o || r.destroyed || r.animating && a.preventInteractionOnTransition)
                return !1;
            void 0 === t && (t = r.params.speed);
            const g = Math.min(r.params.slidesPerGroupSkip, n);
            let h = g + Math.floor((n - g) / r.params.slidesPerGroup);
            h >= l.length && (h = l.length - 1);
            const v = -l[h];
            if (a.normalizeSlideIndex)
                for (let e = 0; e < c.length; e += 1) {
                    const t = -Math.floor(100 * v)
                      , s = Math.floor(100 * c[e])
                      , i = Math.floor(100 * c[e + 1]);
                    void 0 !== c[e + 1] ? t >= s && t < i - (i - s) / 2 ? n = e : t >= s && t < i && (n = e + 1) : t >= s && (n = e)
                }
            if (r.initialized && n !== u) {
                if (!r.allowSlideNext && (p ? v > r.translate && v > r.minTranslate() : v < r.translate && v < r.minTranslate()))
                    return !1;
                if (!r.allowSlidePrev && v > r.translate && v > r.maxTranslate() && (u || 0) !== n)
                    return !1
            }
            let y;
            n !== (d || 0) && s && r.emit("beforeSlideChangeStart"),
            r.updateProgress(v),
            y = n > u ? "next" : n < u ? "prev" : "reset";
            const w = r.virtual && r.params.virtual.enabled;
            if (!(w && o) && (p && -v === r.translate || !p && v === r.translate))
                return r.updateActiveIndex(n),
                a.autoHeight && r.updateAutoHeight(),
                r.updateSlidesClasses(),
                "slide" !== a.effect && r.setTranslate(v),
                "reset" !== y && (r.transitionStart(s, y),
                r.transitionEnd(s, y)),
                !1;
            if (a.cssMode) {
                const e = r.isHorizontal()
                  , s = p ? v : -v;
                if (0 === t)
                    w && (r.wrapperEl.style.scrollSnapType = "none",
                    r._immediateVirtual = !0),
                    w && !r._cssModeVirtualInitialSet && r.params.initialSlide > 0 ? (r._cssModeVirtualInitialSet = !0,
                    requestAnimationFrame( () => {
                        f[e ? "scrollLeft" : "scrollTop"] = s
                    }
                    )) : f[e ? "scrollLeft" : "scrollTop"] = s,
                    w && requestAnimationFrame( () => {
                        r.wrapperEl.style.scrollSnapType = "",
                        r._immediateVirtual = !1
                    }
                    );
                else {
                    if (!r.support.smoothScroll)
                        return k({
                            swiper: r,
                            targetPosition: s,
                            side: e ? "left" : "top"
                        }),
                        !0;
                    f.scrollTo({
                        [e ? "left" : "top"]: s,
                        behavior: "smooth"
                    })
                }
                return !0
            }
            const b = N().isSafari;
            return w && !o && b && r.isElement && r.virtual.update(!1, !1, n),
            r.setTransition(t),
            r.setTranslate(v),
            r.updateActiveIndex(n),
            r.updateSlidesClasses(),
            r.emit("beforeTransitionStart", t, i),
            r.transitionStart(s, y),
            0 === t ? r.transitionEnd(s, y) : r.animating || (r.animating = !0,
            r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                r && !r.destroyed && e.target === this && (r.wrapperEl.removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                r.onSlideToWrapperTransitionEnd = null,
                delete r.onSlideToWrapperTransitionEnd,
                r.transitionEnd(s, y))
            }
            ),
            r.wrapperEl.addEventListener("transitionend", r.onSlideToWrapperTransitionEnd)),
            !0
        },
        slideToLoop: function(e=0, t, s=!0, i) {
            if ("string" == typeof e) {
                e = parseInt(e, 10)
            }
            const o = this;
            if (o.destroyed)
                return;
            void 0 === t && (t = o.params.speed);
            const r = o.grid && o.params.grid && o.params.grid.rows > 1;
            let n = e;
            if (o.params.loop)
                if (o.virtual && o.params.virtual.enabled)
                    n += o.virtual.slidesBefore;
                else {
                    let e;
                    if (r) {
                        const t = n * o.params.grid.rows;
                        e = o.slides.find(e => 1 * e.getAttribute("data-swiper-slide-index") === t).column
                    } else
                        e = o.getSlideIndexByData(n);
                    const t = r ? Math.ceil(o.slides.length / o.params.grid.rows) : o.slides.length
                      , {centeredSlides: s, slidesOffsetBefore: a, slidesOffsetAfter: l} = o.params
                      , c = s || !!a || !!l;
                    let d = o.params.slidesPerView;
                    "auto" === d ? d = o.slidesPerViewDynamic() : (d = Math.ceil(parseFloat(o.params.slidesPerView, 10)),
                    c && d % 2 == 0 && (d += 1));
                    let u = t - e < d;
                    if (c && (u = u || e < Math.ceil(d / 2)),
                    i && c && "auto" !== o.params.slidesPerView && !r && (u = !1),
                    u) {
                        const s = c ? e < o.activeIndex ? "prev" : "next" : e - o.activeIndex - 1 < o.params.slidesPerView ? "next" : "prev";
                        o.loopFix({
                            direction: s,
                            slideTo: !0,
                            activeSlideIndex: "next" === s ? e + 1 : e - t + 1,
                            slideRealIndex: "next" === s ? o.realIndex : void 0
                        })
                    }
                    if (r) {
                        const e = n * o.params.grid.rows;
                        n = o.slides.find(t => 1 * t.getAttribute("data-swiper-slide-index") === e).column
                    } else
                        n = o.getSlideIndexByData(n)
                }
            return requestAnimationFrame( () => {
                o.slideTo(n, t, s, i)
            }
            ),
            o
        },
        slideNext: function(e, t=!0, s) {
            const i = this
              , {enabled: o, params: r, animating: n} = i;
            if (!o || i.destroyed)
                return i;
            void 0 === e && (e = i.params.speed);
            let a = r.slidesPerGroup;
            "auto" === r.slidesPerView && 1 === r.slidesPerGroup && r.slidesPerGroupAuto && (a = Math.max(i.slidesPerViewDynamic("current", !0), 1));
            const l = i.activeIndex < r.slidesPerGroupSkip ? 1 : a
              , c = i.virtual && r.virtual.enabled;
            if (r.loop) {
                if (n && !c && r.loopPreventsSliding)
                    return !1;
                if (i.loopFix({
                    direction: "next"
                }),
                i._clientLeft = i.wrapperEl.clientLeft,
                i.activeIndex === i.slides.length - 1 && r.cssMode)
                    return requestAnimationFrame( () => {
                        i.slideTo(i.activeIndex + l, e, t, s)
                    }
                    ),
                    !0
            }
            return r.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + l, e, t, s)
        },
        slidePrev: function(e, t=!0, s) {
            const i = this
              , {params: o, snapGrid: r, slidesGrid: n, rtlTranslate: a, enabled: l, animating: c} = i;
            if (!l || i.destroyed)
                return i;
            void 0 === e && (e = i.params.speed);
            const d = i.virtual && o.virtual.enabled;
            if (o.loop) {
                if (c && !d && o.loopPreventsSliding)
                    return !1;
                i.loopFix({
                    direction: "prev"
                }),
                i._clientLeft = i.wrapperEl.clientLeft
            }
            function u(e) {
                return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
            }
            const p = u(a ? i.translate : -i.translate)
              , f = r.map(e => u(e))
              , m = o.freeMode && o.freeMode.enabled;
            let g = r[f.indexOf(p) - 1];
            if (void 0 === g && (o.cssMode || m)) {
                let e;
                r.forEach( (t, s) => {
                    p >= t && (e = s)
                }
                ),
                void 0 !== e && (g = m ? r[e] : r[e > 0 ? e - 1 : e])
            }
            let h = 0;
            if (void 0 !== g && (h = n.indexOf(g),
            h < 0 && (h = i.activeIndex - 1),
            "auto" === o.slidesPerView && 1 === o.slidesPerGroup && o.slidesPerGroupAuto && (h = h - i.slidesPerViewDynamic("previous", !0) + 1,
            h = Math.max(h, 0))),
            o.rewind && i.isBeginning) {
                const o = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
                return i.slideTo(o, e, t, s)
            }
            return o.loop && 0 === i.activeIndex && o.cssMode ? (requestAnimationFrame( () => {
                i.slideTo(h, e, t, s)
            }
            ),
            !0) : i.slideTo(h, e, t, s)
        },
        slideReset: function(e, t=!0, s) {
            const i = this;
            if (!i.destroyed)
                return void 0 === e && (e = i.params.speed),
                i.slideTo(i.activeIndex, e, t, s)
        },
        slideToClosest: function(e, t=!0, s, i=.5) {
            const o = this;
            if (o.destroyed)
                return;
            void 0 === e && (e = o.params.speed);
            let r = o.activeIndex;
            const n = Math.min(o.params.slidesPerGroupSkip, r)
              , a = n + Math.floor((r - n) / o.params.slidesPerGroup)
              , l = o.rtlTranslate ? o.translate : -o.translate;
            if (l >= o.snapGrid[a]) {
                const e = o.snapGrid[a];
                l - e > (o.snapGrid[a + 1] - e) * i && (r += o.params.slidesPerGroup)
            } else {
                const e = o.snapGrid[a - 1];
                l - e <= (o.snapGrid[a] - e) * i && (r -= o.params.slidesPerGroup)
            }
            return r = Math.max(r, 0),
            r = Math.min(r, o.slidesGrid.length - 1),
            o.slideTo(r, e, t, s)
        },
        slideToClickedSlide: function() {
            const e = this;
            if (e.destroyed)
                return;
            const {params: t, slidesEl: s} = e
              , i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
            let o, r = e.getSlideIndexWhenGrid(e.clickedIndex);
            const n = e.isElement ? "swiper-slide" : `.${t.slideClass}`
              , a = e.grid && e.params.grid && e.params.grid.rows > 1;
            if (t.loop) {
                if (e.animating)
                    return;
                o = parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"), 10),
                t.centeredSlides ? e.slideToLoop(o) : r > (a ? (e.slides.length - i) / 2 - (e.params.grid.rows - 1) : e.slides.length - i) ? (e.loopFix(),
                r = e.getSlideIndex(A(s, `${n}[data-swiper-slide-index="${o}"]`)[0]),
                _( () => {
                    e.slideTo(r)
                }
                )) : e.slideTo(r)
            } else
                e.slideTo(r)
        }
    };
    var te = {
        loopCreate: function(e, t) {
            const s = this
              , {params: i, slidesEl: o} = s;
            if (!i.loop || s.virtual && s.params.virtual.enabled)
                return;
            const r = () => {
                A(o, `.${i.slideClass}, swiper-slide`).forEach( (e, t) => {
                    e.setAttribute("data-swiper-slide-index", t)
                }
                )
            }
              , n = s.grid && i.grid && i.grid.rows > 1;
            i.loopAddBlankSlides && (i.slidesPerGroup > 1 || n) && ( () => {
                const e = A(o, `.${i.slideBlankClass}`);
                e.forEach(e => {
                    e.remove()
                }
                ),
                e.length > 0 && (s.recalcSlides(),
                s.updateSlides())
            }
            )();
            const a = i.slidesPerGroup * (n ? i.grid.rows : 1)
              , l = s.slides.length % a !== 0
              , c = n && s.slides.length % i.grid.rows !== 0
              , d = e => {
                for (let t = 0; t < e; t += 1) {
                    const e = s.isElement ? P("swiper-slide", [i.slideBlankClass]) : P("div", [i.slideClass, i.slideBlankClass]);
                    s.slidesEl.append(e)
                }
            }
            ;
            if (l) {
                if (i.loopAddBlankSlides) {
                    d(a - s.slides.length % a),
                    s.recalcSlides(),
                    s.updateSlides()
                } else
                    M();
                r()
            } else if (c) {
                if (i.loopAddBlankSlides) {
                    d(i.grid.rows - s.slides.length % i.grid.rows),
                    s.recalcSlides(),
                    s.updateSlides()
                } else
                    M();
                r()
            } else
                r();
            const u = i.centeredSlides || !!i.slidesOffsetBefore || !!i.slidesOffsetAfter;
            s.loopFix({
                slideRealIndex: e,
                direction: u ? void 0 : "next",
                initial: t
            })
        },
        loopFix: function({slideRealIndex: e, slideTo: t=!0, direction: s, setTranslate: i, activeSlideIndex: o, initial: r, byController: n, byMousewheel: a}={}) {
            const l = this;
            if (!l.params.loop)
                return;
            l.emit("beforeLoopFix");
            const {slides: c, allowSlidePrev: d, allowSlideNext: u, slidesEl: p, params: f} = l
              , {centeredSlides: m, slidesOffsetBefore: g, slidesOffsetAfter: h, initialSlide: v} = f
              , y = m || !!g || !!h;
            if (l.allowSlidePrev = !0,
            l.allowSlideNext = !0,
            l.virtual && f.virtual.enabled)
                return t && (y || 0 !== l.snapIndex ? y && l.snapIndex < f.slidesPerView ? l.slideTo(l.virtual.slides.length + l.snapIndex, 0, !1, !0) : l.snapIndex === l.snapGrid.length - 1 && l.slideTo(l.virtual.slidesBefore, 0, !1, !0) : l.slideTo(l.virtual.slides.length, 0, !1, !0)),
                l.allowSlidePrev = d,
                l.allowSlideNext = u,
                void l.emit("loopFix");
            let w = f.slidesPerView;
            "auto" === w ? w = l.slidesPerViewDynamic() : (w = Math.ceil(parseFloat(f.slidesPerView, 10)),
            y && w % 2 == 0 && (w += 1));
            const b = f.slidesPerGroupAuto ? w : f.slidesPerGroup;
            let _ = y ? Math.max(b, Math.ceil(w / 2)) : b;
            _ % b !== 0 && (_ += b - _ % b),
            _ += f.loopAdditionalSlides,
            l.loopedSlides = _;
            const S = l.grid && f.grid && f.grid.rows > 1;
            (c.length < w + _ || "cards" === l.params.effect && c.length < w + 2 * _ || S && "row" === f.grid.fill) && M();
            const E = []
              , T = []
              , L = S ? Math.ceil(c.length / f.grid.rows) : c.length
              , x = r && L - v < w && !y;
            let C = x ? v : l.activeIndex;
            void 0 === o ? o = l.getSlideIndex(c.find(e => e.classList.contains(f.slideActiveClass))) : C = o;
            const k = "next" === s || !s
              , q = "prev" === s || !s;
            let A = 0
              , P = 0;
            const I = (S ? c[o].column : o) + (y && void 0 === i ? -w / 2 + .5 : 0);
            if (I < _) {
                A = Math.max(_ - I, b);
                for (let e = 0; e < _ - I; e += 1) {
                    const t = e - Math.floor(e / L) * L;
                    if (S) {
                        const e = L - t - 1;
                        for (let t = c.length - 1; t >= 0; t -= 1)
                            c[t].column === e && E.push(t)
                    } else
                        E.push(L - t - 1)
                }
            } else if (I + w > L - _) {
                P = Math.max(I - (L - 2 * _), b),
                x && (P = Math.max(P, w - L + v + 1));
                for (let e = 0; e < P; e += 1) {
                    const t = e - Math.floor(e / L) * L;
                    S ? c.forEach( (e, s) => {
                        e.column === t && T.push(s)
                    }
                    ) : T.push(t)
                }
            }
            if (l.__preventObserver__ = !0,
            requestAnimationFrame( () => {
                l.__preventObserver__ = !1
            }
            ),
            "cards" === l.params.effect && c.length < w + 2 * _ && (T.includes(o) && T.splice(T.indexOf(o), 1),
            E.includes(o) && E.splice(E.indexOf(o), 1)),
            q && E.forEach(e => {
                c[e].swiperLoopMoveDOM = !0,
                p.prepend(c[e]),
                c[e].swiperLoopMoveDOM = !1
            }
            ),
            k && T.forEach(e => {
                c[e].swiperLoopMoveDOM = !0,
                p.append(c[e]),
                c[e].swiperLoopMoveDOM = !1
            }
            ),
            l.recalcSlides(),
            "auto" === f.slidesPerView ? l.updateSlides() : S && (E.length > 0 && q || T.length > 0 && k) && l.slides.forEach( (e, t) => {
                l.grid.updateSlide(t, e, l.slides)
            }
            ),
            f.watchSlidesProgress && l.updateSlidesOffset(),
            t)
                if (E.length > 0 && q) {
                    if (void 0 === e) {
                        const e = l.slidesGrid[C]
                          , t = l.slidesGrid[C + A] - e;
                        a ? l.setTranslate(l.translate - t) : (l.slideTo(C + Math.ceil(A), 0, !1, !0),
                        i && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t,
                        l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t))
                    } else if (i) {
                        const e = S ? E.length / f.grid.rows : E.length;
                        l.slideTo(l.activeIndex + e, 0, !1, !0),
                        l.touchEventsData.currentTranslate = l.translate
                    }
                } else if (T.length > 0 && k)
                    if (void 0 === e) {
                        const e = l.slidesGrid[C]
                          , t = l.slidesGrid[C - P] - e;
                        a ? l.setTranslate(l.translate - t) : (l.slideTo(C - P, 0, !1, !0),
                        i && (l.touchEventsData.startTranslate = l.touchEventsData.startTranslate - t,
                        l.touchEventsData.currentTranslate = l.touchEventsData.currentTranslate - t))
                    } else {
                        const e = S ? T.length / f.grid.rows : T.length;
                        l.slideTo(l.activeIndex - e, 0, !1, !0)
                    }
            if (l.allowSlidePrev = d,
            l.allowSlideNext = u,
            l.controller && l.controller.control && !n) {
                const r = {
                    slideRealIndex: e,
                    direction: s,
                    setTranslate: i,
                    activeSlideIndex: o,
                    byController: !0
                };
                Array.isArray(l.controller.control) ? l.controller.control.forEach(e => {
                    !e.destroyed && e.params.loop && e.loopFix({
                        ...r,
                        slideTo: e.params.slidesPerView === f.slidesPerView && t
                    })
                }
                ) : l.controller.control instanceof l.constructor && l.controller.control.params.loop && l.controller.control.loopFix({
                    ...r,
                    slideTo: l.controller.control.params.slidesPerView === f.slidesPerView && t
                })
            }
            l.emit("loopFix")
        },
        loopDestroy: function() {
            const e = this
              , {params: t, slidesEl: s} = e;
            if (!t.loop || !s || e.virtual && e.params.virtual.enabled)
                return;
            e.recalcSlides();
            const i = [];
            e.slides.forEach(e => {
                const t = void 0 === e.swiperSlideIndex ? 1 * e.getAttribute("data-swiper-slide-index") : e.swiperSlideIndex;
                i[t] = e
            }
            ),
            e.slides.forEach(e => {
                e.removeAttribute("data-swiper-slide-index")
            }
            ),
            i.forEach(e => {
                s.append(e)
            }
            ),
            e.recalcSlides(),
            e.slideTo(e.realIndex, 0)
        }
    };
    function se(e, t, s) {
        const i = b()
          , {params: o} = e
          , r = o.edgeSwipeDetection
          , n = o.edgeSwipeThreshold;
        return !r || !(s <= n || s >= i.innerWidth - n) || "prevent" === r && (t.preventDefault(),
        !0)
    }
    function ie(e) {
        const t = this
          , s = y();
        let i = e;
        i.originalEvent && (i = i.originalEvent);
        const o = t.touchEventsData;
        if ("pointerdown" === i.type) {
            if (null !== o.pointerId && o.pointerId !== i.pointerId)
                return;
            o.pointerId = i.pointerId
        } else
            "touchstart" === i.type && 1 === i.targetTouches.length && (o.touchId = i.targetTouches[0].identifier);
        if ("touchstart" === i.type)
            return void se(t, i, i.targetTouches[0].pageX);
        const {params: r, touches: n, enabled: a} = t;
        if (!a)
            return;
        if (!r.simulateTouch && "mouse" === i.pointerType)
            return;
        if (t.animating && r.preventInteractionOnTransition)
            return;
        !t.animating && r.cssMode && r.loop && t.loopFix();
        let l = i.target;
        if ("wrapper" === r.touchEventsTarget && !function(e, t) {
            const s = b();
            let i = t.contains(e);
            !i && s.HTMLSlotElement && t instanceof HTMLSlotElement && (i = [...t.assignedElements()].includes(e),
            i || (i = function(e, t) {
                const s = [t];
                for (; s.length > 0; ) {
                    const t = s.shift();
                    if (e === t)
                        return !0;
                    s.push(...t.children, ...t.shadowRoot ? t.shadowRoot.children : [], ...t.assignedElements ? t.assignedElements() : [])
                }
            }(e, t)));
            return i
        }(l, t.wrapperEl))
            return;
        if ("which"in i && 3 === i.which)
            return;
        if ("button"in i && i.button > 0)
            return;
        if (o.isTouched && o.isMoved)
            return;
        const c = !!r.noSwipingClass && "" !== r.noSwipingClass
          , d = i.composedPath ? i.composedPath() : i.path;
        c && i.target && i.target.shadowRoot && d && (l = d[0]);
        const u = r.noSwipingSelector ? r.noSwipingSelector : `.${r.noSwipingClass}`
          , p = !(!i.target || !i.target.shadowRoot);
        if (r.noSwiping && (p ? function(e, t=this) {
            return function t(s) {
                if (!s || s === y() || s === b())
                    return null;
                s.assignedSlot && (s = s.assignedSlot);
                const i = s.closest(e);
                return i || s.getRootNode ? i || t(s.getRootNode().host) : null
            }(t)
        }(u, l) : l.closest(u)))
            return void (t.allowClick = !0);
        if (r.swipeHandler && !l.closest(r.swipeHandler))
            return;
        n.currentX = i.pageX,
        n.currentY = i.pageY;
        const f = n.currentX
          , m = n.currentY;
        if (!se(t, i, f))
            return;
        Object.assign(o, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0
        }),
        n.startX = f,
        n.startY = m,
        o.touchStartTime = S(),
        t.allowClick = !0,
        t.updateSize(),
        t.swipeDirection = void 0,
        r.threshold > 0 && (o.allowThresholdMove = !1);
        let g = !0;
        l.matches(o.focusableElements) && (g = !1,
        "SELECT" === l.nodeName && (o.isTouched = !1)),
        s.activeElement && s.activeElement.matches(o.focusableElements) && s.activeElement !== l && ("mouse" === i.pointerType || "mouse" !== i.pointerType && !l.matches(o.focusableElements)) && s.activeElement.blur();
        const h = g && t.allowTouchMove && r.touchStartPreventDefault;
        !r.touchStartForcePreventDefault && !h || l.isContentEditable || i.preventDefault(),
        r.freeMode && r.freeMode.enabled && t.freeMode && t.animating && !r.cssMode && t.freeMode.onTouchStart(),
        t.emit("touchStart", i)
    }
    function oe(e) {
        const t = y()
          , s = this
          , i = s.touchEventsData
          , {params: o, touches: r, rtlTranslate: n, enabled: a} = s;
        if (!a)
            return;
        if (!o.simulateTouch && "mouse" === e.pointerType)
            return;
        let l, c = e;
        if (c.originalEvent && (c = c.originalEvent),
        "pointermove" === c.type) {
            if (null !== i.touchId)
                return;
            if (c.pointerId !== i.pointerId)
                return
        }
        if ("touchmove" === c.type) {
            if (l = [...c.changedTouches].find(e => e.identifier === i.touchId),
            !l || l.identifier !== i.touchId)
                return
        } else
            l = c;
        if (!i.isTouched)
            return void (i.startMoving && i.isScrolling && s.emit("touchMoveOpposite", c));
        const d = l.pageX
          , u = l.pageY;
        if (c.preventedByNestedSwiper)
            return r.startX = d,
            void (r.startY = u);
        if (!s.allowTouchMove)
            return c.target.matches(i.focusableElements) || (s.allowClick = !1),
            void (i.isTouched && (Object.assign(r, {
                startX: d,
                startY: u,
                currentX: d,
                currentY: u
            }),
            i.touchStartTime = S()));
        if (o.touchReleaseOnEdges && !o.loop)
            if (s.isVertical()) {
                if (u < r.startY && s.translate <= s.maxTranslate() || u > r.startY && s.translate >= s.minTranslate())
                    return i.isTouched = !1,
                    void (i.isMoved = !1)
            } else {
                if (n && (d > r.startX && -s.translate <= s.maxTranslate() || d < r.startX && -s.translate >= s.minTranslate()))
                    return;
                if (!n && (d < r.startX && s.translate <= s.maxTranslate() || d > r.startX && s.translate >= s.minTranslate()))
                    return
            }
        if (t.activeElement && t.activeElement.matches(i.focusableElements) && t.activeElement !== c.target && "mouse" !== c.pointerType && t.activeElement.blur(),
        t.activeElement && c.target === t.activeElement && c.target.matches(i.focusableElements))
            return i.isMoved = !0,
            void (s.allowClick = !1);
        i.allowTouchCallbacks && s.emit("touchMove", c),
        r.previousX = r.currentX,
        r.previousY = r.currentY,
        r.currentX = d,
        r.currentY = u;
        const p = r.currentX - r.startX
          , f = r.currentY - r.startY;
        if (s.params.threshold && Math.sqrt(p ** 2 + f ** 2) < s.params.threshold)
            return;
        if (void 0 === i.isScrolling) {
            let e;
            s.isHorizontal() && r.currentY === r.startY || s.isVertical() && r.currentX === r.startX ? i.isScrolling = !1 : p * p + f * f >= 25 && (e = 180 * Math.atan2(Math.abs(f), Math.abs(p)) / Math.PI,
            i.isScrolling = s.isHorizontal() ? e > o.touchAngle : 90 - e > o.touchAngle)
        }
        if (i.isScrolling && s.emit("touchMoveOpposite", c),
        void 0 === i.startMoving && (r.currentX === r.startX && r.currentY === r.startY || (i.startMoving = !0)),
        i.isScrolling || "touchmove" === c.type && i.preventTouchMoveFromPointerMove)
            return void (i.isTouched = !1);
        if (!i.startMoving)
            return;
        s.allowClick = !1,
        !o.cssMode && c.cancelable && c.preventDefault(),
        o.touchMoveStopPropagation && !o.nested && c.stopPropagation();
        let m = s.isHorizontal() ? p : f
          , g = s.isHorizontal() ? r.currentX - r.previousX : r.currentY - r.previousY;
        o.oneWayMovement && (m = Math.abs(m) * (n ? 1 : -1),
        g = Math.abs(g) * (n ? 1 : -1)),
        r.diff = m,
        m *= o.touchRatio,
        n && (m = -m,
        g = -g);
        const h = s.touchesDirection;
        s.swipeDirection = m > 0 ? "prev" : "next",
        s.touchesDirection = g > 0 ? "prev" : "next";
        const v = s.params.loop && !o.cssMode
          , w = "next" === s.touchesDirection && s.allowSlideNext || "prev" === s.touchesDirection && s.allowSlidePrev;
        if (!i.isMoved) {
            if (v && w && s.loopFix({
                direction: s.swipeDirection
            }),
            i.startTranslate = s.getTranslate(),
            s.setTransition(0),
            s.animating) {
                const e = new window.CustomEvent("transitionend",{
                    bubbles: !0,
                    cancelable: !0,
                    detail: {
                        bySwiperTouchMove: !0
                    }
                });
                s.wrapperEl.dispatchEvent(e)
            }
            i.allowMomentumBounce = !1,
            !o.grabCursor || !0 !== s.allowSlideNext && !0 !== s.allowSlidePrev || s.setGrabCursor(!0),
            s.emit("sliderFirstMove", c)
        }
        if ((new Date).getTime(),
        !1 !== o._loopSwapReset && i.isMoved && i.allowThresholdMove && h !== s.touchesDirection && v && w && Math.abs(m) >= 1)
            return Object.assign(r, {
                startX: d,
                startY: u,
                currentX: d,
                currentY: u,
                startTranslate: i.currentTranslate
            }),
            i.loopSwapReset = !0,
            void (i.startTranslate = i.currentTranslate);
        s.emit("sliderMove", c),
        i.isMoved = !0,
        i.currentTranslate = m + i.startTranslate;
        let b = !0
          , _ = o.resistanceRatio;
        if (o.touchReleaseOnEdges && (_ = 0),
        m > 0 ? (v && w && i.allowThresholdMove && i.currentTranslate > (o.centeredSlides ? s.minTranslate() - s.slidesSizesGrid[s.activeIndex + 1] - ("auto" !== o.slidesPerView && s.slides.length - o.slidesPerView >= 2 ? s.slidesSizesGrid[s.activeIndex + 1] + s.params.spaceBetween : 0) - s.params.spaceBetween : s.minTranslate()) && s.loopFix({
            direction: "prev",
            setTranslate: !0,
            activeSlideIndex: 0
        }),
        i.currentTranslate > s.minTranslate() && (b = !1,
        o.resistance && (i.currentTranslate = s.minTranslate() - 1 + (-s.minTranslate() + i.startTranslate + m) ** _))) : m < 0 && (v && w && i.allowThresholdMove && i.currentTranslate < (o.centeredSlides ? s.maxTranslate() + s.slidesSizesGrid[s.slidesSizesGrid.length - 1] + s.params.spaceBetween + ("auto" !== o.slidesPerView && s.slides.length - o.slidesPerView >= 2 ? s.slidesSizesGrid[s.slidesSizesGrid.length - 1] + s.params.spaceBetween : 0) : s.maxTranslate()) && s.loopFix({
            direction: "next",
            setTranslate: !0,
            activeSlideIndex: s.slides.length - ("auto" === o.slidesPerView ? s.slidesPerViewDynamic() : Math.ceil(parseFloat(o.slidesPerView, 10)))
        }),
        i.currentTranslate < s.maxTranslate() && (b = !1,
        o.resistance && (i.currentTranslate = s.maxTranslate() + 1 - (s.maxTranslate() - i.startTranslate - m) ** _))),
        b && (c.preventedByNestedSwiper = !0),
        !s.allowSlideNext && "next" === s.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
        !s.allowSlidePrev && "prev" === s.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
        s.allowSlidePrev || s.allowSlideNext || (i.currentTranslate = i.startTranslate),
        o.threshold > 0) {
            if (!(Math.abs(m) > o.threshold || i.allowThresholdMove))
                return void (i.currentTranslate = i.startTranslate);
            if (!i.allowThresholdMove)
                return i.allowThresholdMove = !0,
                r.startX = r.currentX,
                r.startY = r.currentY,
                i.currentTranslate = i.startTranslate,
                void (r.diff = s.isHorizontal() ? r.currentX - r.startX : r.currentY - r.startY)
        }
        o.followFinger && !o.cssMode && ((o.freeMode && o.freeMode.enabled && s.freeMode || o.watchSlidesProgress) && (s.updateActiveIndex(),
        s.updateSlidesClasses()),
        o.freeMode && o.freeMode.enabled && s.freeMode && s.freeMode.onTouchMove(),
        s.updateProgress(i.currentTranslate),
        s.setTranslate(i.currentTranslate))
    }
    function re(e) {
        const t = this
          , s = t.touchEventsData;
        let i, o = e;
        o.originalEvent && (o = o.originalEvent);
        if ("touchend" === o.type || "touchcancel" === o.type) {
            if (i = [...o.changedTouches].find(e => e.identifier === s.touchId),
            !i || i.identifier !== s.touchId)
                return
        } else {
            if (null !== s.touchId)
                return;
            if (o.pointerId !== s.pointerId)
                return;
            i = o
        }
        if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(o.type)) {
            if (!(["pointercancel", "contextmenu"].includes(o.type) && (t.browser.isSafari || t.browser.isWebView)))
                return
        }
        s.pointerId = null,
        s.touchId = null;
        const {params: r, touches: n, rtlTranslate: a, slidesGrid: l, enabled: c} = t;
        if (!c)
            return;
        if (!r.simulateTouch && "mouse" === o.pointerType)
            return;
        if (s.allowTouchCallbacks && t.emit("touchEnd", o),
        s.allowTouchCallbacks = !1,
        !s.isTouched)
            return s.isMoved && r.grabCursor && t.setGrabCursor(!1),
            s.isMoved = !1,
            void (s.startMoving = !1);
        r.grabCursor && s.isMoved && s.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
        const d = S()
          , u = d - s.touchStartTime;
        if (t.allowClick) {
            const e = o.path || o.composedPath && o.composedPath();
            t.updateClickedSlide(e && e[0] || o.target, e),
            t.emit("tap click", o),
            u < 300 && d - s.lastClickTime < 300 && t.emit("doubleTap doubleClick", o)
        }
        if (s.lastClickTime = S(),
        _( () => {
            t.destroyed || (t.allowClick = !0)
        }
        ),
        !s.isTouched || !s.isMoved || !t.swipeDirection || 0 === n.diff && !s.loopSwapReset || s.currentTranslate === s.startTranslate && !s.loopSwapReset)
            return s.isTouched = !1,
            s.isMoved = !1,
            void (s.startMoving = !1);
        let p;
        if (s.isTouched = !1,
        s.isMoved = !1,
        s.startMoving = !1,
        p = r.followFinger ? a ? t.translate : -t.translate : -s.currentTranslate,
        r.cssMode)
            return;
        if (r.freeMode && r.freeMode.enabled)
            return void t.freeMode.onTouchEnd({
                currentPos: p
            });
        const f = p >= -t.maxTranslate() && !t.params.loop;
        let m = 0
          , g = t.slidesSizesGrid[0];
        for (let e = 0; e < l.length; e += e < r.slidesPerGroupSkip ? 1 : r.slidesPerGroup) {
            const t = e < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
            void 0 !== l[e + t] ? (f || p >= l[e] && p < l[e + t]) && (m = e,
            g = l[e + t] - l[e]) : (f || p >= l[e]) && (m = e,
            g = l[l.length - 1] - l[l.length - 2])
        }
        let h = null
          , v = null;
        r.rewind && (t.isBeginning ? v = r.virtual && r.virtual.enabled && t.virtual ? t.virtual.slides.length - 1 : t.slides.length - 1 : t.isEnd && (h = 0));
        const y = (p - l[m]) / g
          , w = m < r.slidesPerGroupSkip - 1 ? 1 : r.slidesPerGroup;
        if (u > r.longSwipesMs) {
            if (!r.longSwipes)
                return void t.slideTo(t.activeIndex);
            "next" === t.swipeDirection && (y >= r.longSwipesRatio ? t.slideTo(r.rewind && t.isEnd ? h : m + w) : t.slideTo(m)),
            "prev" === t.swipeDirection && (y > 1 - r.longSwipesRatio ? t.slideTo(m + w) : null !== v && y < 0 && Math.abs(y) > r.longSwipesRatio ? t.slideTo(v) : t.slideTo(m))
        } else {
            if (!r.shortSwipes)
                return void t.slideTo(t.activeIndex);
            t.navigation && (o.target === t.navigation.nextEl || o.target === t.navigation.prevEl) ? o.target === t.navigation.nextEl ? t.slideTo(m + w) : t.slideTo(m) : ("next" === t.swipeDirection && t.slideTo(null !== h ? h : m + w),
            "prev" === t.swipeDirection && t.slideTo(null !== v ? v : m))
        }
    }
    function ne() {
        const e = this
          , {params: t, el: s} = e;
        if (s && 0 === s.offsetWidth)
            return;
        t.breakpoints && e.setBreakpoint();
        const {allowSlideNext: i, allowSlidePrev: o, snapGrid: r} = e
          , n = e.virtual && e.params.virtual.enabled;
        e.allowSlideNext = !0,
        e.allowSlidePrev = !0,
        e.updateSize(),
        e.updateSlides(),
        e.updateSlidesClasses();
        const a = n && t.loop;
        !("auto" === t.slidesPerView || t.slidesPerView > 1) || !e.isEnd || e.isBeginning || e.params.centeredSlides || a ? e.params.loop && !n ? e.slideToLoop(e.realIndex, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0) : e.slideTo(e.slides.length - 1, 0, !1, !0),
        e.autoplay && e.autoplay.running && e.autoplay.paused && (clearTimeout(e.autoplay.resizeTimeout),
        e.autoplay.resizeTimeout = setTimeout( () => {
            e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.resume()
        }
        , 500)),
        e.allowSlidePrev = o,
        e.allowSlideNext = i,
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
    }
    function ae(e) {
        const t = this;
        t.enabled && (t.allowClick || (t.params.preventClicks && e.preventDefault(),
        t.params.preventClicksPropagation && t.animating && (e.stopPropagation(),
        e.stopImmediatePropagation())))
    }
    function le() {
        const e = this
          , {wrapperEl: t, rtlTranslate: s, enabled: i} = e;
        if (!i)
            return;
        let o;
        e.previousTranslate = e.translate,
        e.isHorizontal() ? e.translate = -t.scrollLeft : e.translate = -t.scrollTop,
        0 === e.translate && (e.translate = 0),
        e.updateActiveIndex(),
        e.updateSlidesClasses();
        const r = e.maxTranslate() - e.minTranslate();
        o = 0 === r ? 0 : (e.translate - e.minTranslate()) / r,
        o !== e.progress && e.updateProgress(s ? -e.translate : e.translate),
        e.emit("setTranslate", e.translate, !1)
    }
    function ce(e) {
        const t = this;
        X(t, e.target),
        t.params.cssMode || "auto" !== t.params.slidesPerView && !t.params.autoHeight || t.update()
    }
    function de() {
        const e = this;
        e.documentTouchHandlerProceeded || (e.documentTouchHandlerProceeded = !0,
        e.params.touchReleaseOnEdges && (e.el.style.touchAction = "auto"))
    }
    const ue = (e, t) => {
        const s = y()
          , {params: i, el: o, wrapperEl: r, device: n} = e
          , a = !!i.nested
          , l = "on" === t ? "addEventListener" : "removeEventListener"
          , c = t;
        o && "string" != typeof o && (s[l]("touchstart", e.onDocumentTouchStart, {
            passive: !1,
            capture: a
        }),
        o[l]("touchstart", e.onTouchStart, {
            passive: !1
        }),
        o[l]("pointerdown", e.onTouchStart, {
            passive: !1
        }),
        s[l]("touchmove", e.onTouchMove, {
            passive: !1,
            capture: a
        }),
        s[l]("pointermove", e.onTouchMove, {
            passive: !1,
            capture: a
        }),
        s[l]("touchend", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointerup", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointercancel", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("touchcancel", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointerout", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("pointerleave", e.onTouchEnd, {
            passive: !0
        }),
        s[l]("contextmenu", e.onTouchEnd, {
            passive: !0
        }),
        (i.preventClicks || i.preventClicksPropagation) && o[l]("click", e.onClick, !0),
        i.cssMode && r[l]("scroll", e.onScroll),
        i.updateOnWindowResize ? e[c](n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", ne, !0) : e[c]("observerUpdate", ne, !0),
        o[l]("load", e.onLoad, {
            capture: !0
        }))
    }
    ;
    const pe = (e, t) => e.grid && t.grid && t.grid.rows > 1;
    var fe = {
        setBreakpoint: function() {
            const e = this
              , {realIndex: t, initialized: s, params: i, el: o} = e
              , r = i.breakpoints;
            if (!r || r && 0 === Object.keys(r).length)
                return;
            const n = y()
              , a = "window" !== i.breakpointsBase && i.breakpointsBase ? "container" : i.breakpointsBase
              , l = ["window", "container"].includes(i.breakpointsBase) || !i.breakpointsBase ? e.el : n.querySelector(i.breakpointsBase)
              , c = e.getBreakpoint(r, a, l);
            if (!c || e.currentBreakpoint === c)
                return;
            const d = (c in r ? r[c] : void 0) || e.originalParams
              , u = pe(e, i)
              , p = pe(e, d)
              , f = e.params.grabCursor
              , m = d.grabCursor
              , g = i.enabled;
            u && !p ? (o.classList.remove(`${i.containerModifierClass}grid`, `${i.containerModifierClass}grid-column`),
            e.emitContainerClasses()) : !u && p && (o.classList.add(`${i.containerModifierClass}grid`),
            (d.grid.fill && "column" === d.grid.fill || !d.grid.fill && "column" === i.grid.fill) && o.classList.add(`${i.containerModifierClass}grid-column`),
            e.emitContainerClasses()),
            f && !m ? e.unsetGrabCursor() : !f && m && e.setGrabCursor(),
            ["navigation", "pagination", "scrollbar"].forEach(t => {
                if (void 0 === d[t])
                    return;
                const s = i[t] && i[t].enabled
                  , o = d[t] && d[t].enabled;
                s && !o && e[t].disable(),
                !s && o && e[t].enable()
            }
            );
            const h = d.direction && d.direction !== i.direction
              , v = i.loop && (d.slidesPerView !== i.slidesPerView || h)
              , w = i.loop;
            h && s && e.changeDirection(),
            x(e.params, d);
            const b = e.params.enabled
              , _ = e.params.loop;
            Object.assign(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev
            }),
            g && !b ? e.disable() : !g && b && e.enable(),
            e.currentBreakpoint = c,
            e.emit("_beforeBreakpoint", d),
            s && (v ? (e.loopDestroy(),
            e.loopCreate(t),
            e.updateSlides()) : !w && _ ? (e.loopCreate(t),
            e.updateSlides()) : w && !_ && e.loopDestroy()),
            e.emit("breakpoint", d)
        },
        getBreakpoint: function(e, t="window", s) {
            if (!e || "container" === t && !s)
                return;
            let i = !1;
            const o = b()
              , r = "window" === t ? o.innerHeight : s.clientHeight
              , n = Object.keys(e).map(e => {
                if ("string" == typeof e && 0 === e.indexOf("@")) {
                    const t = parseFloat(e.substr(1));
                    return {
                        value: r * t,
                        point: e
                    }
                }
                return {
                    value: e,
                    point: e
                }
            }
            );
            n.sort( (e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
            for (let e = 0; e < n.length; e += 1) {
                const {point: r, value: a} = n[e];
                "window" === t ? o.matchMedia(`(min-width: ${a}px)`).matches && (i = r) : a <= s.clientWidth && (i = r)
            }
            return i || "max"
        }
    };
    var me = {
        init: !0,
        direction: "horizontal",
        oneWayMovement: !1,
        swiperElementNodeName: "SWIPER-CONTAINER",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        eventsPrefix: "swiper",
        enabled: !0,
        focusableElements: "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        snapToSlideEdge: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 5,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        loop: !1,
        loopAddBlankSlides: !0,
        loopAdditionalSlides: 0,
        loopPreventsSliding: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-blank",
        slideActiveClass: "swiper-slide-active",
        slideVisibleClass: "swiper-slide-visible",
        slideFullyVisibleClass: "swiper-slide-fully-visible",
        slideNextClass: "swiper-slide-next",
        slidePrevClass: "swiper-slide-prev",
        wrapperClass: "swiper-wrapper",
        lazyPreloaderClass: "swiper-lazy-preloader",
        lazyPreloadPrevNext: 0,
        runCallbacksOnInit: !0,
        _emitClasses: !1
    };
    function ge(e, t) {
        return function(s={}) {
            const i = Object.keys(s)[0]
              , o = s[i];
            "object" == typeof o && null !== o ? (!0 === e[i] && (e[i] = {
                enabled: !0
            }),
            "navigation" === i && e[i] && e[i].enabled && !e[i].prevEl && !e[i].nextEl && (e[i].auto = !0),
            ["pagination", "scrollbar"].indexOf(i) >= 0 && e[i] && e[i].enabled && !e[i].el && (e[i].auto = !0),
            i in e && "enabled"in o ? ("object" != typeof e[i] || "enabled"in e[i] || (e[i].enabled = !0),
            e[i] || (e[i] = {
                enabled: !1
            }),
            x(t, s)) : x(t, s)) : x(t, s)
        }
    }
    const he = {
        eventsEmitter: R,
        update: J,
        translate: Z,
        transition: {
            setTransition: function(e, t) {
                const s = this;
                s.params.cssMode || (s.wrapperEl.style.transitionDuration = `${e}ms`,
                s.wrapperEl.style.transitionDelay = 0 === e ? "0ms" : ""),
                s.emit("setTransition", e, t)
            },
            transitionStart: function(e=!0, t) {
                const s = this
                  , {params: i} = s;
                i.cssMode || (i.autoHeight && s.updateAutoHeight(),
                Q({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "Start"
                }))
            },
            transitionEnd: function(e=!0, t) {
                const s = this
                  , {params: i} = s;
                s.animating = !1,
                i.cssMode || (s.setTransition(0),
                Q({
                    swiper: s,
                    runCallbacks: e,
                    direction: t,
                    step: "End"
                }))
            }
        },
        slide: ee,
        loop: te,
        grabCursor: {
            setGrabCursor: function(e) {
                const t = this;
                if (!t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)
                    return;
                const s = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl;
                t.isElement && (t.__preventObserver__ = !0),
                s.style.cursor = "move",
                s.style.cursor = e ? "grabbing" : "grab",
                t.isElement && requestAnimationFrame( () => {
                    t.__preventObserver__ = !1
                }
                )
            },
            unsetGrabCursor: function() {
                const e = this;
                e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.isElement && (e.__preventObserver__ = !0),
                e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "",
                e.isElement && requestAnimationFrame( () => {
                    e.__preventObserver__ = !1
                }
                ))
            }
        },
        events: {
            attachEvents: function() {
                const e = this
                  , {params: t} = e;
                e.onTouchStart = ie.bind(e),
                e.onTouchMove = oe.bind(e),
                e.onTouchEnd = re.bind(e),
                e.onDocumentTouchStart = de.bind(e),
                t.cssMode && (e.onScroll = le.bind(e)),
                e.onClick = ae.bind(e),
                e.onLoad = ce.bind(e),
                ue(e, "on")
            },
            detachEvents: function() {
                ue(this, "off")
            }
        },
        breakpoints: fe,
        checkOverflow: {
            checkOverflow: function() {
                const e = this
                  , {isLocked: t, params: s} = e
                  , {slidesOffsetBefore: i} = s;
                if (i) {
                    const t = e.slides.length - 1
                      , s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
                    e.isLocked = e.size > s
                } else
                    e.isLocked = 1 === e.snapGrid.length;
                !0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked),
                !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked),
                t && t !== e.isLocked && (e.isEnd = !1),
                t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock")
            }
        },
        classes: {
            addClasses: function() {
                const e = this
                  , {classNames: t, params: s, rtl: i, el: o, device: r} = e
                  , n = function(e, t) {
                    const s = [];
                    return e.forEach(e => {
                        "object" == typeof e ? Object.keys(e).forEach(i => {
                            e[i] && s.push(t + i)
                        }
                        ) : "string" == typeof e && s.push(t + e)
                    }
                    ),
                    s
                }(["initialized", s.direction, {
                    "free-mode": e.params.freeMode && s.freeMode.enabled
                }, {
                    autoheight: s.autoHeight
                }, {
                    rtl: i
                }, {
                    grid: s.grid && s.grid.rows > 1
                }, {
                    "grid-column": s.grid && s.grid.rows > 1 && "column" === s.grid.fill
                }, {
                    android: r.android
                }, {
                    ios: r.ios
                }, {
                    "css-mode": s.cssMode
                }, {
                    centered: s.cssMode && s.centeredSlides
                }, {
                    "watch-progress": s.watchSlidesProgress
                }], s.containerModifierClass);
                t.push(...n),
                o.classList.add(...t),
                e.emitContainerClasses()
            },
            removeClasses: function() {
                const {el: e, classNames: t} = this;
                e && "string" != typeof e && (e.classList.remove(...t),
                this.emitContainerClasses())
            }
        }
    }
      , ve = {};
    class ye {
        constructor(...e) {
            let t, s;
            1 === e.length && e[0].constructor && "Object" === Object.prototype.toString.call(e[0]).slice(8, -1) ? s = e[0] : [t,s] = e,
            s || (s = {}),
            s = x({}, s),
            t && !s.el && (s.el = t);
            const i = y();
            if (s.el && "string" == typeof s.el && i.querySelectorAll(s.el).length > 1) {
                const e = [];
                return i.querySelectorAll(s.el).forEach(t => {
                    const i = x({}, s, {
                        el: t
                    });
                    e.push(new ye(i))
                }
                ),
                e
            }
            const o = this;
            o.__swiper__ = !0,
            o.support = F(),
            o.device = H({
                userAgent: s.userAgent
            }),
            o.browser = N(),
            o.eventsListeners = {},
            o.eventsAnyListeners = [],
            o.modules = [...o.__modules__],
            s.modules && Array.isArray(s.modules) && s.modules.forEach(e => {
                "function" == typeof e && o.modules.indexOf(e) < 0 && o.modules.push(e)
            }
            );
            const r = {};
            o.modules.forEach(e => {
                e({
                    params: s,
                    swiper: o,
                    extendParams: ge(s, r),
                    on: o.on.bind(o),
                    once: o.once.bind(o),
                    off: o.off.bind(o),
                    emit: o.emit.bind(o)
                })
            }
            );
            const n = x({}, me, r);
            return o.params = x({}, n, ve, s),
            o.originalParams = x({}, o.params),
            o.passedParams = x({}, s),
            o.params && o.params.on && Object.keys(o.params.on).forEach(e => {
                o.on(e, o.params.on[e])
            }
            ),
            o.params && o.params.onAny && o.onAny(o.params.onAny),
            Object.assign(o, {
                enabled: o.params.enabled,
                el: t,
                classNames: [],
                slides: [],
                slidesGrid: [],
                snapGrid: [],
                slidesSizesGrid: [],
                isHorizontal: () => "horizontal" === o.params.direction,
                isVertical: () => "vertical" === o.params.direction,
                activeIndex: 0,
                realIndex: 0,
                isBeginning: !0,
                isEnd: !1,
                translate: 0,
                previousTranslate: 0,
                progress: 0,
                velocity: 0,
                animating: !1,
                cssOverflowAdjustment() {
                    return Math.trunc(this.translate / 2 ** 23) * 2 ** 23
                },
                allowSlideNext: o.params.allowSlideNext,
                allowSlidePrev: o.params.allowSlidePrev,
                touchEventsData: {
                    isTouched: void 0,
                    isMoved: void 0,
                    allowTouchCallbacks: void 0,
                    touchStartTime: void 0,
                    isScrolling: void 0,
                    currentTranslate: void 0,
                    startTranslate: void 0,
                    allowThresholdMove: void 0,
                    focusableElements: o.params.focusableElements,
                    lastClickTime: 0,
                    clickTimeout: void 0,
                    velocities: [],
                    allowMomentumBounce: void 0,
                    startMoving: void 0,
                    pointerId: null,
                    touchId: null
                },
                allowClick: !0,
                allowTouchMove: o.params.allowTouchMove,
                touches: {
                    startX: 0,
                    startY: 0,
                    currentX: 0,
                    currentY: 0,
                    diff: 0
                },
                imagesToLoad: [],
                imagesLoaded: 0
            }),
            o.emit("_swiper"),
            o.params.init && o.init(),
            o
        }
        getDirectionLabel(e) {
            return this.isHorizontal() ? e : {
                width: "height",
                "margin-top": "margin-left",
                "margin-bottom ": "margin-right",
                "margin-left": "margin-top",
                "margin-right": "margin-bottom",
                "padding-left": "padding-top",
                "padding-right": "padding-bottom",
                marginRight: "marginBottom"
            }[e]
        }
        getSlideIndex(e) {
            const {slidesEl: t, params: s} = this
              , i = O(A(t, `.${s.slideClass}, swiper-slide`)[0]);
            return O(e) - i
        }
        getSlideIndexByData(e) {
            return this.getSlideIndex(this.slides.find(t => 1 * t.getAttribute("data-swiper-slide-index") === e))
        }
        getSlideIndexWhenGrid(e) {
            return this.grid && this.params.grid && this.params.grid.rows > 1 && ("column" === this.params.grid.fill ? e = Math.floor(e / this.params.grid.rows) : "row" === this.params.grid.fill && (e %= Math.ceil(this.slides.length / this.params.grid.rows))),
            e
        }
        recalcSlides() {
            const {slidesEl: e, params: t} = this;
            this.slides = A(e, `.${t.slideClass}, swiper-slide`)
        }
        enable() {
            const e = this;
            e.enabled || (e.enabled = !0,
            e.params.grabCursor && e.setGrabCursor(),
            e.emit("enable"))
        }
        disable() {
            const e = this;
            e.enabled && (e.enabled = !1,
            e.params.grabCursor && e.unsetGrabCursor(),
            e.emit("disable"))
        }
        setProgress(e, t) {
            const s = this;
            e = Math.min(Math.max(e, 0), 1);
            const i = s.minTranslate()
              , o = (s.maxTranslate() - i) * e + i;
            s.translateTo(o, void 0 === t ? 0 : t),
            s.updateActiveIndex(),
            s.updateSlidesClasses()
        }
        emitContainerClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = e.el.className.split(" ").filter(t => 0 === t.indexOf("swiper") || 0 === t.indexOf(e.params.containerModifierClass));
            e.emit("_containerClasses", t.join(" "))
        }
        getSlideClasses(e) {
            const t = this;
            return t.destroyed ? "" : e.className.split(" ").filter(e => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)).join(" ")
        }
        emitSlidesClasses() {
            const e = this;
            if (!e.params._emitClasses || !e.el)
                return;
            const t = [];
            e.slides.forEach(s => {
                const i = e.getSlideClasses(s);
                t.push({
                    slideEl: s,
                    classNames: i
                }),
                e.emit("_slideClass", s, i)
            }
            ),
            e.emit("_slideClasses", t)
        }
        slidesPerViewDynamic(e="current", t=!1) {
            const {params: s, slides: i, slidesGrid: o, slidesSizesGrid: r, size: n, activeIndex: a} = this;
            let l = 1;
            if ("number" == typeof s.slidesPerView)
                return s.slidesPerView;
            if (s.centeredSlides) {
                let e, t = i[a] ? Math.ceil(i[a].swiperSlideSize) : 0;
                for (let s = a + 1; s < i.length; s += 1)
                    i[s] && !e && (t += Math.ceil(i[s].swiperSlideSize),
                    l += 1,
                    t > n && (e = !0));
                for (let s = a - 1; s >= 0; s -= 1)
                    i[s] && !e && (t += i[s].swiperSlideSize,
                    l += 1,
                    t > n && (e = !0))
            } else if ("current" === e)
                for (let e = a + 1; e < i.length; e += 1) {
                    (t ? o[e] + r[e] - o[a] < n : o[e] - o[a] < n) && (l += 1)
                }
            else
                for (let e = a - 1; e >= 0; e -= 1) {
                    o[a] - o[e] < n && (l += 1)
                }
            return l
        }
        update() {
            const e = this;
            if (!e || e.destroyed)
                return;
            const {snapGrid: t, params: s} = e;
            function i() {
                const t = e.rtlTranslate ? -1 * e.translate : e.translate
                  , s = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                e.setTranslate(s),
                e.updateActiveIndex(),
                e.updateSlidesClasses()
            }
            let o;
            if (s.breakpoints && e.setBreakpoint(),
            [...e.el.querySelectorAll('[loading="lazy"]')].forEach(t => {
                t.complete && X(e, t)
            }
            ),
            e.updateSize(),
            e.updateSlides(),
            e.updateProgress(),
            e.updateSlidesClasses(),
            s.freeMode && s.freeMode.enabled && !s.cssMode)
                i(),
                s.autoHeight && e.updateAutoHeight();
            else {
                if (("auto" === s.slidesPerView || s.slidesPerView > 1) && e.isEnd && !s.centeredSlides) {
                    const t = e.virtual && s.virtual.enabled ? e.virtual.slides : e.slides;
                    o = e.slideTo(t.length - 1, 0, !1, !0)
                } else
                    o = e.slideTo(e.activeIndex, 0, !1, !0);
                o || i()
            }
            s.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
            e.emit("update")
        }
        changeDirection(e, t=!0) {
            const s = this
              , i = s.params.direction;
            return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
            e === i || "horizontal" !== e && "vertical" !== e || (s.el.classList.remove(`${s.params.containerModifierClass}${i}`),
            s.el.classList.add(`${s.params.containerModifierClass}${e}`),
            s.emitContainerClasses(),
            s.params.direction = e,
            s.slides.forEach(t => {
                "vertical" === e ? t.style.width = "" : t.style.height = ""
            }
            ),
            s.emit("changeDirection"),
            t && s.update()),
            s
        }
        changeLanguageDirection(e) {
            const t = this;
            t.rtl && "rtl" === e || !t.rtl && "ltr" === e || (t.rtl = "rtl" === e,
            t.rtlTranslate = "horizontal" === t.params.direction && t.rtl,
            t.rtl ? (t.el.classList.add(`${t.params.containerModifierClass}rtl`),
            t.el.dir = "rtl") : (t.el.classList.remove(`${t.params.containerModifierClass}rtl`),
            t.el.dir = "ltr"),
            t.update())
        }
        mount(e) {
            const t = this;
            if (t.mounted)
                return !0;
            let s = e || t.params.el;
            if ("string" == typeof s && (s = document.querySelector(s)),
            !s)
                return !1;
            s.swiper = t,
            s.parentNode && s.parentNode.host && s.parentNode.host.nodeName === t.params.swiperElementNodeName.toUpperCase() && (t.isElement = !0);
            const i = () => `.${(t.params.wrapperClass || "").trim().split(" ").join(".")}`;
            let o = ( () => {
                if (s && s.shadowRoot && s.shadowRoot.querySelector) {
                    return s.shadowRoot.querySelector(i())
                }
                return A(s, i())[0]
            }
            )();
            return !o && t.params.createElements && (o = P("div", t.params.wrapperClass),
            s.append(o),
            A(s, `.${t.params.slideClass}`).forEach(e => {
                o.append(e)
            }
            )),
            Object.assign(t, {
                el: s,
                wrapperEl: o,
                slidesEl: t.isElement && !s.parentNode.host.slideSlots ? s.parentNode.host : o,
                hostEl: t.isElement ? s.parentNode.host : s,
                mounted: !0,
                rtl: "rtl" === s.dir.toLowerCase() || "rtl" === I(s, "direction"),
                rtlTranslate: "horizontal" === t.params.direction && ("rtl" === s.dir.toLowerCase() || "rtl" === I(s, "direction")),
                wrongRTL: "-webkit-box" === I(o, "display")
            }),
            !0
        }
        init(e) {
            const t = this;
            if (t.initialized)
                return t;
            if (!1 === t.mount(e))
                return t;
            t.emit("beforeInit"),
            t.params.breakpoints && t.setBreakpoint(),
            t.addClasses(),
            t.updateSize(),
            t.updateSlides(),
            t.params.watchOverflow && t.checkOverflow(),
            t.params.grabCursor && t.enabled && t.setGrabCursor(),
            t.params.loop && t.virtual && t.params.virtual.enabled ? t.slideTo(t.params.initialSlide + t.virtual.slidesBefore, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0),
            t.params.loop && t.loopCreate(void 0, !0),
            t.attachEvents();
            const s = [...t.el.querySelectorAll('[loading="lazy"]')];
            return t.isElement && s.push(...t.hostEl.querySelectorAll('[loading="lazy"]')),
            s.forEach(e => {
                e.complete ? X(t, e) : e.addEventListener("load", e => {
                    X(t, e.target)
                }
                )
            }
            ),
            K(t),
            t.initialized = !0,
            K(t),
            t.emit("init"),
            t.emit("afterInit"),
            t
        }
        destroy(e=!0, t=!0) {
            const s = this
              , {params: i, el: o, wrapperEl: r, slides: n} = s;
            return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
            s.initialized = !1,
            s.detachEvents(),
            i.loop && s.loopDestroy(),
            t && (s.removeClasses(),
            o && "string" != typeof o && o.removeAttribute("style"),
            r && r.removeAttribute("style"),
            n && n.length && n.forEach(e => {
                e.classList.remove(i.slideVisibleClass, i.slideFullyVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass),
                e.removeAttribute("style"),
                e.removeAttribute("data-swiper-slide-index")
            }
            )),
            s.emit("destroy"),
            Object.keys(s.eventsListeners).forEach(e => {
                s.off(e)
            }
            ),
            !1 !== e && (s.el && "string" != typeof s.el && (s.el.swiper = null),
            function(e) {
                const t = e;
                Object.keys(t).forEach(e => {
                    try {
                        t[e] = null
                    } catch (e) {}
                    try {
                        delete t[e]
                    } catch (e) {}
                }
                )
            }(s)),
            s.destroyed = !0),
            null
        }
        static extendDefaults(e) {
            x(ve, e)
        }
        static get extendedDefaults() {
            return ve
        }
        static get defaults() {
            return me
        }
        static installModule(e) {
            ye.prototype.__modules__ || (ye.prototype.__modules__ = []);
            const t = ye.prototype.__modules__;
            "function" == typeof e && t.indexOf(e) < 0 && t.push(e)
        }
        static use(e) {
            return Array.isArray(e) ? (e.forEach(e => ye.installModule(e)),
            ye) : (ye.installModule(e),
            ye)
        }
    }
    function we(e, t, s, i) {
        return e.params.createElements && Object.keys(i).forEach(o => {
            if (!s[o] && !0 === s.auto) {
                let r = A(e.el, `.${i[o]}`)[0];
                r || (r = P("div", i[o]),
                r.className = i[o],
                e.el.append(r)),
                s[o] = r,
                t[o] = r
            }
        }
        ),
        s
    }
    Object.keys(he).forEach(e => {
        Object.keys(he[e]).forEach(t => {
            ye.prototype[t] = he[e][t]
        }
        )
    }
    ),
    ye.use([function({swiper: e, on: t, emit: s}) {
        const i = b();
        let o = null
          , r = null;
        const n = () => {
            e && !e.destroyed && e.initialized && (s("beforeResize"),
            s("resize"))
        }
          , a = () => {
            e && !e.destroyed && e.initialized && s("orientationchange")
        }
        ;
        t("init", () => {
            e.params.resizeObserver && void 0 !== i.ResizeObserver ? e && !e.destroyed && e.initialized && (o = new ResizeObserver(t => {
                r = i.requestAnimationFrame( () => {
                    const {width: s, height: i} = e;
                    let o = s
                      , r = i;
                    t.forEach( ({contentBoxSize: t, contentRect: s, target: i}) => {
                        i && i !== e.el || (o = s ? s.width : (t[0] || t).inlineSize,
                        r = s ? s.height : (t[0] || t).blockSize)
                    }
                    ),
                    o === s && r === i || n()
                }
                )
            }
            ),
            o.observe(e.el)) : (i.addEventListener("resize", n),
            i.addEventListener("orientationchange", a))
        }
        ),
        t("destroy", () => {
            r && i.cancelAnimationFrame(r),
            o && o.unobserve && e.el && (o.unobserve(e.el),
            o = null),
            i.removeEventListener("resize", n),
            i.removeEventListener("orientationchange", a)
        }
        )
    }
    , function({swiper: e, extendParams: t, on: s, emit: i}) {
        const o = []
          , r = b()
          , n = (t, s={}) => {
            const n = new (r.MutationObserver || r.WebkitMutationObserver)(t => {
                if (e.__preventObserver__)
                    return;
                if (1 === t.length)
                    return void i("observerUpdate", t[0]);
                const s = function() {
                    i("observerUpdate", t[0])
                };
                r.requestAnimationFrame ? r.requestAnimationFrame(s) : r.setTimeout(s, 0)
            }
            );
            n.observe(t, {
                attributes: void 0 === s.attributes || s.attributes,
                childList: e.isElement || (void 0 === s.childList || s).childList,
                characterData: void 0 === s.characterData || s.characterData
            }),
            o.push(n)
        }
        ;
        t({
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        }),
        s("init", () => {
            if (e.params.observer) {
                if (e.params.observeParents) {
                    const t = z(e.hostEl);
                    for (let e = 0; e < t.length; e += 1)
                        n(t[e])
                }
                n(e.hostEl, {
                    childList: e.params.observeSlideChildren
                }),
                n(e.wrapperEl, {
                    attributes: !1
                })
            }
        }
        ),
        s("destroy", () => {
            o.forEach(e => {
                e.disconnect()
            }
            ),
            o.splice(0, o.length)
        }
        )
    }
    ]);
    const be = '<svg class="swiper-navigation-icon" width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.38296 20.0762C0.111788 19.805 0.111788 19.3654 0.38296 19.0942L9.19758 10.2796L0.38296 1.46497C0.111788 1.19379 0.111788 0.754138 0.38296 0.482966C0.654131 0.211794 1.09379 0.211794 1.36496 0.482966L10.4341 9.55214C10.8359 9.9539 10.8359 10.6053 10.4341 11.007L1.36496 20.0762C1.09379 20.3474 0.654131 20.3474 0.38296 20.0762Z" fill="currentColor"/></svg>';
    function _e({swiper: e, extendParams: t, on: s, emit: i}) {
        function o(t) {
            let s;
            return t && "string" == typeof t && e.isElement && (s = e.el.querySelector(t) || e.hostEl.querySelector(t),
            s) ? s : (t && ("string" == typeof t && (s = [...document.querySelectorAll(t)]),
            e.params.uniqueNavElements && "string" == typeof t && s && s.length > 1 && 1 === e.el.querySelectorAll(t).length ? s = e.el.querySelector(t) : s && 1 === s.length && (s = s[0])),
            t && !s ? t : s)
        }
        function r(t, s) {
            const i = e.params.navigation;
            (t = B(t)).forEach(t => {
                t && (t.classList[s ? "add" : "remove"](...i.disabledClass.split(" ")),
                "BUTTON" === t.tagName && (t.disabled = s),
                e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](i.lockClass))
            }
            )
        }
        function n() {
            const {nextEl: t, prevEl: s} = e.navigation;
            if (e.params.loop)
                return r(s, !1),
                void r(t, !1);
            r(s, e.isBeginning && !e.params.rewind),
            r(t, e.isEnd && !e.params.rewind)
        }
        function a(t) {
            t.preventDefault(),
            (!e.isBeginning || e.params.loop || e.params.rewind) && (e.slidePrev(),
            i("navigationPrev"))
        }
        function l(t) {
            t.preventDefault(),
            (!e.isEnd || e.params.loop || e.params.rewind) && (e.slideNext(),
            i("navigationNext"))
        }
        function c() {
            const t = e.params.navigation;
            if (e.params.navigation = we(e, e.originalParams.navigation, e.params.navigation, {
                nextEl: "swiper-button-next",
                prevEl: "swiper-button-prev"
            }),
            !t.nextEl && !t.prevEl)
                return;
            let s = o(t.nextEl)
              , i = o(t.prevEl);
            Object.assign(e.navigation, {
                nextEl: s,
                prevEl: i
            }),
            s = B(s),
            i = B(i);
            const r = (s, i) => {
                if (s) {
                    if (t.addIcons && s.matches(".swiper-button-next,.swiper-button-prev") && !s.querySelector("svg")) {
                        const e = document.createElement("div");
                        D(e, be),
                        s.appendChild(e.querySelector("svg")),
                        e.remove()
                    }
                    s.addEventListener("click", "next" === i ? l : a)
                }
                !e.enabled && s && s.classList.add(...t.lockClass.split(" "))
            }
            ;
            s.forEach(e => r(e, "next")),
            i.forEach(e => r(e, "prev"))
        }
        function d() {
            let {nextEl: t, prevEl: s} = e.navigation;
            t = B(t),
            s = B(s);
            const i = (t, s) => {
                t.removeEventListener("click", "next" === s ? l : a),
                t.classList.remove(...e.params.navigation.disabledClass.split(" "))
            }
            ;
            t.forEach(e => i(e, "next")),
            s.forEach(e => i(e, "prev"))
        }
        t({
            navigation: {
                nextEl: null,
                prevEl: null,
                addIcons: !0,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock",
                navigationDisabledClass: "swiper-navigation-disabled"
            }
        }),
        e.navigation = {
            nextEl: null,
            prevEl: null,
            arrowSvg: be
        },
        s("init", () => {
            !1 === e.params.navigation.enabled ? u() : (c(),
            n())
        }
        ),
        s("toEdge fromEdge lock unlock", () => {
            n()
        }
        ),
        s("destroy", () => {
            d()
        }
        ),
        s("enable disable", () => {
            let {nextEl: t, prevEl: s} = e.navigation;
            t = B(t),
            s = B(s),
            e.enabled ? n() : [...t, ...s].filter(e => !!e).forEach(t => t.classList.add(e.params.navigation.lockClass))
        }
        ),
        s("click", (t, s) => {
            let {nextEl: o, prevEl: r} = e.navigation;
            o = B(o),
            r = B(r);
            const n = s.target;
            let a = r.includes(n) || o.includes(n);
            if (e.isElement && !a) {
                const e = s.path || s.composedPath && s.composedPath();
                e && (a = e.find(e => o.includes(e) || r.includes(e)))
            }
            if (e.params.navigation.hideOnClick && !a) {
                if (e.pagination && e.params.pagination && e.params.pagination.clickable && (e.pagination.el === n || e.pagination.el.contains(n)))
                    return;
                let t;
                o.length ? t = o[0].classList.contains(e.params.navigation.hiddenClass) : r.length && (t = r[0].classList.contains(e.params.navigation.hiddenClass)),
                i(!0 === t ? "navigationShow" : "navigationHide"),
                [...o, ...r].filter(e => !!e).forEach(t => t.classList.toggle(e.params.navigation.hiddenClass))
            }
        }
        );
        const u = () => {
            e.el.classList.add(...e.params.navigation.navigationDisabledClass.split(" ")),
            d()
        }
        ;
        Object.assign(e.navigation, {
            enable: () => {
                e.el.classList.remove(...e.params.navigation.navigationDisabledClass.split(" ")),
                c(),
                n()
            }
            ,
            disable: u,
            update: n,
            init: c,
            destroy: d
        })
    }
    function Se(e="") {
        return `.${e.trim().replace(/([\.:!+\/()[\]#>~*^$|=,'"@{}\\])/g, "\\$1").replace(/ /g, ".")}`
    }
    function Ee({swiper: e, extendParams: t, on: s, emit: i}) {
        const o = "swiper-pagination";
        let r;
        t({
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: e => e,
                formatFractionTotal: e => e,
                bulletClass: `${o}-bullet`,
                bulletActiveClass: `${o}-bullet-active`,
                modifierClass: `${o}-`,
                currentClass: `${o}-current`,
                totalClass: `${o}-total`,
                hiddenClass: `${o}-hidden`,
                progressbarFillClass: `${o}-progressbar-fill`,
                progressbarOppositeClass: `${o}-progressbar-opposite`,
                clickableClass: `${o}-clickable`,
                lockClass: `${o}-lock`,
                horizontalClass: `${o}-horizontal`,
                verticalClass: `${o}-vertical`,
                paginationDisabledClass: `${o}-disabled`
            }
        }),
        e.pagination = {
            el: null,
            bullets: []
        };
        let n = 0;
        function a() {
            return !e.params.pagination.el || !e.pagination.el || Array.isArray(e.pagination.el) && 0 === e.pagination.el.length
        }
        function l(t, s) {
            const {bulletActiveClass: i} = e.params.pagination;
            t && (t = t[("prev" === s ? "previous" : "next") + "ElementSibling"]) && (t.classList.add(`${i}-${s}`),
            (t = t[("prev" === s ? "previous" : "next") + "ElementSibling"]) && t.classList.add(`${i}-${s}-${s}`))
        }
        function c(t) {
            const s = t.target.closest(Se(e.params.pagination.bulletClass));
            if (!s)
                return;
            t.preventDefault();
            const i = O(s) * e.params.slidesPerGroup;
            if (e.params.loop) {
                if (e.realIndex === i)
                    return;
                const t = (o = e.realIndex,
                r = i,
                n = e.slides.length,
                (r %= n) === 1 + (o %= n) ? "next" : r === o - 1 ? "previous" : void 0);
                "next" === t ? e.slideNext() : "previous" === t ? e.slidePrev() : e.slideToLoop(i)
            } else
                e.slideTo(i);
            var o, r, n
        }
        function d() {
            const t = e.rtl
              , s = e.params.pagination;
            if (a())
                return;
            let o, c, d = e.pagination.el;
            d = B(d);
            const u = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length
              , p = e.params.loop ? Math.ceil(u / e.params.slidesPerGroup) : e.snapGrid.length;
            if (e.params.loop ? (c = e.previousRealIndex || 0,
            o = e.params.slidesPerGroup > 1 ? Math.floor(e.realIndex / e.params.slidesPerGroup) : e.realIndex) : void 0 !== e.snapIndex ? (o = e.snapIndex,
            c = e.previousSnapIndex) : (c = e.previousIndex || 0,
            o = e.activeIndex || 0),
            "bullets" === s.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
                const i = e.pagination.bullets;
                let a, u, p;
                if (s.dynamicBullets && (r = j(i[0], e.isHorizontal() ? "width" : "height", !0),
                d.forEach(t => {
                    t.style[e.isHorizontal() ? "width" : "height"] = r * (s.dynamicMainBullets + 4) + "px"
                }
                ),
                s.dynamicMainBullets > 1 && void 0 !== c && (n += o - (c || 0),
                n > s.dynamicMainBullets - 1 ? n = s.dynamicMainBullets - 1 : n < 0 && (n = 0)),
                a = Math.max(o - n, 0),
                u = a + (Math.min(i.length, s.dynamicMainBullets) - 1),
                p = (u + a) / 2),
                i.forEach(e => {
                    const t = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map(e => `${s.bulletActiveClass}${e}`)].map(e => "string" == typeof e && e.includes(" ") ? e.split(" ") : e).flat();
                    e.classList.remove(...t)
                }
                ),
                d.length > 1)
                    i.forEach(t => {
                        const i = O(t);
                        i === o ? t.classList.add(...s.bulletActiveClass.split(" ")) : e.isElement && t.setAttribute("part", "bullet"),
                        s.dynamicBullets && (i >= a && i <= u && t.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),
                        i === a && l(t, "prev"),
                        i === u && l(t, "next"))
                    }
                    );
                else {
                    const t = i[o];
                    if (t && t.classList.add(...s.bulletActiveClass.split(" ")),
                    e.isElement && i.forEach( (e, t) => {
                        e.setAttribute("part", t === o ? "bullet-active" : "bullet")
                    }
                    ),
                    s.dynamicBullets) {
                        const e = i[a]
                          , t = i[u];
                        for (let e = a; e <= u; e += 1)
                            i[e] && i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));
                        l(e, "prev"),
                        l(t, "next")
                    }
                }
                if (s.dynamicBullets) {
                    const o = Math.min(i.length, s.dynamicMainBullets + 4)
                      , n = (r * o - r) / 2 - p * r
                      , a = t ? "right" : "left";
                    i.forEach(t => {
                        t.style[e.isHorizontal() ? a : "top"] = `${n}px`
                    }
                    )
                }
            }
            d.forEach( (t, r) => {
                if ("fraction" === s.type && (t.querySelectorAll(Se(s.currentClass)).forEach(e => {
                    e.textContent = s.formatFractionCurrent(o + 1)
                }
                ),
                t.querySelectorAll(Se(s.totalClass)).forEach(e => {
                    e.textContent = s.formatFractionTotal(p)
                }
                )),
                "progressbar" === s.type) {
                    let i;
                    i = s.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
                    const r = (o + 1) / p;
                    let n = 1
                      , a = 1;
                    "horizontal" === i ? n = r : a = r,
                    t.querySelectorAll(Se(s.progressbarFillClass)).forEach(t => {
                        t.style.transform = `translate3d(0,0,0) scaleX(${n}) scaleY(${a})`,
                        t.style.transitionDuration = `${e.params.speed}ms`
                    }
                    )
                }
                "custom" === s.type && s.renderCustom ? (D(t, s.renderCustom(e, o + 1, p)),
                0 === r && i("paginationRender", t)) : (0 === r && i("paginationRender", t),
                i("paginationUpdate", t)),
                e.params.watchOverflow && e.enabled && t.classList[e.isLocked ? "add" : "remove"](s.lockClass)
            }
            )
        }
        function u() {
            const t = e.params.pagination;
            if (a())
                return;
            const s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.grid && e.params.grid.rows > 1 ? e.slides.length / Math.ceil(e.params.grid.rows) : e.slides.length;
            let o = e.pagination.el;
            o = B(o);
            let r = "";
            if ("bullets" === t.type) {
                let i = e.params.loop ? Math.ceil(s / e.params.slidesPerGroup) : e.snapGrid.length;
                e.params.freeMode && e.params.freeMode.enabled && i > s && (i = s);
                for (let s = 0; s < i; s += 1)
                    t.renderBullet ? r += t.renderBullet.call(e, s, t.bulletClass) : r += `<${t.bulletElement} ${e.isElement ? 'part="bullet"' : ""} class="${t.bulletClass}"></${t.bulletElement}>`
            }
            "fraction" === t.type && (r = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
            "progressbar" === t.type && (r = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : `<span class="${t.progressbarFillClass}"></span>`),
            e.pagination.bullets = [],
            o.forEach(s => {
                "custom" !== t.type && D(s, r || ""),
                "bullets" === t.type && e.pagination.bullets.push(...s.querySelectorAll(Se(t.bulletClass)))
            }
            ),
            "custom" !== t.type && i("paginationRender", o[0])
        }
        function p() {
            e.params.pagination = we(e, e.originalParams.pagination, e.params.pagination, {
                el: "swiper-pagination"
            });
            const t = e.params.pagination;
            if (!t.el)
                return;
            let s;
            "string" == typeof t.el && e.isElement && (s = e.el.querySelector(t.el)),
            s || "string" != typeof t.el || (s = [...document.querySelectorAll(t.el)]),
            s || (s = t.el),
            s && 0 !== s.length && (e.params.uniqueNavElements && "string" == typeof t.el && Array.isArray(s) && s.length > 1 && (s = [...e.el.querySelectorAll(t.el)],
            s.length > 1 && (s = s.find(t => z(t, ".swiper")[0] === e.el))),
            Array.isArray(s) && 1 === s.length && (s = s[0]),
            Object.assign(e.pagination, {
                el: s
            }),
            s = B(s),
            s.forEach(s => {
                "bullets" === t.type && t.clickable && s.classList.add(...(t.clickableClass || "").split(" ")),
                s.classList.add(t.modifierClass + t.type),
                s.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass),
                "bullets" === t.type && t.dynamicBullets && (s.classList.add(`${t.modifierClass}${t.type}-dynamic`),
                n = 0,
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type && t.progressbarOpposite && s.classList.add(t.progressbarOppositeClass),
                t.clickable && s.addEventListener("click", c),
                e.enabled || s.classList.add(t.lockClass)
            }
            ))
        }
        function f() {
            const t = e.params.pagination;
            if (a())
                return;
            let s = e.pagination.el;
            s && (s = B(s),
            s.forEach(s => {
                s.classList.remove(t.hiddenClass),
                s.classList.remove(t.modifierClass + t.type),
                s.classList.remove(e.isHorizontal() ? t.horizontalClass : t.verticalClass),
                t.clickable && (s.classList.remove(...(t.clickableClass || "").split(" ")),
                s.removeEventListener("click", c))
            }
            )),
            e.pagination.bullets && e.pagination.bullets.forEach(e => e.classList.remove(...t.bulletActiveClass.split(" ")))
        }
        s("changeDirection", () => {
            if (!e.pagination || !e.pagination.el)
                return;
            const t = e.params.pagination;
            let {el: s} = e.pagination;
            s = B(s),
            s.forEach(s => {
                s.classList.remove(t.horizontalClass, t.verticalClass),
                s.classList.add(e.isHorizontal() ? t.horizontalClass : t.verticalClass)
            }
            )
        }
        ),
        s("init", () => {
            !1 === e.params.pagination.enabled ? m() : (p(),
            u(),
            d())
        }
        ),
        s("activeIndexChange", () => {
            void 0 === e.snapIndex && d()
        }
        ),
        s("snapIndexChange", () => {
            d()
        }
        ),
        s("snapGridLengthChange", () => {
            u(),
            d()
        }
        ),
        s("destroy", () => {
            f()
        }
        ),
        s("enable disable", () => {
            let {el: t} = e.pagination;
            t && (t = B(t),
            t.forEach(t => t.classList[e.enabled ? "remove" : "add"](e.params.pagination.lockClass)))
        }
        ),
        s("lock unlock", () => {
            d()
        }
        ),
        s("click", (t, s) => {
            const o = s.target
              , r = B(e.pagination.el);
            if (e.params.pagination.el && e.params.pagination.hideOnClick && r && r.length > 0 && !o.classList.contains(e.params.pagination.bulletClass)) {
                if (e.navigation && (e.navigation.nextEl && o === e.navigation.nextEl || e.navigation.prevEl && o === e.navigation.prevEl))
                    return;
                const t = r[0].classList.contains(e.params.pagination.hiddenClass);
                i(!0 === t ? "paginationShow" : "paginationHide"),
                r.forEach(t => t.classList.toggle(e.params.pagination.hiddenClass))
            }
        }
        );
        const m = () => {
            e.el.classList.add(e.params.pagination.paginationDisabledClass);
            let {el: t} = e.pagination;
            t && (t = B(t),
            t.forEach(t => t.classList.add(e.params.pagination.paginationDisabledClass))),
            f()
        }
        ;
        Object.assign(e.pagination, {
            enable: () => {
                e.el.classList.remove(e.params.pagination.paginationDisabledClass);
                let {el: t} = e.pagination;
                t && (t = B(t),
                t.forEach(t => t.classList.remove(e.params.pagination.paginationDisabledClass))),
                p(),
                u(),
                d()
            }
            ,
            disable: m,
            render: u,
            update: d,
            init: p,
            destroy: f
        })
    }
    function Te(e, t) {
        const s = q(t);
        return s !== t && (s.style.backfaceVisibility = "hidden",
        s.style["-webkit-backface-visibility"] = "hidden"),
        s
    }
    function Le({swiper: e, duration: t, transformElements: s, allSlides: i}) {
        const {activeIndex: o} = e;
        if (e.params.virtualTranslate && 0 !== t) {
            let t, r = !1;
            t = i ? s : s.filter(t => {
                const s = t.classList.contains("swiper-slide-transform") ? (t => {
                    if (!t.parentElement)
                        return e.slides.find(e => e.shadowRoot && e.shadowRoot === t.parentNode);
                    return t.parentElement
                }
                )(t) : t;
                return e.getSlideIndex(s) === o
            }
            ),
            t.forEach(t => {
                !function(e, t) {
                    t && e.addEventListener("transitionend", function s(i) {
                        i.target === e && (t.call(e, i),
                        e.removeEventListener("transitionend", s))
                    })
                }(t, () => {
                    if (r)
                        return;
                    if (!e || e.destroyed)
                        return;
                    r = !0,
                    e.animating = !1;
                    const t = new window.CustomEvent("transitionend",{
                        bubbles: !0,
                        cancelable: !0
                    });
                    e.wrapperEl.dispatchEvent(t)
                }
                )
            }
            )
        }
    }
    function xe({swiper: e, extendParams: t, on: s}) {
        t({
            fadeEffect: {
                crossFade: !1
            }
        });
        !function(e) {
            const {effect: t, swiper: s, on: i, setTranslate: o, setTransition: r, overwriteParams: n, perspective: a, recreateShadows: l, getEffectParams: c} = e;
            let d;
            i("beforeInit", () => {
                if (s.params.effect !== t)
                    return;
                s.classNames.push(`${s.params.containerModifierClass}${t}`),
                a && a() && s.classNames.push(`${s.params.containerModifierClass}3d`);
                const e = n ? n() : {};
                Object.assign(s.params, e),
                Object.assign(s.originalParams, e)
            }
            ),
            i("setTranslate _virtualUpdated", () => {
                s.params.effect === t && o()
            }
            ),
            i("setTransition", (e, i) => {
                s.params.effect === t && r(i)
            }
            ),
            i("transitionEnd", () => {
                if (s.params.effect === t && l) {
                    if (!c || !c().slideShadows)
                        return;
                    s.slides.forEach(e => {
                        e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(e => e.remove())
                    }
                    ),
                    l()
                }
            }
            ),
            i("virtualUpdate", () => {
                s.params.effect === t && (s.slides.length || (d = !0),
                requestAnimationFrame( () => {
                    d && s.slides && s.slides.length && (o(),
                    d = !1)
                }
                ))
            }
            )
        }({
            effect: "fade",
            swiper: e,
            on: s,
            setTranslate: () => {
                const {slides: t} = e;
                e.params.fadeEffect;
                for (let s = 0; s < t.length; s += 1) {
                    const t = e.slides[s];
                    let i = -t.swiperSlideOffset;
                    e.params.virtualTranslate || (i -= e.translate);
                    let o = 0;
                    e.isHorizontal() || (o = i,
                    i = 0);
                    const r = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(t.progress), 0) : 1 + Math.min(Math.max(t.progress, -1), 0)
                      , n = Te(0, t);
                    n.style.opacity = r,
                    n.style.transform = `translate3d(${i}px, ${o}px, 0px)`
                }
            }
            ,
            setTransition: t => {
                const s = e.slides.map(e => q(e));
                s.forEach(e => {
                    e.style.transitionDuration = `${t}ms`
                }
                ),
                Le({
                    swiper: e,
                    duration: t,
                    transformElements: s,
                    allSlides: !0
                })
            }
            ,
            overwriteParams: () => ({
                slidesPerView: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !e.params.cssMode
            })
        })
    }
    let Ce = [];
    function ke() {
        qe();
        const e = document.querySelectorAll(".pm-gallery.swiper");
        e.length && e.forEach(function(e) {
            const t = new ye(e,{
                modules: [_e, Ee],
                slidesPerView: 1,
                spaceBetween: 0,
                loop: !1,
                navigation: {
                    nextEl: e.querySelector(".swiper-button-next"),
                    prevEl: e.querySelector(".swiper-button-prev")
                },
                pagination: {
                    el: e.querySelector(".swiper-pagination"),
                    type: "fraction"
                },
                keyboard: {
                    enabled: !0
                },
                a11y: {
                    enabled: !0
                }
            });
            Ce.push(t)
        })
    }
    function qe() {
        Ce.forEach(function(e) {
            try {
                e.destroy(!0, !0)
            } catch (e) {}
        }),
        Ce = []
    }
    let Ae = !1;
    function Me() {
        if (Ae)
            return;
        if (!document.querySelectorAll("model-viewer").length)
            return;
        const e = window.OvaneConfig && OvaneConfig.assets ? OvaneConfig.assets.modelViewerUrl : "";
        if (!e)
            return;
        const t = document.createElement("script");
        t.type = "module",
        t.src = e,
        document.head.appendChild(t),
        Ae = !0
    }
    let Pe = null;
    function Ie() {
        const e = document.querySelectorAll(".jkd-lazy:not(.is-loaded)");
        e.length && (Pe = c(e, function(e) {
            !function(e) {
                const t = e.getAttribute("data-src")
                  , s = e.getAttribute("data-srcset")
                  , i = e.getAttribute("data-sizes");
                s && e.setAttribute("srcset", s),
                i && e.setAttribute("sizes", i),
                t && e.setAttribute("src", t),
                e.addEventListener("load", function() {
                    e.style.transition = "filter 0.6s ease",
                    e.classList.add("is-loaded"),
                    setTimeout(function() {
                        e.style.transition = ""
                    }, 650)
                }, {
                    once: !0
                }),
                e.removeAttribute("data-src"),
                e.removeAttribute("data-srcset"),
                e.removeAttribute("data-sizes")
            }(e.target)
        }, {
            threshold: .01,
            rootMargin: "300px 0px"
        }))
    }
    let Oe = null;
    function ze() {
        je();
        const e = document.querySelector(".blog-carousel-swiper");
        e && (Oe = new ye(e,{
            modules: [_e, Ee],
            slidesPerView: 1.15,
            spaceBetween: 16,
            speed: 500,
            grabCursor: !0,
            breakpoints: {
                641: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24
                }
            },
            navigation: {
                prevEl: ".blog-carousel-nav__btn--prev",
                nextEl: ".blog-carousel-nav__btn--next"
            },
            pagination: {
                el: ".blog-carousel-nav__fraction",
                type: "fraction",
                formatFractionCurrent: function(e) {
                    return String(e).padStart(2, "0")
                },
                formatFractionTotal: function(e) {
                    return String(e).padStart(2, "0")
                }
            }
        }))
    }
    function je() {
        Oe && (Oe.destroy(!0, !1),
        Oe = null)
    }
    let Be = null;
    function De() {
        Ge();
        const e = document.querySelector(".portfolio-carousel-swiper");
        e && (Be = new ye(e,{
            modules: [_e, Ee],
            slidesPerView: 1.15,
            spaceBetween: 16,
            speed: 500,
            grabCursor: !0,
            breakpoints: {
                641: {
                    slidesPerView: 1.5,
                    spaceBetween: 20
                },
                1024: {
                    slidesPerView: 2.2,
                    spaceBetween: 24
                }
            },
            navigation: {
                prevEl: ".portfolio-carousel-nav__btn--prev",
                nextEl: ".portfolio-carousel-nav__btn--next"
            },
            pagination: {
                el: ".portfolio-carousel-nav__fraction",
                type: "fraction",
                formatFractionCurrent: function(e) {
                    return String(e).padStart(2, "0")
                },
                formatFractionTotal: function(e) {
                    return String(e).padStart(2, "0")
                }
            }
        }))
    }
    function Ge() {
        Be && (Be.destroy(!0, !1),
        Be = null)
    }
    function Ve(e, t) {
        return {
            trigger: e,
            start: t || "top 85%",
            once: !0
        }
    }
    function $e(e, t) {
        return {
            trigger: e,
            start: "top bottom",
            end: "bottom top",
            scrub: void 0 === t || t
        }
    }
    function Fe() {
        if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger)
            return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        if (window.innerWidth < 768)
            return;
        const e = document.querySelector(".hero-section__inner");
        if (e) {
            const t = e.parentElement;
            t && gsap.to(e, {
                y: -80,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: t,
                    start: "top top",
                    end: "60% top",
                    scrub: !0
                }
            })
        }
        document.querySelectorAll(".blog-archive-hero__inner, .portfolio-archive-hero__inner, .contact-header__inner, .page-hero__inner").forEach(function(e) {
            const t = e.parentElement;
            t && gsap.to(e, {
                y: -60,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: t,
                    start: "top top",
                    end: "bottom top",
                    scrub: !0
                }
            })
        })
    }
    function He() {
        if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger)
            return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        if (window.innerWidth < 768)
            return;
        const e = document.querySelector(".project-hero-image__img");
        e && gsap.fromTo(e, {
            yPercent: -4
        }, {
            yPercent: 4,
            ease: "none",
            scrollTrigger: $e(e.closest(".project-hero-image"))
        });
        document.querySelectorAll('.sp-cover__hero[style*="background-image"], .sp-cinematic__hero[style*="background-image"]').forEach(function(e) {
            gsap.fromTo(e, {
                backgroundPositionY: "30%"
            }, {
                backgroundPositionY: "70%",
                ease: "none",
                scrollTrigger: {
                    trigger: e,
                    start: "top top",
                    end: "bottom top",
                    scrub: !0
                }
            })
        });
        const t = document.querySelector(".sp-showcase__hero-img");
        t && gsap.fromTo(t, {
            yPercent: -4
        }, {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
                trigger: t.closest(".sp-showcase__hero"),
                start: "top top",
                end: "bottom top",
                scrub: !0
            }
        });
        const s = document.querySelector(".post-hero-image__img");
        if (s) {
            const e = s.closest(".post-hero-image__wrap") || s.closest(".post-hero-image");
            e && gsap.fromTo(s, {
                yPercent: -4
            }, {
                yPercent: 4,
                ease: "none",
                scrollTrigger: $e(e, 1)
            })
        }
        document.querySelectorAll(".post-minimal__image-wrap img, .sp-minimal__image-wrap img, .sp-post-nl__image-wrap img").forEach(function(e) {
            gsap.fromTo(e, {
                yPercent: -3.75
            }, {
                yPercent: 3.75,
                ease: "none",
                scrollTrigger: $e(e.parentElement, 1)
            })
        });
        document.querySelectorAll(".cta-banner--parallax .cta-banner__bg--parallax").forEach(function(e) {
            let t = e.closest(".cta-banner--parallax");
            if (!t)
                return;
            const s = 2 + (parseInt(t.getAttribute("data-parallax-speed"), 10) || 30) / 100 * 13;
            gsap.fromTo(e, {
                yPercent: -s
            }, {
                yPercent: s,
                ease: "none",
                scrollTrigger: $e(t, 1)
            })
        });
        document.querySelectorAll(".jkd-parallax-bg").forEach(function(e) {
            const t = e.parentElement;
            t && gsap.fromTo(e, {
                yPercent: -5
            }, {
                yPercent: 5,
                ease: "none",
                scrollTrigger: $e(t, 1)
            })
        });
        document.querySelectorAll(".job-deco, .section-deco, .faq-deco").forEach(function(e, t) {
            let s = e.closest("section") || e.parentElement;
            if (!s)
                return;
            const i = t % 2 == 0 ? 1 : -1;
            gsap.to(e, {
                yPercent: 12 * i,
                ease: "none",
                scrollTrigger: $e(s, 1)
            });
            const o = 3 * i;
            e.addEventListener("mouseenter", function() {
                gsap.to(e, {
                    rotation: "+=" + o,
                    duration: .35,
                    ease: "power2.out",
                    overwrite: !1
                })
            }),
            e.addEventListener("mouseleave", function() {
                gsap.to(e, {
                    rotation: "-=" + o,
                    duration: .35,
                    ease: "power2.out",
                    overwrite: !1
                })
            })
        })
    }
    let Ne = !1;
    function Re(e) {
        let t = e.querySelector(".load-more-btn");
        t && t.remove();
        const s = document.createElement("p");
        s.className = "load-more-end",
        s.textContent = "You’ve reached the end",
        e.appendChild(s),
        "undefined" == typeof gsap || window.matchMedia("(prefers-reduced-motion: reduce)").matches || (gsap.set(s, {
            opacity: 0,
            y: 8
        }),
        gsap.to(s, {
            opacity: 1,
            y: 0,
            duration: .4,
            ease: "power2.out"
        }))
    }
    let We = null;
    function Ye() {
        const e = document.querySelectorAll(".stat-card__number[data-count]");
        function t(e) {
            const t = parseInt(e.dataset.count, 10);
            if (isNaN(t))
                return;
            const s = e.textContent.trim().match(/^([^0-9]*)(\d+)([^0-9]*)$/)
              , i = s ? s[1] : ""
              , o = s ? s[3] : ""
              , r = performance.now();
            requestAnimationFrame(function s(n) {
                const a = n - r
                  , l = Math.min(a / 2e3, 1)
                  , c = function(e) {
                    return 1 - Math.pow(1 - e, 3)
                }(l)
                  , d = Math.round(c * t);
                e.textContent = i + d + o,
                l < 1 ? requestAnimationFrame(s) : e.textContent = i + t + o
            })
        }
        e.length && (window.matchMedia("(prefers-reduced-motion: reduce)").matches ? e.forEach(function(e) {
            const t = e.dataset.count;
            if (!t)
                return;
            const s = e.textContent.trim().match(/^([^0-9]*)(\d+)([^0-9]*)$/)
              , i = s ? s[1] : ""
              , o = s ? s[3] : "";
            e.textContent = i + t + o
        }) : We = c(e, function(e) {
            t(e.target)
        }, {
            threshold: .5
        }))
    }
    let Xe = !1;
    function Ue() {
        if (!window.matchMedia("(pointer: fine)").matches)
            return;
        const e = document.querySelector(".cursor");
        if (!e)
            return;
        const t = e.querySelector(".cursor__ring");
        if (Xe)
            return;
        Xe = !0;
        let s = 0
          , i = 0
          , o = 0
          , r = 0;
        document.addEventListener("mousemove", function(t) {
            s = t.clientX,
            i = t.clientY,
            e.classList.remove("is-hidden")
        }),
        document.addEventListener("mouseleave", function() {
            e.classList.add("is-hidden")
        }),
        function e() {
            o += .15 * (s - o),
            r += .15 * (i - r),
            t.style.left = o + "px",
            t.style.top = r + "px",
            requestAnimationFrame(e)
        }();
        const n = e.querySelector(".cursor__image")
          , a = e.querySelector(".cursor__label")
          , l = a.innerHTML
          , c = ["is-link", "is-media", "is-card", "is-values", "is-values--sm", "is-drag", "is-hidden", "is-loading"];
        function d() {
            c.forEach(function(t) {
                e.classList.remove(t)
            }),
            a.innerHTML = l
        }
        document.addEventListener("mouseover", function(t) {
            const s = t.target
              , i = s.closest(".swiper");
            if (i) {
                const t = s.closest('a, button, [role="button"]');
                if (!t || i.contains(t))
                    return d(),
                    e.classList.add("is-drag"),
                    void (a.innerHTML = '<i class="ti ti-arrow-left"></i><i class="ti ti-arrow-right"></i>')
            }
            let o = s.closest(".values-word[data-cursor-image]");
            if (!o) {
                const e = s.closest(".project-card[data-cursor-image], .post-card[data-cursor-image]");
                e?.closest(".portfolio-archive-list--minimal, .blog-archive-list--minimal") && (o = e)
            }
            if (o) {
                d();
                const t = o.dataset.cursorImage;
                return void (t ? (n.src = t,
                e.classList.add("is-values"),
                (o.classList.contains("post-card") || o.classList.contains("project-card")) && e.classList.add("is-values--sm")) : e.classList.add("is-link"))
            }
            return s.closest(".project-card, .portfolio-card, .pf-slide, .post-card") ? (d(),
            void e.classList.add("is-card")) : s.closest(".skills-tools-track, .logos-row") ? void d() : s.closest("img, video, .image-strip__cell, .project-hero-image, .post-hero-image, .hero-section__bg, .showcase-section__img, .project-gallery__item") ? (d(),
            void e.classList.add("is-media")) : s.closest('a, button, [role="button"], .btn, .theme-toggle, .site-header__hamburger') ? (d(),
            void e.classList.add("is-link")) : void d()
        }),
        document.addEventListener("click", function(t) {
            e.classList.contains("is-values") && (d(),
            n.src = "",
            e.classList.add("is-loading"))
        })
    }
    const Ke = [".hero-section__title", ".page-hero__title", ".post-header__title", ".post-minimal__title", ".sp-post-cover__title", ".sp-post-split__title", ".sp-post-nl__title", ".sp-post-mag__title", ".project-header__title", ".sp-cover__title", ".sp-minimal__title", ".sp-showcase__title", ".sp-editorial__title", ".single-portfolio__title", ".blog-archive-hero__title", ".portfolio-archive-hero__title", ".contact-header__title", ".search-results__title", ".privacy-page__title"]
      , Je = Ke.concat([".features-section__heading", ".showcase-section__heading", ".stats-section__heading", ".portfolio-grid-section__heading", ".team-section__heading", ".testimonials-section__heading", ".testimonials-slider-section__heading", ".blog-preview-section__heading", ".cta-section__title", ".cta-banner__title", ".faq-section__heading", ".about-intro__heading", ".approach-section__heading", ".contact-main__heading", ".contact-process__heading", ".process-timeline__heading", ".values-section__heading", ".services-section__heading", ".process-section__heading", ".skills-tools-section__heading", ".culture-section__heading", ".next-block__title", ".related-projects__heading", ".latest-articles__heading", ".newsletter-box__heading", ".contact-social-cta__heading", ".logos-row__heading", ".pricing-section__heading", ".faq-kb-section__heading", ".job-listings-section__heading", ".careers-open-app__heading"]).join(", ");
    function Ze() {
        if ("undefined" == typeof gsap || "undefined" == typeof SplitText)
            return;
        if ("undefined" == typeof ScrollTrigger)
            return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        const t = document.querySelectorAll(Je);
        window.innerWidth < 768 ? t.forEach(function(e) {
            let t = !1;
            for (let s = 0; s < Ke.length; s++)
                if (e.matches(Ke[s])) {
                    t = !0;
                    break
                }
            e.classList.add("is-revealing"),
            gsap.set(e, {
                opacity: 0,
                y: 20
            });
            const s = {
                opacity: 1,
                y: 0,
                duration: .5,
                ease: "power2.out",
                onComplete: function() {
                    e.classList.remove("is-revealing")
                }
            };
            t ? s.delay = .1 : s.scrollTrigger = {
                trigger: e,
                start: "top 88%",
                once: !0
            },
            gsap.to(e, s)
        }) : (gsap.registerPlugin(SplitText),
        t.forEach(function(t) {
            let s = !1;
            for (let e = 0; e < Ke.length; e++)
                if (t.matches(Ke[e])) {
                    s = !0;
                    break
                }
            const i = t.matches(".hero-section__title");
            gsap.set(t, {
                opacity: 1,
                y: 0
            }),
            t.classList.add("is-revealing");
            const o = SplitText.create(t, {
                type: "lines,words",
                mask: "lines",
                autoSplit: !0,
                onSplit: function(e) {
                    gsap.set(e.words, {
                        y: "100%"
                    });
                    const o = {
                        y: "0%",
                        duration: i ? .5 : s ? .6 : .7,
                        ease: "power3.out",
                        stagger: i ? .03 : .04,
                        onComplete: function() {
                            t.classList.remove("is-revealing")
                        }
                    };
                    return s ? o.delay = i ? .15 : .05 : o.scrollTrigger = {
                        trigger: t,
                        start: "top 88%",
                        once: !0
                    },
                    gsap.to(e.words, o)
                }
            });
            e.splitInstances.push(o)
        }))
    }
    function Qe() {
        if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger)
            return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        gsap.registerPlugin(ScrollTrigger);
        document.querySelectorAll(".page-hero .breadcrumbs, .blog-archive-hero .breadcrumbs, .portfolio-archive-hero .breadcrumbs, .search-results .breadcrumbs, .privacy-page .breadcrumbs, .statement-section__label, .statement-section__text, .statement-section__attribution, .statement-section__ambient, .services-bento, .why-us-section__statement, .why-us-section__points, .features-section__description, .features-section__subtitle, .stats-section__description, .stats-section__subtitle, .portfolio-grid-section__description, .section-label, .team-section__description, .team-section__subtitle, .testimonials-section__description, .testimonials-section__subtitle, .testimonials-slider-section__subtitle, .testimonials-slider-section__nav, .blog-preview-section__description, .blog-preview-section__subtitle, .showcase-section__description, .skills-tools-section__subtitle, .process-timeline__subtitle, .cta-section__container, .cta-section__subtitle, .cta-section__actions, .cta-banner__inner, .page-hero__subtitle, .portfolio-archive-hero__subtitle, .blog-archive-hero__subtitle, .jk-ambient-archive-count, .project-hero-image, .project-content, .project-stats, .project-index-bar, .newsletter-box, .logos-row, .jk-trust-badges, .search-results__header, .post-share, .jk-ambient-filed-under, .portfolio-grid-section__header, .portfolio-grid-section__cta, .culture-section__image-col, .culture-section__desc, .culture-highlights, .testimonials-slider, .ticker-section, .faq-section__description, .faq-section__accordion, .next-block, .archive-closer, .blog-category-filter, .blog-sidebar, .blog-archive-list__intro, .blog-archive-list__pagination, .load-more-wrap, .post-hero-image, .post-content, .related-projects, .project-share, .about-intro__body, .about-intro__media, .about-intro__actions, .approach-section__subtitle, .approach-section__principles, .approach-section__slideshow, .approach-section__progress, .values-section__manifesto, .process-section__statement, .process-section__ambient, .process-section__label, .process-timeline__track, .sp-cover__content, .sp-split__content, .sp-post-mag__content, .sp-post-sb__content, .sp-post-nl__content, .sp-minimal__content, .sp-showcase__content, .sp-editorial__content, .sp-cinematic__header, .post-engagement, .post-comments, .pricing-section__description, .pricing-section__toggle, .faq-kb-section__description, .faq-kb-section__filters, .job-listings-section__description, .job-listings-section__image, .careers-open-app__description, .careers-open-app__cta, .blog-preview-section__cta, .latest-articles__cta, .contact-header .page-hero__subtitle, .contact-social-cta__icons, .related-projects__cta, .related-projects__subtitle, .team-reel__statement, .team-reel__ambient, .project-media, .project-gallery, .approach-section__cta, .sp-post-mag__breadcrumbs-bar, .sp-post-mag__body, .sp-cover__breadcrumb-bar, .sp-cover__details, .sp-split__media, .sp-minimal__back, .sp-minimal__details, .sp-minimal__image, .sp-showcase__meta-strip, .sp-showcase__media, .sp-cinematic__breadcrumb-bar, .sp-editorial__hero-image, .single-portfolio__sidebar, .author-bio").forEach(function(e) {
            e.classList.add("is-revealed"),
            e.classList.add("is-revealing"),
            gsap.set(e, {
                opacity: 0,
                y: 24
            }),
            gsap.to(e, {
                y: 0,
                opacity: 1,
                duration: .6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: e,
                    start: "top 85%",
                    once: !0,
                    invalidateOnRefresh: !0
                },
                onComplete: function() {
                    e.classList.remove("is-revealing")
                }
            })
        });
        const e = document.getElementById("smooth-content") || document.body;
        if ("undefined" != typeof ResizeObserver && "undefined" != typeof ScrollTrigger) {
            let t;
            new ResizeObserver(function() {
                clearTimeout(t),
                t = setTimeout(function() {
                    if ("undefined" != typeof ScrollSmoother) {
                        const e = ScrollSmoother.get();
                        e && e.refresh()
                    }
                    ScrollTrigger.refresh()
                }, 150)
            }
            ).observe(e)
        }
        document.querySelectorAll(".section-deco, .job-deco").forEach(function(e, t) {
            e.classList.add("is-revealed", "is-revealing"),
            gsap.set(e, {
                opacity: 0,
                scale: .7
            }),
            gsap.to(e, {
                opacity: 1,
                scale: 1,
                duration: .8,
                delay: t % 2 == 0 ? 0 : .15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: e.closest("section") || e.parentElement,
                    start: "top 80%",
                    once: !0
                },
                onComplete: function() {
                    e.classList.remove("is-revealing")
                }
            })
        }),
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                const e = document.querySelector(".post-header__inner");
                if (e) {
                    const t = e.querySelector(".breadcrumbs")
                      , s = (e.querySelector(".post-header__title"),
                    e.querySelector(".post-header__intro"))
                      , i = e.querySelector(".sp-meta")
                      , o = [t, s, i].filter(Boolean);
                    o.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const r = gsap.timeline({
                        delay: .15,
                        onComplete: function() {
                            o.forEach(function(e) {
                                e.classList.remove("is-revealing")
                            })
                        }
                    });
                    t && r.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }),
                    s && r.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }, "-=0.15"),
                    i && r.to(i, {
                        y: 0,
                        opacity: 1,
                        duration: .35,
                        ease: "power2.out"
                    }, "-=0.15")
                }
                const t = document.querySelector(".sp-post-cover__inner");
                if (t) {
                    t.classList.add("is-revealed");
                    const e = t.querySelector(".sp-meta")
                      , s = t.querySelector(".sp-post-cover__title")
                      , i = [e, s].filter(Boolean);
                    i.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const o = gsap.timeline({
                        delay: .05
                    });
                    e && o.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .5,
                        ease: "power2.out"
                    }),
                    s && o.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .6,
                        ease: "power2.out"
                    }, "-=0.2"),
                    o.eventCallback("onComplete", function() {
                        i.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const s = document.querySelector(".sp-post-cover__meta-bar");
                s && (s.classList.add("is-revealed", "is-revealing"),
                gsap.set(s, {
                    opacity: 0,
                    y: 16
                }),
                gsap.to(s, {
                    y: 0,
                    opacity: 1,
                    duration: .5,
                    ease: "power2.out",
                    delay: .1,
                    onComplete: function() {
                        s.classList.remove("is-revealing")
                    }
                }));
                const i = document.querySelector(".sp-post-split__content");
                if (i) {
                    i.classList.add("is-revealed");
                    const e = i.querySelector(".sp-post-split__title")
                      , t = i.querySelector(".sp-meta")
                      , s = i.querySelector(".breadcrumbs")
                      , o = i.querySelector(".sp-post-split__tag")
                      , r = [o, t, s].filter(Boolean);
                    r.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const n = gsap.timeline({
                        delay: .05
                    });
                    o && n.to(o, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }),
                    e && n.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .5,
                        ease: "power2.out"
                    }, "-=0.15"),
                    t && n.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }, "-=0.15"),
                    s && n.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .35,
                        ease: "power2.out"
                    }, "-=0.1"),
                    n.eventCallback("onComplete", function() {
                        r.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const o = document.querySelector(".sp-post-split__media");
                o && (o.classList.add("is-revealed", "is-revealing"),
                gsap.set(o, {
                    opacity: 0
                }),
                gsap.to(o, {
                    opacity: 1,
                    duration: .8,
                    ease: "power2.out",
                    delay: .05,
                    onComplete: function() {
                        o.classList.remove("is-revealing")
                    }
                }));
                const r = document.querySelector(".sp-post-mag__hero-inner")
                  , n = document.querySelector(".sp-post-mag__header-flat-inner")
                  , a = r || n;
                if (a) {
                    a.classList.add("is-revealed");
                    const e = a.querySelector(".sp-post-mag__title")
                      , t = a.querySelector(".sp-meta")
                      , s = a.querySelector(".sp-post-mag__cats")
                      , i = [s, t].filter(Boolean);
                    i.forEach(function(e) {
                        e.classList.add("is-revealing"),
                        gsap.set(e, {
                            opacity: 0,
                            y: 12
                        })
                    });
                    const o = gsap.timeline({
                        delay: .05
                    });
                    s && o.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }),
                    e && o.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .6,
                        ease: "power2.out"
                    }, "-=0.15"),
                    t && o.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }, "-=0.2"),
                    o.eventCallback("onComplete", function() {
                        i.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const l = document.querySelector(".sp-post-nl__header");
                if (l) {
                    l.classList.add("is-revealed");
                    const e = l.querySelector(".sp-meta")
                      , t = l.querySelector(".sp-post-nl__title")
                      , s = l.querySelector(".sp-post-nl__intro")
                      , i = [e, t, s].filter(Boolean);
                    i.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const o = gsap.timeline({
                        delay: .05
                    });
                    e && o.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .35,
                        ease: "power2.out"
                    }),
                    t && o.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }, "-=0.2"),
                    s && o.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .35,
                        ease: "power2.out"
                    }, "-=0.25"),
                    o.eventCallback("onComplete", function() {
                        i.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                [document.querySelector(".sp-post-nl__image"), document.querySelector(".sp-post-nl__content")].filter(Boolean).forEach(function(e) {
                    e.classList.add("is-revealed", "is-revealing"),
                    gsap.set(e, {
                        opacity: 0,
                        y: 24
                    }),
                    gsap.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .6,
                        ease: "power2.out",
                        scrollTrigger: Ve(e),
                        onComplete: function() {
                            e.classList.remove("is-revealing")
                        }
                    })
                });
                const c = document.querySelector(".post-minimal__header");
                if (c) {
                    c.classList.add("is-revealed");
                    const e = c.querySelector(".post-minimal__title")
                      , t = c.querySelector(".sp-meta")
                      , s = [e, t].filter(Boolean);
                    s.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const i = gsap.timeline({
                        delay: .05
                    });
                    e && i.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .5,
                        ease: "power2.out"
                    }),
                    t && i.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .4,
                        ease: "power2.out"
                    }, "-=0.15"),
                    i.eventCallback("onComplete", function() {
                        s.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                [document.querySelector(".post-minimal__image"), document.querySelector(".post-minimal__content")].filter(Boolean).forEach(function(e) {
                    e.classList.add("is-revealed", "is-revealing"),
                    gsap.set(e, {
                        opacity: 0,
                        y: 24
                    }),
                    gsap.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .6,
                        ease: "power2.out",
                        scrollTrigger: Ve(e),
                        onComplete: function() {
                            e.classList.remove("is-revealing")
                        }
                    })
                });
                const d = document.querySelector(".sp-cover__inner");
                if (d) {
                    const e = d.querySelector(".sp-cover__tag")
                      , t = d.querySelector(".sp-cover__subtitle")
                      , s = [e, t].filter(Boolean);
                    s.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const i = gsap.timeline({
                        delay: .05
                    });
                    e && i.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }),
                    t && i.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    i.eventCallback("onComplete", function() {
                        s.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const u = document.querySelector(".sp-split__content");
                if (u) {
                    const e = u.querySelector(".breadcrumbs")
                      , t = u.querySelector(".single-portfolio__tag")
                      , s = u.querySelector(".sp-split__subtitle")
                      , i = u.querySelector(".sp-split__meta")
                      , o = u.querySelector(".sp-split__visit-btn")
                      , r = [e, t, s, i, o].filter(Boolean);
                    r.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const n = gsap.timeline({
                        delay: .05
                    });
                    e && n.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }),
                    t && n.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    s && n.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    i && n.to(i, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    o && n.to(o, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    n.eventCallback("onComplete", function() {
                        r.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const p = document.querySelector(".sp-minimal__header");
                if (p) {
                    const e = p.querySelector(".single-portfolio__tag")
                      , t = p.querySelector(".sp-minimal__meta")
                      , s = [e, t].filter(Boolean);
                    s.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const i = gsap.timeline({
                        delay: .05
                    });
                    e && i.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }),
                    t && i.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    i.eventCallback("onComplete", function() {
                        s.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const f = document.querySelector(".sp-showcase__hero-inner");
                if (f) {
                    const e = f.querySelector(".breadcrumbs")
                      , t = f.querySelector(".project-header__tag")
                      , s = f.querySelector(".btn")
                      , i = [e, t, s].filter(Boolean);
                    i.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const o = gsap.timeline({
                        delay: .05
                    });
                    e && o.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }),
                    t && o.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    s && o.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    o.eventCallback("onComplete", function() {
                        i.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const m = document.querySelector(".sp-cinematic__header-inner");
                if (m) {
                    const e = m.querySelector(".single-portfolio__tag")
                      , t = m.querySelector(".sp-cinematic__subtitle")
                      , s = m.querySelector(".sp-cinematic__meta")
                      , i = m.querySelector(".sp-cinematic__visit-btn")
                      , o = [e, t, s, i].filter(Boolean);
                    o.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const r = gsap.timeline({
                        delay: .05
                    });
                    e && r.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }),
                    t && r.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    s && r.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    i && r.to(i, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    r.eventCallback("onComplete", function() {
                        o.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
                const g = document.querySelector(".sp-editorial__header-inner");
                if (g) {
                    const e = g.querySelector(".breadcrumbs")
                      , t = g.querySelector(".sp-editorial__category")
                      , s = g.querySelector(".sp-editorial__subtitle")
                      , i = g.querySelector(".sp-editorial__meta")
                      , o = g.querySelector(".sp-editorial__visit-btn")
                      , r = [e, t, s, i, o].filter(Boolean);
                    r.forEach(function(e) {
                        e.classList.add("is-revealing")
                    });
                    const n = gsap.timeline({
                        delay: .05
                    });
                    e && n.to(e, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }),
                    t && n.to(t, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    s && n.to(s, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    i && n.to(i, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    o && n.to(o, {
                        y: 0,
                        opacity: 1,
                        duration: .3,
                        ease: "power2.out"
                    }, "-=0.2"),
                    n.eventCallback("onComplete", function() {
                        r.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    })
                }
            })
        });
        const t = document.querySelector(".sp-post-sb__sidebar");
        t && (t.classList.add("is-revealed", "is-revealing"),
        gsap.set(t, {
            opacity: 0,
            y: 24
        }),
        gsap.to(t, {
            y: 0,
            opacity: 1,
            duration: .6,
            ease: "power2.out",
            scrollTrigger: Ve(t),
            onComplete: function() {
                t.classList.remove("is-revealing")
            }
        }));
        const s = document.querySelector(".latest-articles");
        s && (s.classList.add("is-revealed", "is-revealing"),
        gsap.set(s, {
            opacity: 0,
            y: 24
        }),
        gsap.to(s, {
            y: 0,
            opacity: 1,
            duration: .6,
            ease: "power2.out",
            scrollTrigger: Ve(s),
            onComplete: function() {
                s.classList.remove("is-revealing")
            }
        }));
        const i = document.querySelector(".project-header__inner");
        if (i) {
            const e = i.querySelector(".breadcrumbs")
              , t = i.querySelector(".project-header__tag")
              , s = (i.querySelector(".project-header__title"),
            i.querySelector(".project-header__description"))
              , o = i.querySelector(".project-header__meta")
              , r = [e, t, s, o].filter(Boolean);
            r.forEach(function(e) {
                e.classList.add("is-revealing")
            });
            const n = gsap.timeline({
                delay: .05,
                onComplete: function() {
                    r.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    })
                }
            });
            e && n.to(e, {
                y: 0,
                opacity: 1,
                duration: .3,
                ease: "power2.out"
            }),
            t && n.to(t, {
                y: 0,
                opacity: 1,
                duration: .3,
                ease: "power2.out"
            }, "-=0.2"),
            s && n.to(s, {
                y: 0,
                opacity: 1,
                duration: .3,
                ease: "power2.out"
            }, "-=0.2"),
            o && n.to(o, {
                y: 0,
                opacity: 1,
                duration: .3,
                ease: "power2.out"
            }, "-=0.2")
        }
        const o = document.querySelector(".contact-header__inner");
        if (o) {
            const e = o.querySelector(".breadcrumbs")
              , t = o.querySelector(".section-label")
              , s = o.querySelector(".page-hero__subtitle")
              , i = o.querySelector(".jk-trust-badges")
              , r = [e, t, s, i].filter(Boolean);
            r.forEach(function(e) {
                e.classList.add("is-revealed", "is-revealing"),
                gsap.set(e, {
                    opacity: 0,
                    y: 20
                })
            });
            const n = gsap.timeline({
                delay: .05,
                onComplete: function() {
                    r.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    })
                }
            });
            e && n.to(e, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }),
            t && n.to(t, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, .35),
            s && n.to(s, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, "-=0.15"),
            i && n.to(i, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, "-=0.2")
        }
        const r = document.querySelector(".contact-main");
        if (r) {
            const e = r.querySelector(".contact-main__form")
              , t = r.querySelectorAll(".contact-info__item")
              , s = r.querySelector(".contact-availability")
              , i = r.querySelector(".contact-social")
              , o = r.querySelector(".contact-sidebar__response")
              , n = [s, i, o].filter(Boolean);
            n.forEach(function(e) {
                e.classList.add("is-revealed", "is-revealing"),
                gsap.set(e, {
                    opacity: 0,
                    y: 16
                })
            }),
            t.length && t.forEach(function(e) {
                e.classList.add("is-revealed", "is-revealing"),
                gsap.set(e, {
                    opacity: 0,
                    y: 16
                })
            }),
            e && (e.classList.add("is-revealed", "is-revealing"),
            gsap.set(e, {
                opacity: 0,
                y: 20
            }));
            const a = gsap.timeline({
                scrollTrigger: {
                    trigger: r,
                    start: "top 80%",
                    once: !0
                },
                onComplete: function() {
                    n.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    }),
                    e && e.classList.remove("is-revealing"),
                    t.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    })
                }
            });
            e && a.to(e, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, 0),
            t.length && a.to(t, {
                y: 0,
                opacity: 1,
                duration: .3,
                stagger: .06,
                ease: "power2.out"
            }, .05),
            s && a.to(s, {
                y: 0,
                opacity: 1,
                duration: .25,
                ease: "power2.out"
            }, "-=0.1"),
            i && a.to(i, {
                y: 0,
                opacity: 1,
                duration: .25,
                ease: "power2.out"
            }, "-=0.1"),
            o && a.to(o, {
                y: 0,
                opacity: 1,
                duration: .2,
                ease: "power2.out"
            }, "-=0.08")
        }
        const n = document.querySelectorAll(".features-section__grid, .team-section__grid, .blog-preview-section__grid, .stats-section__grid, .blog-archive-list__grid, .portfolio-archive-list__cards, .contact-process__grid, .contact-cards__grid, .logos-row__grid, .latest-articles__grid, .related-projects__grid, .search-results__grid, .portfolio-grid-section__grid, .skills-tools-track, .showcase-section__grid, .faq-section__list, .pricing-section__grid, .faq-kb-section__groups, .job-listings-section__list, .careers-open-app__perks, .team-reel__strip, .project-gallery__grid")
          , a = window.innerWidth < 768;
        n.forEach(function(e) {
            const t = e.children;
            if (0 === t.length)
                return;
            const s = Array.from(t);
            s.forEach(function(e) {
                e.classList.add("is-revealed"),
                e.classList.add("is-revealing"),
                gsap.set(e, {
                    opacity: 0,
                    y: a ? 20 : 30
                })
            }),
            gsap.to(s, {
                y: 0,
                opacity: 1,
                duration: a ? .4 : .6,
                stagger: a ? .06 : .12,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: e,
                    start: "top 85%",
                    once: !0
                },
                onComplete: function() {
                    s.forEach(function(e) {
                        e.classList.remove("is-revealing"),
                        e.style.opacity = "",
                        e.style.transform = ""
                    })
                }
            })
        });
        if (document.body.classList.contains("home") || document.body.classList.contains("page-template-template-home")) {
            const e = document.querySelector(".site-header__logo")
              , t = document.querySelector(".site-header__nav")
              , s = document.querySelector(".site-header__actions");
            if (e || t || s) {
                const i = [e, t, s].filter(Boolean);
                i.forEach(function(e) {
                    e.classList.add("is-revealing")
                });
                const o = gsap.timeline({
                    delay: .05,
                    onComplete: function() {
                        i.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    }
                });
                e && o.to(e, {
                    opacity: 1,
                    duration: .4,
                    ease: "power2.out"
                }, 0),
                t && o.to(t, {
                    opacity: 1,
                    duration: .4,
                    ease: "power2.out"
                }, .08),
                s && o.to(s, {
                    opacity: 1,
                    duration: .4,
                    ease: "power2.out"
                }, .12)
            }
        }
        if (document.querySelector(".hero-section")) {
            const e = document.querySelector(".hero-section__kicker")
              , t = document.querySelector(".hero-section__subtitle")
              , s = document.querySelector(".hero-section__actions")
              , i = document.querySelector(".jk-context-card")
              , o = document.querySelectorAll(".jk-hero-corner")
              , r = document.querySelector(".jk-scroll-indicator")
              , n = document.querySelector(".jk-ambient-hero-meta");
            let a = [e, t, s, i, r, n].filter(Boolean);
            o.length && (a = a.concat(Array.from(o))),
            a.forEach(function(e) {
                e.classList.add("is-revealing")
            });
            const l = gsap.timeline({
                delay: .1,
                onComplete: function() {
                    a.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    })
                }
            });
            e && l.to(e, {
                y: 0,
                opacity: 1,
                duration: .35,
                ease: "power2.out"
            }, 0),
            t && l.to(t, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, .25),
            s && l.to(s, {
                y: 0,
                opacity: 1,
                duration: .35,
                ease: "power2.out"
            }, .4),
            o.length && l.to(o, {
                y: 0,
                opacity: 1,
                duration: .5,
                ease: "power2.out"
            }, .15),
            n && l.to(n, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, .3),
            i && l.to(i, {
                y: 0,
                opacity: 1,
                duration: .5,
                ease: "power2.out"
            }, .35),
            r && l.to(r, {
                opacity: 1,
                duration: .5,
                ease: "power2.out"
            }, .45)
        }
        const l = document.querySelectorAll(".process-step, .ptl-card");
        if (l.length) {
            const e = Array.from(l);
            e.forEach(function(e) {
                e.classList.add("is-revealing")
            }),
            gsap.to(e, {
                y: 0,
                opacity: 1,
                duration: .6,
                stagger: .15,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: e[0].parentElement,
                    start: "top 80%",
                    once: !0
                },
                onComplete: function() {
                    e.forEach(function(e) {
                        e.classList.remove("is-revealing"),
                        e.classList.add("is-revealed"),
                        gsap.set(e, {
                            clearProps: "all"
                        })
                    })
                }
            })
        }
        const c = document.querySelectorAll(".image-strip__cell");
        if (c.length) {
            const e = Array.from(c);
            e.forEach(function(e) {
                e.classList.add("is-revealing")
            }),
            gsap.to(e, {
                scale: 1,
                opacity: 1,
                duration: .5,
                stagger: .08,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: ".image-strip",
                    start: "top 90%",
                    once: !0
                },
                onComplete: function() {
                    e.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    })
                }
            })
        }
        const d = document.querySelector(".site-footer__inner");
        if (d) {
            let e = [];
            const t = d.querySelector(".site-footer__about")
              , s = d.querySelector(".site-footer__projects")
              , i = d.querySelector(".site-footer__articles")
              , o = document.querySelector(".site-footer__bottom-inner");
            let r, n, a, l, c, u, p;
            t && (r = t.querySelector(".site-footer__logo"),
            n = t.querySelector(".site-footer__description"),
            a = t.querySelectorAll(".footer-social__link"),
            r && e.push(r),
            n && e.push(n),
            a.length && (e = e.concat(Array.from(a)))),
            s && (l = s.querySelector(".site-footer__col-label"),
            c = s.querySelectorAll(".site-footer__widget-item"),
            l && e.push(l),
            c.length && (e = e.concat(Array.from(c)))),
            i && (u = i.querySelector(".site-footer__col-label"),
            p = i.querySelectorAll(".site-footer__widget-item"),
            u && e.push(u),
            p.length && (e = e.concat(Array.from(p)))),
            o && e.push(o),
            e.forEach(function(e) {
                e.classList.add("is-revealing")
            });
            const f = gsap.timeline({
                scrollTrigger: {
                    trigger: d,
                    start: "top 85%",
                    once: !0
                },
                onComplete: function() {
                    e.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    })
                }
            });
            t && (r && f.to(r, {
                y: 0,
                opacity: 1,
                duration: .5,
                ease: "power2.out"
            }, 0),
            n && f.to(n, {
                y: 0,
                opacity: 1,
                duration: .5,
                ease: "power2.out"
            }, .1),
            a.length && f.to(Array.from(a), {
                y: 0,
                opacity: 1,
                duration: .4,
                stagger: .06,
                ease: "power2.out"
            }, .2)),
            s && (l && f.to(l, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, 0),
            c.length && f.to(Array.from(c), {
                y: 0,
                opacity: 1,
                duration: .5,
                stagger: .08,
                ease: "power2.out"
            }, .1)),
            i && (u && f.to(u, {
                y: 0,
                opacity: 1,
                duration: .4,
                ease: "power2.out"
            }, 0),
            p.length && f.to(Array.from(p), {
                y: 0,
                opacity: 1,
                duration: .5,
                stagger: .08,
                ease: "power2.out"
            }, .1)),
            o && f.to(o, {
                y: 0,
                opacity: 1,
                duration: .5,
                ease: "power2.out"
            }, .3)
        }
        const u = document.querySelector(".error-404-page__inner");
        if (u) {
            const e = u.querySelector(".error-404-page__badge")
              , t = u.querySelector(".error-404-page__heading")
              , s = u.querySelector(".error-404-page__quote")
              , i = u.querySelector(".error-404-page__actions")
              , o = document.querySelector(".error-404-page__bg-number")
              , r = document.querySelector(".jk-ambient-404-bottom")
              , n = [e, t, s, i, o, r].filter(Boolean);
            n.forEach(function(e) {
                e.classList.add("is-revealing")
            });
            const a = gsap.timeline({
                delay: .2,
                onComplete: function() {
                    n.forEach(function(e) {
                        e.classList.remove("is-revealing")
                    })
                }
            });
            o && a.to(o, {
                opacity: 1,
                scale: 1,
                duration: 1.4,
                ease: "power2.out"
            }, 0),
            e && a.to(e, {
                opacity: 1,
                y: 0,
                duration: .6,
                ease: "power2.out"
            }, .1),
            t && a.to(t, {
                opacity: 1,
                y: 0,
                duration: .7,
                ease: "power2.out"
            }, .25),
            s && a.to(s, {
                opacity: 1,
                y: 0,
                duration: .6,
                ease: "power2.out"
            }, .4),
            i && a.to(i, {
                opacity: 1,
                y: 0,
                duration: .6,
                ease: "power2.out"
            }, .55),
            r && a.to(r, {
                opacity: 1,
                duration: .5,
                ease: "power2.out"
            }, .7)
        }
        const p = document.querySelector(".blog-sidebar");
        if (p && window.innerWidth > 1023) {
            const e = p.previousElementSibling;
            if (e) {
                const t = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 72) + 24;
                ScrollTrigger.create({
                    trigger: e,
                    start: "top " + t,
                    end: function() {
                        return "bottom " + (p.offsetHeight + t)
                    },
                    onUpdate: function(t) {
                        let s = t.progress * (e.offsetHeight - p.offsetHeight);
                        s < 0 && (s = 0),
                        gsap.set(p, {
                            y: s
                        })
                    },
                    onLeaveBack: function() {
                        gsap.set(p, {
                            y: 0
                        })
                    }
                })
            }
        }
        const f = document.querySelector(".sp-post-sb__sidebar");
        if (f && window.innerWidth > 900) {
            const e = document.querySelector(".sp-post-sb__main");
            if (e) {
                const t = (parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height"), 10) || 72) + 32;
                f.style.position = "relative",
                ScrollTrigger.create({
                    trigger: e,
                    start: "top " + t,
                    end: function() {
                        return "bottom " + (f.offsetHeight + t)
                    },
                    onUpdate: function(t) {
                        let s = t.progress * (e.offsetHeight - f.offsetHeight);
                        s < 0 && (s = 0),
                        gsap.set(f, {
                            y: s
                        })
                    },
                    onLeaveBack: function() {
                        gsap.set(f, {
                            y: 0
                        })
                    }
                })
            }
        }
    }
    function et() {
        if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger)
            return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        if (window.innerWidth < 768)
            return;
        const e = document.querySelectorAll(".portfolio-archive-list__cards--fullscreen .project-card");
        e.length && e.forEach(function(e) {
            const t = e.querySelector(".project-card__image")
              , s = e.querySelector(".project-card__content");
            t && (gsap.fromTo(t, {
                scale: 1.12
            }, {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: e,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            }),
            s && gsap.to(s, {
                y: 0,
                opacity: 1,
                duration: .6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: e,
                    start: "top 70%",
                    once: !0
                }
            }))
        })
    }
    function tt() {
        const e = window.location.pathname.replace(/\/+$/, "") || "/"
          , t = window.location.search
          , s = document.querySelectorAll(".site-nav__list li")
          , i = ["current-menu-item", "current_page_item", "current-menu-ancestor", "current-page-ancestor", "current-menu-parent", "current_page_parent"];
        s.forEach(function(e) {
            i.forEach(function(t) {
                e.classList.remove(t)
            })
        });
        const o = document.body
          , r = o.classList.contains("single-post")
          , n = o.classList.contains("blog") || o.classList.contains("archive") && !o.classList.contains("post-type-archive-portfolio")
          , a = o.classList.contains("post-type-archive-portfolio") || o.classList.contains("tax-portfolio_category") || o.classList.contains("single-portfolio")
          , l = o.classList.contains("category")
          , c = o.classList.contains("tag")
          , d = o.classList.contains("author")
          , u = o.classList.contains("date")
          , p = r || n || l || c || d || u
          , f = ["/blog", "/news", "/articles"]
          , m = ["/portfolio", "/work", "/projects", "/cases"]
          , g = {};
        s.forEach(function(e) {
            let t = e.querySelector(":scope > a");
            if (!t)
                return;
            let s = t.getAttribute("href");
            if (s && "#" !== s && "#!" !== s)
                try {
                    const e = new URL(s,window.location.origin)
                      , t = e.pathname.replace(/\/+$/, "") || "/";
                    e.search && (g[t] = !0)
                } catch (e) {}
        }),
        s.forEach(function(s) {
            let i = s.querySelector(":scope > a");
            if (!i)
                return;
            let o, r, n = i.getAttribute("href");
            if (n && "#" !== n && "#!" !== n) {
                try {
                    const e = new URL(n,window.location.origin);
                    o = e.pathname.replace(/\/+$/, "") || "/",
                    r = e.search
                } catch (e) {
                    return
                }
                if (o !== e)
                    return "/" === o || r || 0 !== e.indexOf(o) ? p && !r && -1 !== f.indexOf(o) ? (s.classList.add("current-menu-ancestor"),
                    void st(s)) : void (a && !r && -1 !== m.indexOf(o) && (s.classList.add("current-menu-ancestor"),
                    st(s))) : (s.classList.add("current-menu-ancestor"),
                    void st(s));
                g[o] && r ? r === t && (s.classList.add("current-menu-item"),
                st(s)) : t && g[o] ? (s.classList.add("current-menu-ancestor"),
                st(s)) : (s.classList.add("current-menu-item"),
                st(s))
            }
        })
    }
    function st(e) {
        let t = e.parentElement && e.parentElement.closest(".menu-item-has-children");
        for (; t; )
            t.classList.add("current-menu-ancestor"),
            t = t.parentElement && t.parentElement.closest(".menu-item-has-children")
    }
    const it = "(min-width: 1024px)";
    let ot = !1;
    const rt = new WeakMap;
    function nt() {
        document.querySelectorAll(".site-nav__list .sub-menu").forEach(function(e) {
            let t = rt.get(e);
            t && (clearTimeout(t),
            rt.delete(e)),
            e.removeAttribute("style");
            const s = e.querySelectorAll("li");
            gsap.killTweensOf(s),
            s.forEach(function(e) {
                e.style.opacity = "",
                e.style.transform = ""
            })
        })
    }
    function at() {
        if ("undefined" != typeof gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            if (document.querySelectorAll(".site-nav__list .sub-menu").forEach(function(e) {
                e.removeAttribute("style")
            }),
            !ot) {
                ot = !0;
                const e = document.querySelector(".site-nav__list");
                if (!e)
                    return;
                e.addEventListener("mouseenter", function(e) {
                    if (!window.matchMedia(it).matches)
                        return;
                    let t = e.target.closest(".site-nav__list > li.menu-item-has-children");
                    if (t && e.target === t) {
                        let e = t.querySelector(":scope > .sub-menu");
                        if (e) {
                            !function(e, t) {
                                let s = e.querySelectorAll(":scope > li");
                                if (!s.length)
                                    return;
                                let i = rt.get(e);
                                if (i && (clearTimeout(i),
                                rt.delete(e)),
                                gsap.killTweensOf(s),
                                gsap.set(s, {
                                    opacity: 0,
                                    y: 6
                                }),
                                gsap.to(s, {
                                    opacity: 1,
                                    y: 0,
                                    duration: .28,
                                    stagger: .03,
                                    ease: "power2.out",
                                    delay: .04,
                                    overwrite: !0
                                }),
                                t) {
                                    let t = e.querySelectorAll(":scope > li > .sub-menu > li");
                                    t.length && (gsap.killTweensOf(t),
                                    gsap.set(t, {
                                        opacity: 0,
                                        y: 6
                                    }),
                                    gsap.to(t, {
                                        opacity: 1,
                                        y: 0,
                                        duration: .24,
                                        stagger: .02,
                                        ease: "power2.out",
                                        delay: .06,
                                        overwrite: !0
                                    }))
                                }
                            }(e, t.classList.contains("has-mega-menu"))
                        }
                        return
                    }
                    let s = e.target.closest(".sub-menu li.menu-item-has-children");
                    if (s && e.target === s) {
                        if (s.closest(".has-mega-menu"))
                            return;
                        let e = s.querySelector(":scope > .sub-menu");
                        e && function(e) {
                            let t = e.querySelectorAll(":scope > li");
                            t.length && (gsap.killTweensOf(t),
                            gsap.set(t, {
                                opacity: 0,
                                x: 6
                            }),
                            gsap.to(t, {
                                opacity: 1,
                                x: 0,
                                duration: .24,
                                stagger: .025,
                                ease: "power2.out",
                                delay: .02,
                                overwrite: !0
                            }))
                        }(e)
                    }
                }, !0),
                e.addEventListener("mouseleave", function(e) {
                    if (!window.matchMedia(it).matches)
                        return;
                    let t = e.target.closest(".site-nav__list > li.menu-item-has-children");
                    if (t && e.target === t) {
                        let e = t.querySelector(":focus");
                        e && e.blur();
                        let s = t.querySelector(":scope > .sub-menu");
                        if (s) {
                            !function(e, t) {
                                let s = rt.get(e);
                                s && clearTimeout(s),
                                rt.set(e, setTimeout(function() {
                                    let s = e.querySelectorAll(":scope > li");
                                    if (gsap.killTweensOf(s),
                                    gsap.set(s, {
                                        clearProps: "opacity,y"
                                    }),
                                    t) {
                                        let t = e.querySelectorAll(":scope > li > .sub-menu > li");
                                        gsap.killTweensOf(t),
                                        gsap.set(t, {
                                            clearProps: "opacity,y"
                                        })
                                    }
                                    rt.delete(e)
                                }, 50))
                            }(s, t.classList.contains("has-mega-menu"))
                        }
                        return
                    }
                    let s = e.target.closest(".sub-menu li.menu-item-has-children");
                    if (s && e.target === s) {
                        if (s.closest(".has-mega-menu"))
                            return;
                        let e = s.querySelector(":scope > .sub-menu");
                        e && function(e) {
                            let t = e.querySelectorAll(":scope > li");
                            gsap.killTweensOf(t),
                            gsap.set(t, {
                                clearProps: "opacity,x"
                            })
                        }(e)
                    }
                }, !0)
            }
            document.body.classList.add("js-nav-ready")
        }
    }
    function lt() {
        const e = document.querySelectorAll(".pricing-section__toggle");
        if (!e.length)
            return;
        const t = "undefined" != typeof gsap;
        e.forEach(function(e) {
            const s = e.querySelectorAll(".pricing-toggle__btn")
              , i = e.closest(".pricing-section");
            if (!i)
                return;
            const o = i.querySelectorAll(".pricing-card__amount")
              , r = i.querySelectorAll(".pricing-card__period")
              , n = i.querySelectorAll(".pricing-card");
            let a = !1;
            s.forEach(function(e) {
                e.setAttribute("aria-pressed", e.classList.contains("is-active") ? "true" : "false")
            }),
            s.forEach(function(e) {
                e.addEventListener("click", function() {
                    const i = e.dataset.period;
                    if (!e.classList.contains("is-active") && !a)
                        if (s.forEach(function(e) {
                            e.classList.remove("is-active"),
                            e.setAttribute("aria-pressed", "false")
                        }),
                        e.classList.add("is-active"),
                        e.setAttribute("aria-pressed", "true"),
                        t) {
                            a = !0;
                            const e = [];
                            o.forEach(function(t) {
                                e.push(t)
                            }),
                            r.forEach(function(t) {
                                e.push(t)
                            });
                            const t = gsap.timeline({
                                onComplete: function() {
                                    a = !1
                                }
                            });
                            t.to(e, {
                                opacity: 0,
                                y: -8,
                                duration: .15,
                                ease: "power2.in",
                                stagger: .02
                            }),
                            t.call(function() {
                                o.forEach(function(e) {
                                    let t = "yearly" === i ? e.dataset.yearly : e.dataset.monthly;
                                    t && (e.textContent = t)
                                }),
                                r.forEach(function(e) {
                                    e.textContent = "yearly" === i ? "/year" : "/month"
                                })
                            }),
                            t.set(e, {
                                y: 8
                            }),
                            t.to(e, {
                                opacity: 1,
                                y: 0,
                                duration: .25,
                                ease: "power2.out",
                                stagger: .02
                            }),
                            t.fromTo(n, {
                                scale: .98
                            }, {
                                scale: 1,
                                duration: .3,
                                ease: "power2.out",
                                stagger: .04
                            }, .15)
                        } else
                            o.forEach(function(e) {
                                let t = "yearly" === i ? e.dataset.yearly : e.dataset.monthly;
                                t && (e.textContent = t)
                            }),
                            r.forEach(function(e) {
                                e.textContent = "yearly" === i ? "/year" : "/month"
                            })
                })
            })
        })
    }
    function ct() {
        const e = document.querySelector(".approach-section");
        if (!e)
            return;
        const t = e.querySelectorAll(".approach-principle")
          , s = e.querySelectorAll(".approach-slide")
          , i = e.querySelector(".approach-section__progress-current")
          , o = e.querySelector(".approach-section__progress-fill")
          , r = t.length;
        r && t.forEach(function(e) {
            e.addEventListener("click", function() {
                const n = parseInt(e.dataset.index, 10);
                e.classList.contains("is-active") || function(e) {
                    t.forEach(function(e) {
                        e.classList.remove("is-active")
                    }),
                    t[e].classList.add("is-active"),
                    s.forEach(function(e) {
                        e.classList.remove("is-active")
                    }),
                    s[e] && s[e].classList.add("is-active");
                    i && (i.textContent = String(e + 1).padStart(2, "0"));
                    o && (o.style.width = (e + 1) / r * 100 + "%")
                }(n)
            })
        })
    }
    function dt() {
        const e = document.querySelectorAll(".faq-kb-section");
        e.length && e.forEach(function(e) {
            const t = e.querySelectorAll(".faq-kb-filter")
              , s = e.querySelectorAll(".faq-kb-group");
            t.length && s.length && t.forEach(function(e) {
                e.addEventListener("click", function() {
                    const i = e.dataset.category;
                    t.forEach(function(e) {
                        e.classList.remove("is-active")
                    }),
                    e.classList.add("is-active"),
                    s.forEach(function(e) {
                        "all" === i || e.dataset.category === i ? e.classList.remove("is-hidden") : e.classList.add("is-hidden")
                    })
                })
            })
        })
    }
    let ut = [];
    function pt() {
        ft(),
        document.querySelectorAll(".testimonials-section").forEach(function(e) {
            mt(e, {
                modules: [_e, xe],
                effect: "fade",
                fadeEffect: {
                    crossFade: !0
                },
                slidesPerView: 1,
                speed: 500,
                loop: !0
            })
        }),
        document.querySelectorAll(".testimonials-slider-section").forEach(function(e) {
            mt(e, {
                modules: [_e],
                slidesPerView: 1.15,
                spaceBetween: 16,
                speed: 500,
                loop: !0,
                grabCursor: !0,
                breakpoints: {
                    641: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 24
                    }
                }
            })
        })
    }
    function ft() {
        ut.forEach(function(e) {
            try {
                e.destroy(!0, !0)
            } catch (e) {}
        }),
        ut = []
    }
    function mt(e, t) {
        const s = e.querySelector(".testimonials-slider");
        if (!s)
            return;
        const i = e.querySelector(".testimonials-arrow--prev")
          , o = e.querySelector(".testimonials-arrow--next")
          , r = e.querySelector(".testimonials-fraction__current");
        t.navigation = {
            prevEl: i,
            nextEl: o
        },
        t.keyboard = {
            enabled: !0
        },
        t.a11y = {
            enabled: !0
        },
        t.on = {
            slideChange: function() {
                gt(this, r)
            }
        };
        const n = new ye(s,t);
        ut.push(n),
        gt(n, r)
    }
    function gt(e, t) {
        if (!t)
            return;
        const s = e.realIndex + 1;
        t.textContent = s < 10 ? "0" + s : "" + s
    }
    function ht() {
        if ("undefined" == typeof gsap || "undefined" == typeof ScrollTrigger)
            return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;
        if (window.innerWidth < 768)
            return;
        gsap.registerPlugin(ScrollTrigger);
        const e = document.querySelector(".pf-stage");
        if (!e)
            return;
        const t = e.querySelector(".pf-stage__viewport")
          , s = e.querySelector(".pf-stage__intro")
          , i = e.querySelectorAll(".pf-slide")
          , o = e.querySelectorAll(".pf-stage__pip")
          , r = i.length;
        if (r < 1)
            return;
        const n = document.documentElement;
        let a = getComputedStyle(n)
          , l = parseFloat(a.getPropertyValue("--section-inset")) || 0
          , c = parseFloat(a.getPropertyValue("--header-height")) || 72
          , d = window.innerHeight - c - 2 * l;
        t.style.height = d + "px",
        window.addEventListener("resize", function() {
            a = getComputedStyle(n),
            l = parseFloat(a.getPropertyValue("--section-inset")) || 0,
            c = parseFloat(a.getPropertyValue("--header-height")) || 72,
            d = window.innerHeight - c - 2 * l,
            t.style.height = d + "px",
            ScrollTrigger.refresh()
        });
        const u = [];
        if (i.forEach(function(e) {
            const t = e.querySelector(".pf-slide__content-inner");
            u.push({
                el: e,
                bg: e.querySelector(".pf-slide__bg"),
                ghost: e.querySelector(".pf-slide__ghost-index"),
                line: e.querySelector(".pf-slide__accent-line"),
                kids: t ? Array.from(t.children) : []
            })
        }),
        u.forEach(function(e, t) {
            0 === t ? (gsap.set(e.el, {
                opacity: 1,
                visibility: "visible"
            }),
            e.el.classList.add("is-active"),
            e.kids.forEach(function(e) {
                gsap.set(e, {
                    opacity: 1,
                    y: 0
                })
            }),
            e.ghost && gsap.set(e.ghost, {
                opacity: 1,
                scale: 1,
                y: 0
            }),
            e.bg && gsap.set(e.bg, {
                scale: 1.12
            }),
            e.line && gsap.set(e.line, {
                scaleX: 0,
                transformOrigin: "left center"
            })) : (gsap.set(e.el, {
                opacity: 0,
                visibility: "hidden"
            }),
            e.kids.forEach(function(e) {
                gsap.set(e, {
                    opacity: 0,
                    y: 20
                })
            }),
            e.ghost && gsap.set(e.ghost, {
                opacity: 0,
                scale: .85,
                y: 50
            }),
            e.bg && gsap.set(e.bg, {
                scale: 1.12
            }),
            e.line && gsap.set(e.line, {
                scaleX: 0,
                transformOrigin: "left center"
            }))
        }),
        s && gsap.set(s, {
            opacity: 1,
            visibility: "visible"
        }),
        s) {
            const t = s.querySelector(".pf-stage__intro-inner");
            if (t) {
                const i = Array.from(t.children)
                  , o = s.querySelector(".pf-stage__intro-scroll-line");
                i.forEach(function(e) {
                    e.classList.add("is-revealing")
                }),
                gsap.set(i, {
                    opacity: 0,
                    y: 40
                }),
                o && gsap.set(o, {
                    scaleY: 0,
                    transformOrigin: "top center"
                });
                const r = gsap.timeline({
                    scrollTrigger: {
                        trigger: e,
                        start: "top 75%",
                        once: !0
                    }
                });
                r.to(i, {
                    opacity: 1,
                    y: 0,
                    duration: .9,
                    stagger: .12,
                    ease: "power3.out",
                    onComplete: function() {
                        i.forEach(function(e) {
                            e.classList.remove("is-revealing")
                        })
                    }
                }),
                o && r.to(o, {
                    scaleY: 1,
                    duration: .6,
                    ease: "power2.out"
                }, "-=0.3")
            }
        }
        const p = .1
          , f = .1;
        let m = 0
          , g = !0;
        function h(e, t) {
            let s = u[e];
            const i = _(b(t / .12));
            gsap.set(s.el, {
                opacity: i,
                visibility: "visible"
            });
            const o = s.kids.length;
            for (let e = 0; e < o; e++) {
                const i = .06 + .027 * e
                  , o = _(b((t - i) / (i + .24 - i)));
                gsap.set(s.kids[e], {
                    opacity: o,
                    y: 24 * (1 - o)
                })
            }
            if (s.ghost) {
                const e = _(b(t / .15))
                  , i = t > .15 ? (t - .15) / .85 * -25 : 0;
                gsap.set(s.ghost, {
                    opacity: e,
                    y: 55 * (1 - e) + i,
                    scale: .82 + .18 * e
                })
            }
            v(e, t)
        }
        function v(e, t) {
            let s = u[e];
            if (s.bg && gsap.set(s.bg, {
                scale: 1.12 - .12 * t
            }),
            s.line && gsap.set(s.line, {
                scaleX: b((t - .1) / .9)
            }),
            s.ghost && t > .15) {
                const e = (t - .15) / .85 * -25;
                gsap.set(s.ghost, {
                    y: e
                })
            }
        }
        function y(e, t) {
            let s = u[e];
            const i = (o = b(t / .08)) * o * o;
            var o;
            i < 1 ? gsap.set(s.el, {
                opacity: 1 - i,
                visibility: "visible"
            }) : gsap.set(s.el, {
                opacity: 0,
                visibility: "hidden"
            })
        }
        function w(e, t) {
            const s = window.innerWidth <= 900;
            for (let i = 0; i < o.length; i++) {
                const r = o[i]
                  , n = r.querySelector(".pf-stage__pip-fill");
                if (!n)
                    continue;
                let a;
                r.classList.remove("is-active", "is-done"),
                i < e ? (r.classList.add("is-done"),
                a = 100) : i === e ? (r.classList.add("is-active"),
                a = 100 * t) : a = 0,
                s ? (n.style.width = a + "%",
                n.style.height = "100%") : (n.style.height = a + "%",
                n.style.width = "100%")
            }
        }
        function b(e) {
            return e < 0 ? 0 : e > 1 ? 1 : e
        }
        function _(e) {
            return 1 - Math.pow(1 - e, 3)
        }
        ScrollTrigger.create({
            trigger: e,
            start: "top top+=" + (c + l),
            end: function() {
                return "+=" + (r + .6) * d * 1.2 + "px"
            },
            pin: t,
            scrub: !0,
            anticipatePin: 1,
            pinSpacing: !0,
            onUpdate: function(e) {
                const t = e.progress;
                if (s)
                    if (t < p) {
                        const e = (i = t / p) * i * (3 - 2 * i);
                        gsap.set(s, {
                            opacity: 1 - e,
                            scale: 1 + .06 * e,
                            visibility: "visible"
                        })
                    } else
                        gsap.set(s, {
                            opacity: 0,
                            visibility: "hidden"
                        });
                var i;
                if (t < p) {
                    return v(0, t / p * .1),
                    void w(0, 0)
                }
                const o = (t - p) / .9 * r
                  , n = Math.min(Math.floor(o), r - 1);
                let a = o - n;
                n >= r - 1 && (a = Math.min(a, 1)),
                n !== m && (0 === m && (g = !1),
                0 === n && 1 === m && (g = !1),
                function(e, t) {
                    u[e].el.classList.remove("is-active"),
                    u[t].el.classList.add("is-active");
                    const s = u[t];
                    gsap.set(s.el, {
                        visibility: "visible"
                    }),
                    s.bg && gsap.set(s.bg, {
                        scale: 1.12
                    });
                    s.line && gsap.set(s.line, {
                        scaleX: 0
                    })
                }(m, n),
                m = n),
                function(e, t) {
                    for (let s = 0; s < r; s++)
                        if (s === e)
                            if (0 === s && g) {
                                const e = f + .9 * t;
                                gsap.set(u[0].el, {
                                    opacity: 1,
                                    visibility: "visible"
                                }),
                                v(0, e)
                            } else
                                h(s, t);
                        else
                            s === e - 1 ? y(s, t) : gsap.set(u[s].el, {
                                opacity: 0,
                                visibility: "hidden"
                            })
                }(n, a),
                w(n, a)
            }
        })
    }
    function vt() {
        const e = document.querySelectorAll(".job-row");
        e.length && e.forEach(function(t) {
            const s = t.querySelector(".job-row__header");
            s && s.addEventListener("click", function() {
                const i = t.classList.contains("is-open");
                e.forEach(function(e) {
                    if (e !== t && e.classList.contains("is-open")) {
                        e.classList.remove("is-open");
                        const t = e.querySelector(".job-row__header");
                        let s = e.querySelector(".job-row__panel");
                        t && t.setAttribute("aria-expanded", "false"),
                        s && s.setAttribute("aria-hidden", "true")
                    }
                }),
                t.classList.toggle("is-open", !i),
                s.setAttribute("aria-expanded", String(!i));
                let o = t.querySelector(".job-row__panel");
                o && o.setAttribute("aria-hidden", String(i)),
                "undefined" != typeof ScrollTrigger && setTimeout(function() {
                    ScrollTrigger.refresh()
                }, 500)
            })
        })
    }
    let yt = [];
    function wt() {
        bt();
        const e = document.querySelectorAll("[data-compare]");
        e.length && e.forEach(function(e) {
            const t = e.querySelector(".pm-compare__layer--after")
              , s = e.querySelector(".pm-compare__handle");
            if (!t || !s)
                return;
            let i = !1
              , o = 50;
            function r(e) {
                e < 0 && (e = 0),
                e > 100 && (e = 100),
                o = Math.round(e),
                t.style.clipPath = "inset(0 0 0 " + e + "%)",
                s.style.left = e + "%",
                s.setAttribute("aria-valuenow", String(o))
            }
            function n(t) {
                const s = e.getBoundingClientRect();
                return ((t.touches ? t.touches[0].clientX : t.clientX) - s.left) / s.width * 100
            }
            function a(e) {
                i = !0,
                r(n(e)),
                e.preventDefault()
            }
            function l(e) {
                i && (r(n(e)),
                e.preventDefault())
            }
            function c() {
                i = !1
            }
            s.setAttribute("tabindex", "0"),
            s.setAttribute("role", "slider"),
            s.setAttribute("aria-label", "Compare images"),
            s.setAttribute("aria-valuemin", "0"),
            s.setAttribute("aria-valuemax", "100"),
            s.setAttribute("aria-valuenow", "50"),
            s.addEventListener("keydown", function(e) {
                switch (e.key) {
                case "ArrowLeft":
                case "ArrowDown":
                    e.preventDefault(),
                    r(o - 5);
                    break;
                case "ArrowRight":
                case "ArrowUp":
                    e.preventDefault(),
                    r(o + 5);
                    break;
                case "Home":
                    e.preventDefault(),
                    r(0);
                    break;
                case "End":
                    e.preventDefault(),
                    r(100)
                }
            }),
            e.addEventListener("mousedown", a),
            e.addEventListener("touchstart", a, {
                passive: !1
            }),
            window.addEventListener("mousemove", l),
            window.addEventListener("touchmove", l, {
                passive: !1
            }),
            window.addEventListener("mouseup", c),
            window.addEventListener("touchend", c),
            yt.push(function() {
                window.removeEventListener("mousemove", l),
                window.removeEventListener("touchmove", l),
                window.removeEventListener("mouseup", c),
                window.removeEventListener("touchend", c)
            })
        })
    }
    function bt() {
        yt.forEach(function(e) {
            e()
        }),
        yt = []
    }
    function _t() {
        document.querySelectorAll(".process-steps-section").forEach(function(e) {
            const t = e.querySelector(".process-steps-track")
              , s = e.querySelector(".process-steps-section__progress-fill")
              , i = e.querySelectorAll(".process-steps-section__progress-dot")
              , o = e.querySelector(".process-steps-section__counter-current")
              , r = e.querySelectorAll(".pstep-card")
              , n = r.length;
            function a() {
                const e = t.scrollLeft
                  , a = t.scrollWidth - t.clientWidth
                  , l = a > 0 ? e / a : 0;
                s && (s.style.width = 100 * l + "%");
                const c = r[0].offsetWidth + parseInt(getComputedStyle(t).gap, 10) || 20;
                let d = Math.round(e / c);
                d = Math.max(0, Math.min(d, n - 1)),
                r.forEach(function(e, t) {
                    e.classList.toggle("is-active", t === d)
                }),
                i.forEach(function(e, t) {
                    e.classList.toggle("is-active", t <= d)
                }),
                o && (o.textContent = String(d + 1).padStart(2, "0"))
            }
            !t || n < 1 || (t.addEventListener("scroll", function() {
                requestAnimationFrame(a)
            }, {
                passive: !0
            }),
            a())
        })
    }
    function St() {
        if ("undefined" == typeof GLightbox)
            return;
        document.querySelectorAll(".entry-content img:not(a img):not(.no-lightbox), .project-gallery__item img").forEach(function(e) {
            if (e.closest("a")) {
                const t = e.closest("a")
                  , s = t.getAttribute("href") || "";
                return void (/\.(jpg|jpeg|png|gif|webp|avif|svg)(\?|$)/i.test(s) && (t.classList.add("glightbox"),
                t.getAttribute("data-gallery") || t.setAttribute("data-gallery", "content")))
            }
            const t = e.getAttribute("data-src") || e.getAttribute("src");
            if (!t)
                return;
            let s = e.dataset.full || e.dataset.largeSrc || t;
            const i = e.getAttribute("srcset");
            if (i) {
                const e = i.split(",").map(function(e) {
                    return e.trim()
                })
                  , t = e[e.length - 1];
                if (t) {
                    const e = t.split(/\s+/);
                    e[0] && (s = e[0])
                }
            }
            const o = document.createElement("a");
            o.href = s,
            o.classList.add("glightbox"),
            o.setAttribute("data-gallery", "content"),
            e.parentNode.insertBefore(o, e),
            o.appendChild(e)
        }),
        document.querySelectorAll(".project-gallery__item a.glightbox").forEach(function(e) {
            e.setAttribute("data-gallery", "project")
        }),
        GLightbox({
            selector: ".glightbox",
            touchNavigation: !0,
            loop: !0,
            autoplayVideos: !1,
            openEffect: "fade",
            closeEffect: "fade",
            cssEfects: {
                fade: {
                    in: "fadeIn",
                    out: "fadeOut"
                }
            }
        })
    }
    const Et = {
        home: "Home",
        portfolio: "Portfolio",
        project: "Case Study",
        contact: "Contact",
        about: "About",
        services: "Services",
        post: "Journal",
        blog: "Blog",
        search: "Search",
        error: "404"
    };
    function Tt() {
        if ("undefined" == typeof barba)
            return;
        if ("undefined" == typeof OvaneConfig || !OvaneConfig.transitions || !OvaneConfig.transitions.enable)
            return;
        const t = (OvaneConfig.transitions.duration || 400) / 1e3
          , o = document.querySelector(".barba-loading")
          , r = document.querySelector(".barba-page-loader");
        "undefined" != typeof barbaPrefetch && OvaneConfig.transitions.prefetch && barba.use(barbaPrefetch),
        barba.init({
            timeout: 8e3,
            prevent: function(e) {
                const t = e.el;
                if (!t)
                    return !1;
                const s = t.getAttribute("href") || "";
                return -1 !== s.indexOf("/wp-admin") || -1 !== s.indexOf("/wp-login") || -1 !== s.indexOf("?customize_changeset_uuid") || t.classList.contains("no-barba") || t.hasAttribute("download") || "_blank" === t.getAttribute("target")
            },
            transitions: [{
                name: "fade",
                leave: function(s) {
                    e.smoother && e.smoother.paused(!0);
                    let i = document.querySelector(".site-header");
                    i && i.classList.add("nav-closing"),
                    nt(),
                    o && o.classList.add("is-active"),
                    r && r.classList.add("is-active");
                    let n = document.querySelector(".cursor");
                    return n && (n.classList.remove("is-link", "is-media", "is-card"),
                    n.classList.add("is-loading")),
                    new Promise(function(e) {
                        s.current.container.style.transition = "opacity " + t + "s ease",
                        s.current.container.style.opacity = "0",
                        setTimeout(e, 1e3 * t)
                    }
                    )
                },
                enter: function(e) {
                    o && (o.classList.remove("is-active"),
                    o.classList.add("is-done"),
                    setTimeout(function() {
                        o.classList.remove("is-done")
                    }, 400)),
                    r && r.classList.remove("is-active");
                    let s = document.querySelector(".cursor");
                    s && s.classList.remove("is-loading"),
                    e.next.container.style.opacity = "0",
                    e.next.container.style.transition = "opacity " + t + "s ease",
                    e.next.container.offsetHeight,
                    e.next.container.style.opacity = "1"
                },
                after: function(t) {
                    nt();
                    let o = document.querySelector(".site-header");
                    if (o && (o.classList.remove("is-scrolled"),
                    o.classList.add("nav-idle"),
                    o.classList.remove("nav-closing"),
                    document.addEventListener("mousemove", function e() {
                        document.removeEventListener("mousemove", e),
                        setTimeout(function() {
                            o && o.classList.remove("nav-idle")
                        }, 150)
                    }, {
                        once: !0
                    })),
                    e.smoother ? (e.smoother.scrollTo(0, !1),
                    e.smoother.paused(!1)) : window.scrollTo(0, 0),
                    t.next.html) {
                        const e = t.next.html.match(/<body[^>]*class="([^"]*)"/);
                        e && e[1] && (document.body.className = e[1],
                        document.body.classList.add("js-nav-ready"),
                        document.getElementById("wpadminbar") && document.body.classList.add("admin-bar"))
                    }
                    tt();
                    const r = document.querySelector(".jk-ambient-nav-label");
                    if (r) {
                        const e = t.next.container.dataset.barbaNamespace || ""
                          , s = Et[e] || "";
                        r.textContent = s,
                        r.style.display = s ? "" : "none"
                    }
                    ft(),
                    qe(),
                    je(),
                    Ge(),
                    bt(),
                    We && (We.destroy(),
                    We = null),
                    Pe && (Pe.destroy(),
                    Pe = null),
                    e.splitInstances.forEach(function(e) {
                        try {
                            e.revert()
                        } catch (e) {}
                    }),
                    e.splitInstances = [],
                    "undefined" != typeof ScrollTrigger && ScrollTrigger.getAll().forEach(function(e) {
                        e.kill()
                    }),
                    s(),
                    o && (o.classList.remove("is-scrolled"),
                    window.scrollY > 50 && o.classList.add("is-scrolled")),
                    i(),
                    Ye(),
                    Qe(),
                    et(),
                    Fe(),
                    He(),
                    Ze(),
                    u(),
                    m(),
                    Ue(),
                    Ie(),
                    ke(),
                    Me(),
                    lt(),
                    ct(),
                    dt(),
                    pt(),
                    ht(),
                    vt(),
                    p(),
                    wt(),
                    _t(),
                    ze(),
                    De(),
                    St(),
                    document.querySelectorAll("video[autoplay]").forEach(function(e) {
                        e.play().catch(function() {})
                    }),
                    "undefined" != typeof a2a && ("undefined" != typeof a2a_config && (a2a_config.linkurl = window.location.href,
                    a2a_config.linkname = document.title),
                    document.querySelectorAll(".a2a_kit").forEach(function(e) {
                        e.querySelectorAll(".a2a_svg, .a2a_count").forEach(function(e) {
                            e.remove()
                        }),
                        e.querySelectorAll(".a2a_dd").forEach(function(e) {
                            e.innerHTML = "",
                            e.removeAttribute("href")
                        }),
                        e.classList.remove("a2a_kit_size_32"),
                        e.removeAttribute("data-a2a-url"),
                        e.removeAttribute("data-a2a-title")
                    }),
                    a2a.kit_instances && (a2a.kit_instances = []),
                    "function" == typeof a2a.init_all ? a2a.init_all("page") : "function" == typeof a2a.init && a2a.init("page")),
                    "undefined" != typeof ScrollTrigger && requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            ScrollTrigger.refresh()
                        })
                    })
                }
            }]
        })
    }
    let Lt = !1;
    function xt() {
        if (Lt)
            return;
        const e = document.getElementById("newsletter-modal");
        if (!e)
            return;
        Lt = !0;
        const t = e.querySelector(".nl-modal__close")
          , s = e.querySelector(".nl-modal__backdrop");
        let i = !1
          , r = !1
          , n = null
          , a = null;
        const l = parseInt(e.dataset.triggerScroll, 10) || 0
          , c = parseInt(e.dataset.triggerDelay, 10) || 0
          , d = "1" === e.dataset.triggerExit
          , u = e.dataset.frequency || "session";
        function p() {
            i || (n = document.activeElement,
            i = !0,
            e.classList.add("is-open"),
            e.setAttribute("aria-hidden", "false"),
            document.body.style.overflow = "hidden",
            setTimeout(function() {
                const t = e.querySelector('input[type="email"], input[type="text"], input:not([type="hidden"])');
                t && t.focus(),
                a = o(e)
            }, 400))
        }
        function f() {
            i && (i = !1,
            e.classList.remove("is-open"),
            e.setAttribute("aria-hidden", "true"),
            document.body.style.overflow = "",
            a && (a(),
            a = null),
            n?.focus && (n.focus(),
            n = null),
            "#newsletter" === window.location.hash && history.replaceState(null, "", window.location.pathname + window.location.search))
        }
        function m() {
            r || i || function() {
                if ("always" === u)
                    return !0;
                let e = "ovane-nl-modal-seen";
                const t = localStorage.getItem(e);
                if (!t)
                    return !0;
                const s = parseInt(t, 10)
                  , i = Date.now();
                switch (u) {
                case "session":
                    return !sessionStorage.getItem(e);
                case "daily":
                    return i - s > 864e5;
                case "weekly":
                    return i - s > 6048e5;
                case "once":
                    return !1;
                default:
                    return !0
                }
            }() && (r = !0,
            function() {
                let e = "ovane-nl-modal-seen";
                localStorage.setItem(e, String(Date.now())),
                sessionStorage.setItem(e, "1")
            }(),
            p())
        }
        t && t.addEventListener("click", f),
        s && s.addEventListener("click", f),
        document.addEventListener("keydown", function(e) {
            "Escape" === e.key && i && f()
        }),
        document.addEventListener("click", function(e) {
            const t = e.target.closest('a[href*="#newsletter"]');
            if (!t)
                return;
            let s = t.getAttribute("href");
            ("#newsletter" === s || s.endsWith("#newsletter")) && (e.preventDefault(),
            p())
        }),
        "#newsletter" === window.location.hash && setTimeout(p, 300),
        window.addEventListener("hashchange", function() {
            "#newsletter" === window.location.hash && p()
        }),
        l > 0 && window.addEventListener("scroll", function e() {
            const t = window.pageYOffset
              , s = document.documentElement.scrollHeight - window.innerHeight;
            if (s <= 0)
                return;
            t / s * 100 >= l && (window.removeEventListener("scroll", e),
            m())
        }, {
            passive: !0
        }),
        c > 0 && setTimeout(function() {
            m()
        }, 1e3 * c),
        d && window.matchMedia("(pointer: fine)").matches && document.addEventListener("mouseout", function e(t) {
            t.clientY <= 0 && null === t.relatedTarget && (document.removeEventListener("mouseout", e),
            m())
        })
    }
    let Ct = !1;
    function kt() {
        Ct || (Ct = !0,
        document.addEventListener("submit", function(e) {
            const t = e.target;
            (t.classList.contains("mc4wp-form") || t.querySelector('[name="_mc4wp_form_id"]')) && (e.preventDefault(),
            function(e) {
                const t = e.querySelector('input[type="submit"], button[type="submit"]');
                let s = e.querySelector(".mc4wp-response");
                t && (t.classList.add("is-loading"),
                t.disabled = !0);
                s && (s.innerHTML = "");
                e.classList.remove("mc4wp-form-submitted");
                const i = new FormData(e);
                fetch("/wp-json/mc4wp/v1/form", {
                    method: "POST",
                    body: new URLSearchParams(i),
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                        Accept: "application/json"
                    }
                }).then(function(e) {
                    return e.json().then(function(t) {
                        return {
                            ok: e.ok,
                            data: t
                        }
                    })
                }).then(function(t) {
                    const i = t.ok
                      , o = t.data;
                    if (e.classList.add("mc4wp-form-submitted"),
                    s || (s = document.createElement("div"),
                    s.className = "mc4wp-response",
                    e.appendChild(s)),
                    i) {
                        s.innerHTML = '<div class="mc4wp-alert mc4wp-success" role="alert"><p>' + At(function(e) {
                            let t = e.getAttribute("data-success") || e.dataset.success;
                            if (t)
                                return t;
                            if (window.mc4wp_forms_config && window.mc4wp_forms_config.messages)
                                return window.mc4wp_forms_config.messages.subscribed || "Thank you! You have been subscribed.";
                            return "Thank you! You have been subscribed."
                        }(e)) + "</p></div>";
                        const t = e.querySelector('input[type="email"]');
                        t && (t.value = "")
                    } else {
                        const t = o && o.message ? o.message : qt(e);
                        s.innerHTML = '<div class="mc4wp-alert mc4wp-error" role="alert"><p>' + At(t) + "</p></div>"
                    }
                }).catch(function() {
                    s && (s.innerHTML = '<div class="mc4wp-alert mc4wp-error" role="alert"><p>' + At(qt(e)) + "</p></div>")
                }).finally(function() {
                    t && (t.classList.remove("is-loading"),
                    t.disabled = !1)
                })
            }(t))
        }))
    }
    function qt(e) {
        let t = e.getAttribute("data-error") || e.dataset.error;
        return t || (window.mc4wp_forms_config && window.mc4wp_forms_config.messages && window.mc4wp_forms_config.messages.error || "Something went wrong. Please try again.")
    }
    function At(e) {
        const t = document.createElement("div");
        return t.textContent = e,
        t.innerHTML
    }
    let Mt = !1;
    function Pt() {
        document.addEventListener("click", function(e) {
            const t = e.target.closest(".post-share__copy-link");
            if (!t)
                return;
            e.preventDefault(),
            e.stopImmediatePropagation();
            const s = t.dataset.url || window.location.href
              , i = window.scrollY;
            (function(e) {
                if (navigator.clipboard && window.isSecureContext)
                    return navigator.clipboard.writeText(e);
                return new Promise(function(t) {
                    const s = document.createElement("textarea");
                    s.value = e,
                    s.setAttribute("readonly", ""),
                    s.style.cssText = "position:fixed;left:-9999px;top:-9999px;opacity:0;pointer-events:none;",
                    document.body.appendChild(s);
                    const i = document.getSelection()
                      , o = document.createRange();
                    o.selectNodeContents(s),
                    i.removeAllRanges(),
                    i.addRange(o),
                    s.setSelectionRange(0, e.length),
                    document.execCommand("copy"),
                    i.removeAllRanges(),
                    document.body.removeChild(s),
                    t()
                }
                )
            }
            )(s).then(function() {
                window.scrollTo(0, i);
                const e = t.querySelector(".post-share__copy-text")
                  , s = t.querySelector("i")
                  , o = e?.textContent ?? ""
                  , r = s?.className ?? "";
                t.classList.add("is-copied"),
                e && (e.textContent = "Copied!"),
                s && (s.className = "ti ti-check"),
                function(e) {
                    const t = document.querySelector(".jkd-toast");
                    t && t.remove();
                    const s = document.createElement("div");
                    s.className = "jkd-toast",
                    s.textContent = e,
                    document.body.appendChild(s),
                    requestAnimationFrame(function() {
                        requestAnimationFrame(function() {
                            s.classList.add("is-visible")
                        })
                    }),
                    setTimeout(function() {
                        s.classList.remove("is-visible"),
                        setTimeout(function() {
                            s.remove()
                        }, 300)
                    }, 2500)
                }("Link copied to clipboard"),
                setTimeout(function() {
                    t.classList.remove("is-copied"),
                    e && (e.textContent = o),
                    s && (s.className = r)
                }, 2e3)
            })
        }, !0)
    }
    function It() {
        Ye(),
        Ue(),
        Ie(),
        Qe(),
        et(),
        Fe(),
        He(),
        Ze(),
        ht()
    }
    document.addEventListener("DOMContentLoaded", function() {
        !function() {
            const e = document.getElementById("jk-preloader");
            if (!e)
                return;
            if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
                return e.style.display = "none",
                void document.dispatchEvent(new CustomEvent("jk:preloader:done"));
            const t = e.querySelectorAll(".jk-preloader__name, .jk-preloader__tagline, .jk-preloader__ambient-tl, .jk-preloader__ambient-tr, .jk-preloader__ambient-br");
            "undefined" != typeof gsap ? gsap.to(t, {
                opacity: .85,
                duration: .6,
                stagger: .08,
                ease: "power2.out",
                delay: .1
            }) : t.forEach(function(e) {
                e.style.transition = "opacity 0.5s ease",
                e.style.opacity = "0.85"
            })
        }(),
        function() {
            const e = document.querySelector(".jk-ambient-hero-meta__clock");
            if (!e)
                return;
            const t = parseFloat(e.dataset.utcOffset) || 0
              , s = e.querySelector(".jk-ambient-hero-meta__tz")
              , i = s ? " " + s.textContent.trim() : "";
            function o() {
                const s = new Date
                  , o = s.getTime() + 6e4 * s.getTimezoneOffset()
                  , r = new Date(o + 36e5 * t)
                  , n = String(r.getHours()).padStart(2, "0")
                  , a = String(r.getMinutes()).padStart(2, "0");
                e.innerHTML = n + ":" + a + (i ? ' <span class="jk-ambient-hero-meta__tz">' + i.trim() + "</span>" : "")
            }
            o(),
            setInterval(o, 3e4)
        }(),
        function() {
            const e = document.querySelector(".theme-toggle");
            if (!e)
                return;
            const t = localStorage.getItem("ovane-theme")
              , s = window.matchMedia("(prefers-color-scheme: dark)").matches
              , i = t || (s ? "dark" : "light");
            function o(e) {
                document.documentElement.setAttribute("data-theme-switching", ""),
                document.documentElement.setAttribute("data-theme", e),
                setTimeout(function() {
                    document.documentElement.removeAttribute("data-theme-switching")
                }, 350)
            }
            document.documentElement.setAttribute("data-theme", i),
            e.setAttribute("aria-pressed", "dark" === i ? "true" : "false"),
            e.addEventListener("click", function() {
                const t = "dark" === document.documentElement.getAttribute("data-theme") ? "light" : "dark";
                o(t),
                localStorage.setItem("ovane-theme", t),
                e.setAttribute("aria-pressed", "dark" === t ? "true" : "false")
            }),
            window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(t) {
                if (!localStorage.getItem("ovane-theme")) {
                    const s = t.matches;
                    o(s ? "dark" : "light"),
                    e.setAttribute("aria-pressed", s ? "true" : "false")
                }
            })
        }(),
        s(),
        i(),
        function() {
            const t = document.querySelector(".back-to-top");
            if (!t)
                return;
            let s = !1;
            function i() {
                window.scrollY > 300 ? t.classList.add("is-visible") : t.classList.remove("is-visible"),
                s = !1
            }
            window.addEventListener("scroll", function() {
                s || (requestAnimationFrame(i),
                s = !0)
            }, {
                passive: !0
            }),
            t.addEventListener("click", function(t) {
                t.preventDefault(),
                e.smoother ? e.smoother.scrollTo(0, !0) : window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }),
            i()
        }(),
        function() {
            const t = document.querySelector(".site-header")
              , s = t?.getBoundingClientRect().height ?? 72;
            document.addEventListener("click", function(t) {
                const i = t.target.closest('a[href^="#"]');
                if (!i)
                    return;
                const o = i.getAttribute("href");
                if ("#" === o || o.length <= 1)
                    return;
                const r = document.querySelector(o);
                if (r)
                    if (t.preventDefault(),
                    e.smoother)
                        e.smoother.scrollTo(r, !0, "top -" + (s + 16));
                    else {
                        const e = r.getBoundingClientRect().top + window.scrollY - s - 16;
                        window.scrollTo({
                            top: e,
                            behavior: "smooth"
                        })
                    }
            })
        }(),
        r(),
        at(),
        tt(),
        a(),
        function() {
            if (l)
                return;
            const e = document.querySelector(".scroll-progress");
            if (!e)
                return;
            l = !0;
            const t = e.querySelector(".scroll-progress__fill")
              , s = e.querySelector(".scroll-progress__label");
            if (!t || !s)
                return;
            let i = !1;
            function o() {
                const o = window.pageYOffset
                  , r = document.documentElement.scrollHeight - window.innerHeight;
                if (r < .5 * window.innerHeight)
                    return e.classList.remove("is-visible"),
                    void (i = !1);
                const n = r > 0 ? Math.round(o / r * 100) : 0;
                t.style.height = n + "%",
                s.textContent = n + "%",
                o > 100 ? e.classList.add("is-visible") : e.classList.remove("is-visible"),
                i = !1
            }
            window.addEventListener("scroll", function() {
                i || (requestAnimationFrame(o),
                i = !0)
            }, {
                passive: !0
            }),
            o()
        }(),
        u(),
        p(),
        m(),
        ke(),
        Me(),
        wt(),
        Ne || (Ne = !0,
        document.addEventListener("click", function(e) {
            let t = e.target.closest(".load-more-btn");
            if (!t || t.disabled)
                return;
            const s = t.closest(".load-more-wrap");
            if (!s)
                return;
            const i = s.dataset.postType
              , o = parseInt(s.dataset.page, 10) + 1;
            t.disabled = !0,
            t.classList.add("is-loading");
            const r = "post" === i ? "jkd_load_more_posts" : "jkd_load_more_portfolio";
            let n = s.parentElement
              , a = n?.querySelector(".blog-archive-list__grid, .portfolio-archive-list__cards") ?? null
              , l = "";
            if (a) {
                const e = a.className.match(/blog-archive-list__grid--(\w+)/);
                e && (l = e[1])
            }
            const c = new URLSearchParams({
                action: r,
                nonce: OvaneConfig.nonce,
                page: o,
                blog_style: l
            });
            fetch(OvaneConfig.ajaxUrl, {
                method: "POST",
                body: c,
                credentials: "same-origin"
            }).then(function(e) {
                if (!e.ok)
                    throw new Error(e.status);
                return e.json()
            }).then(function(e) {
                if (!e.success)
                    return void Re(s);
                let i = s.parentElement;
                const r = i.querySelector(".blog-carousel-swiper .swiper-wrapper")
                  , n = i.querySelector(".portfolio-carousel-swiper .swiper-wrapper")
                  , a = r || n;
                let l = a || i.querySelector(".blog-archive-list__grid, .portfolio-archive-list__cards");
                if (l) {
                    const t = l.children.length;
                    if (a) {
                        const t = document.createElement("div");
                        t.innerHTML = e.data.html,
                        t.querySelectorAll(".post-card, .project-card").forEach(function(e) {
                            const t = document.createElement("div");
                            t.className = "swiper-slide",
                            t.appendChild(e),
                            a.appendChild(t)
                        })
                    } else
                        l.insertAdjacentHTML("beforeend", e.data.html);
                    const s = Array.from(l.children).slice(t);
                    s.forEach(function(e) {
                        e.classList.add("is-revealed")
                    }),
                    s.length && "undefined" != typeof gsap && !window.matchMedia("(prefers-reduced-motion: reduce)").matches && (gsap.set(s, {
                        opacity: 0,
                        y: 16
                    }),
                    gsap.to(s, {
                        opacity: 1,
                        y: 0,
                        duration: .5,
                        stagger: .08,
                        ease: "power2.out",
                        onComplete: function() {
                            s.forEach(function(e) {
                                e.style.opacity = "",
                                e.style.transform = ""
                            })
                        }
                    }));
                    let i = document.getElementById("load-more-live");
                    i || (i = document.createElement("div"),
                    i.id = "load-more-live",
                    i.className = "sr-only",
                    i.setAttribute("aria-live", "polite"),
                    i.setAttribute("aria-atomic", "true"),
                    document.body.appendChild(i)),
                    i.textContent = s.length + " new items loaded",
                    r && ze(),
                    n && (Ge(),
                    De())
                }
                s.dataset.page = o,
                e.data.has_more ? (t.disabled = !1,
                t.classList.remove("is-loading")) : Re(s),
                Ie(),
                He(),
                "undefined" != typeof ScrollTrigger && ScrollTrigger.refresh()
            }).catch(function() {
                t.disabled = !1,
                t.classList.remove("is-loading")
            })
        })),
        xt(),
        kt(),
        lt(),
        dt(),
        pt(),
        ct(),
        vt(),
        _t(),
        ze(),
        De(),
        Mt || (Mt = !0,
        document.addEventListener("click", function(e) {
            const t = e.target.closest(".post-engagement__like-btn");
            if (!t || t.disabled)
                return;
            const s = t.closest(".post-engagement");
            if (!s)
                return;
            const i = s.dataset.postId;
            if (!i)
                return;
            t.disabled = !0;
            const o = new URLSearchParams({
                action: "jkd_toggle_like",
                nonce: OvaneConfig.nonce,
                post_id: i
            });
            fetch(OvaneConfig.ajaxUrl, {
                method: "POST",
                body: o,
                credentials: "same-origin"
            }).then(function(e) {
                if (!e.ok)
                    throw new Error(e.status);
                return e.json()
            }).then(function(e) {
                if (!e.success)
                    return;
                t.querySelector(".ti");
                const s = t.querySelector(".post-engagement__like-count");
                e.data.liked ? t.classList.add("is-liked") : t.classList.remove("is-liked"),
                s && (s.textContent = e.data.likes),
                t.classList.add("is-animating"),
                setTimeout(function() {
                    t.classList.remove("is-animating")
                }, 400)
            }).finally(function() {
                t.disabled = !1
            })
        })),
        St(),
        Pt(),
        document.getElementById("jk-preloader") ? document.addEventListener("jk:preloader:done", function() {
            It(),
            Tt()
        }, {
            once: !0
        }) : (It(),
        Tt())
    })
}
)();
