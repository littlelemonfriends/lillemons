if(lemons_changed.lemons.length >= 3) {
	var swiper = new Swiper(".mySwiper", {
	  freeMode: true,
	  loop: true,
	  grabCursor: true,

	  autoplay: {
	    delay: 0,
	    disableOnInteraction: false,
	  },
	  speed: 5000,
	  slidesPerView: 2.5,
	  spaceBetween: 20,
	  breakpoints: {
	    // when window width is >= 450px
	    450: {
	      slidesPerView: 3,
	      spaceBetween: 40,
	    },
	    // when window width is >= 767px
	    767: {
	      slidesPerView: 4,
	      spaceBetween: 40,
	    },
	    // when window width is >= 1200px
	    1200: {
	      slidesPerView: 4,
	      spaceBetween: 70,
	    },
	  },
	});
}
var swiper = new Swiper(".mySwiper", {
  freeMode: true,
  loop: false,
  grabCursor: true,
  centerInsufficientSlides: true,

  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 5000,
  slidesPerView: 2.5,
  spaceBetween: 20,
  breakpoints: {
    // when window width is >= 450px
    450: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    // when window width is >= 767px
    767: {
      slidesPerView: 4,
      spaceBetween: 40,
    },
    // when window width is >= 1200px
    1200: {
      slidesPerView: 4,
      spaceBetween: 70,
    },
  },
});
