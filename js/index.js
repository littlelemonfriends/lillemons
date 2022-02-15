$(document).ready(function () {
  // ==
  // lemon click
  $("#btnAdventureLemon").click(function () {
    $(".adventureLemon").addClass("scaleLemon");
    setTimeout(function () {
      $(".adventureLemon").removeClass("scaleLemon");
    }, 300);
  });

  // navlink click
  $(".nav-link").click(function () {
    let x = this;
    $(x).addClass("scale-sm");
    setTimeout(function () {
      $(x).removeClass("scale-sm");
    }, 500);
  });

  var swiper = new Swiper(".mySwiper", {
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    grabCursor: true,
    loop: true,
    autoplay: {
      delay: 3000,
    },
    speed: 700,
  });

  // // ignore alfie

  let isLastSlideShow = false;
  $(".ignore-alfie").click(function () {
    isLastSlideShow = true;
  });

  const body = document.querySelector("body");
  // pop up block
  let popUpNumber = 2;
  let totalDialogs = 4;
  // show dialog
  $("#btnAdventureLemon").click(function () {
    setTimeout(function () {
      $(".popup-dialog").removeClass("d-none");
      $("#btnAdventureLemon").addClass("d-none");
    }, 500);
  });

  $(".popup-dialog").click(function () {
    if (popUpNumber < 5) {
      $(".popup-block").addClass("d-none");
      $(`[data-dialog-number='${popUpNumber}']`).removeClass("d-none");
      $(".popup-lemon").addClass("scale-sm");
      setTimeout(function () {
        $(".popup-lemon").removeClass("scale-sm");
      }, 500);

      popUpNumber++;
    } else if (isLastSlideShow) {
      setTimeout(function () {
        $(".popup-block").addClass("d-none");
        $(".ignore-alfie-block").removeClass("d-none");
        isLastSlideShow = false;
      }, 500);
      // setTimeout(function () {
      //   $(".ignore-alfie-block").removeClass("isshow");
      // }, 1000);
    } else {
      $(".popup-block").addClass("d-none");
      $(".popup-dialog").addClass("d-none");
      $("#btnAdventureLemon").removeClass("d-none");

      popUpNumber = 2;
    }
  });
  // =====
  pub_qty_to_mint = 1;
  $(".public-qty-plus").click(function () {
    var qty = $(".public-qty");
    var ttl_amt = $(".public_ttl_amt");
    var number = parseInt(qty.text());
    var amount = parseFloat(ttl_amt.attr("data-amount"));
    console.log(amount);
    console.log(number);
    if (number >= 1 && number <= 4) {
      number++;
      qty.text(number);
      pub_qty_to_mint = number;
      ttl_amt.text((amount * number).toFixed(3));
    }
  });

  $(".public-qty-minus").click(function () {
    var qty = $(".public-qty");
    var ttl_amt = $(".public_ttl_amt");
    var number = parseInt(qty.text());
    var amount = parseFloat(ttl_amt.attr("data-amount"));
    if (number > 1) {
      number--;
      qty.text(number);
      pub_qty_to_mint = number;
      ttl_amt.text((amount * number).toFixed(3));
    }
  });

  coll_qty_to_mint = 1;
  $(".coll-qty-plus").click(function () {
    var qty = $(".coll-qty");
    var ttl_amt = $(".coll_ttl_amt");
    var number = parseInt(qty.text());
    var amount = parseFloat(ttl_amt.attr("data-amount"));
    console.log(amount);
    console.log(number);
    if (number >= 1 && number <= 1) {
      number++;
      qty.text(number);
      coll_qty_to_mint = number;
      ttl_amt.text((amount * number).toFixed(3));
    }
  });

  $(".coll-qty-minus").click(function () {
    var qty = $(".coll-qty");
    var ttl_amt = $(".coll_ttl_amt");
    var number = parseInt(qty.text());
    var amount = parseFloat(ttl_amt.attr("data-amount"));
    if (number > 1) {
      number--;
      qty.text(number);
      coll_qty_to_mint = number;
      ttl_amt.text((amount * number).toFixed(3));
    }
  });

  presale_qty_to_mint = 1;
  $(".presale-qty-plus").click(function () {
    var qty = $(".presale-qty");
    var ttl_amt = $(".presale_ttl_amt");
    var number = parseInt(qty.text());
    var amount = parseFloat(ttl_amt.attr("data-amount"));
    console.log(amount);
    console.log(number);
    if (number >= 1 && number <= 4) {
      number++;
      qty.text(number);
      presale_qty_to_mint = number;
      ttl_amt.text((amount * number).toFixed(3));
    }
  });

  $(".presale-qty-minus").click(function () {
    var qty = $(".presale-qty");
    var ttl_amt = $(".presale_ttl_amt");
    var number = parseInt(qty.text());
    var amount = parseFloat(ttl_amt.attr("data-amount"));
    if (number > 1) {
      number--;
      qty.text(number);
      presale_qty_to_mint = number;
      ttl_amt.text((amount * number).toFixed(3));
    }
  });

  $(".lemon-slider").slick({
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    infinite: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  let get_presale_qty_to_mint = () => {
    return presale_qty_to_mint;
  };

  let get_coll_qty_to_mint = () => {
    return coll_qty_to_mint;
  };

  let get_pub_qty_to_mint = () => {
    return pub_qty_to_mint;
  };

  var rellax = new Rellax(".rellax");
});
