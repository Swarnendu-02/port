

var headerheight = $('.home-header').height();
// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, CustomEase);
$(document).ready(function () {
  var headerheight = $(".home-header").offsetHeight();
  alert(headerheight);
});
// Smooth active
ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1
});

let visual = gsap.timeline({
  scrollTrigger: {
    trigger: ".visual_wrap",
    start: "top top",
    end: "+=300%",
    scrub: 1,
    pin: true,
    pinSpacing: true,
    // markers: true
  }
});

// Reveal laptop image
visual.to(".laptop_img", {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 1,
  ease: "power3.out"
});
visual.from(".visual_wrap p", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});
// Scale out and fade
visual.to(".visual_wrap_inner", {
  scale: 100,
  ease: "power2.in"
});

gsap.to(".project_top", {
  scrollTrigger: {
    trigger: ".project_wrap", // The parent section controlling the bounds
    start: "top top",             // Pins when the top of container hits top of viewport
    end: "bottom bottom",         // Unpins when the bottom of container hits bottom of viewport
    pin: ".project_top",       // The element you want to stick
    pinSpacing: false,            // Prevents pushing down subsequent content
    scrub: true                   // Syncs smoothly with the scroll momentum
  }
});




