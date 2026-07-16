

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
visual.from(".visual_wrap p", {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: "power3.out"
});
visual.to(".laptop_img", {

  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 3,
  ease: "power3.out"
});

// Scale out and fade
visual.to(".visual_wrap_inner", {
  scale: 100,
  duration: 3,
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

gsap.to(".skill_wrap ul li", {
  transform: 'translate(0px, 0px)',
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".skill_wrap",
    toggleActions: "play pause reverse pause", // The parent section controlling the bounds
    start: "top 80%",
    end: "top 40%",
    scrub: true,               // Syncs smoothly with the scroll momentum
  }
});
gsap.from(".service_box", {
  transform: 'translateX(calc(var(--padding) / -1))',
  ease: "power2.inOut",
  stagger: 2,
  opacity: 0,
  duration: 5,
  scrollTrigger: {
    trigger: ".service_wrap",
    toggleActions: "play pause reverse pause", // The parent section controlling the bounds
    start: "top 50%",
    end: "top 10%",
    scrub: true,               // Syncs smoothly with the scroll momentum
  }
});
gsap.from(".service_left img", {
  transform: 'translateX(-50%)',
  ease: "power2.inOut",
  duration: 5,
  scrollTrigger: {
    trigger: ".service_wrap",
    toggleActions: "play pause reverse pause", // The parent section controlling the bounds
    start: "top 100%",
    end: "top 0%",
    scrub: true,               // Syncs smoothly with the scroll momentum
  }
});
// gsap.to(".service_wrap .heading", {
//   transform: 'translate(0px, 0px)',
//    duration: 1,
//   ease: "power2.inOut",
//   scrollTrigger: {
//     trigger: ".service_wrap", // The parent section controlling the bounds
//     start: "top 50%",
//     end: "+=50%",
//     scrub: true,               // Syncs smoothly with the scroll momentum
//   }
// });




