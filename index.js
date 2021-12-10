coll_qty_to_mint = 1
$(".coll-qty-plus").click(function(){
    var qty = $(".coll-qty");
    var ttl_amt = $(".coll_ttl_amt");
    var number = parseInt(qty.text());
    var amount= parseFloat(ttl_amt.attr("data-amount"));
    console.log(amount);
    console.log(number);
    if(number >= 1 && number <=1){
        number++;
        qty.text(number);
	coll_qty_to_mint = number
        ttl_amt.text((amount*number).toFixed(3));
    }
});

$(".coll-qty-minus").click(function(){
    var qty = $(".coll-qty");
    var ttl_amt = $(".coll_ttl_amt");
    var number = parseInt(qty.text());
    var amount= parseFloat(ttl_amt.attr("data-amount"));
    if(number > 1){
        number--;
        qty.text(number);
	coll_qty_to_mint = number
        ttl_amt.text((amount*number).toFixed(3));
    }
});

presale_qty_to_mint = 1
$(".presale-qty-plus").click(function(){
    var qty = $(".presale-qty");
    var ttl_amt = $(".presale_ttl_amt");
    var number = parseInt(qty.text());
    var amount= parseFloat(ttl_amt.attr("data-amount"));
    console.log(amount);
    console.log(number);
    if(number >= 1 && number <=4){
        number++;
        qty.text(number);
	presale_qty_to_mint = number
        ttl_amt.text((amount*number).toFixed(3));
    }
});

$(".presale-qty-minus").click(function(){
    var qty = $(".presale-qty");
    var ttl_amt = $(".presale_ttl_amt");
    var number = parseInt(qty.text());
    var amount= parseFloat(ttl_amt.attr("data-amount"));
    if(number > 1){
        number--;
        qty.text(number);
	presale_qty_to_mint = number
        ttl_amt.text((amount*number).toFixed(3));
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

let get_presale_qty_to_mint = () => {
	return presale_qty_to_mint
}

let get_coll_qty_to_mint = () => {
	return coll_qty_to_mint
}

var rellax = new Rellax(".rellax");
