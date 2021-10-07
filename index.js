$(".qty-plus").click(function(){
    var qty = $(".qty");
    var ttl_amt = $(".ttl_amt");
    var number = parseInt(qty.text());
    var amount= parseFloat(ttl_amt.attr("data-amount"));
    console.log(amount);
    if(number >= 1){
        number++;
        qty.text(number);
        ttl_amt.text((amount*number).toFixed(2));
    }
});

$(".qty-minus").click(function(){
    var qty = $(".qty");
    var ttl_amt = $(".ttl_amt");
    var number = parseInt(qty.text());
    var amount= parseFloat(ttl_amt.attr("data-amount"));
    if(number > 1){
        number--;
        qty.text(number);
        ttl_amt.text((amount*number).toFixed(2));
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
            slidesToScroll: 1
          }
        }
      ]
});

var rellax = new Rellax(".rellax");