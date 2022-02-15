gsap.registerPlugin(ScrollTrigger);
gsap.to(".cloud-1", {
  x: -450,

  scrollTrigger: {
    trigger: ".header",
    start: "top top",
    end: "+=600",
    scrub: 1,
  },
});
gsap.to(".cloud-2", {
  x: 450,

  scrollTrigger: {
    trigger: ".header",
    start: "top top",
    end: "+=600",
    scrub: 1,
  },
});
gsap.to(".cloud-3", {
  x: -450,

  scrollTrigger: {
    trigger: ".header",
    start: "top top",
    end: "+=600",
    scrub: 1,
  },
});
gsap.to(".cloud-4", {
  x: 450,

  scrollTrigger: {
    trigger: ".header",
    start: "top top",
    end: "+=600",
    scrub: 1,
  },
});

gsap.from(".activating-dot", {
  opacity: 0,
  stagger: 0.2,
  repeat: -1,
  transformOrigin: "50%",
});

// activate
$(".btn-activate").click(async () => {
  $(".activating").removeClass("d-none");
  await signAndSendMessage()
  $(".activating").addClass("d-none");
});
