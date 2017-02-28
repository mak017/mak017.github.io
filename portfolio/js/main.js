$(window).scroll(function() {
	var yScroll = $(this).scrollTop();
	var opacity, z;
	$(".title").css({
		"transform": "translateY(" + yScroll / 2 + "%)"
	});

	opacity = Math.min(Math.max(1 - (yScroll - 100) / 150, 0), 1);
	z = yScroll > 250 ? -10 : 200;
	$(".links").css({ "opacity": opacity, "z-index": z}); 
});


$(document).ready(function(){

	$(".links ul a").click(function(){
		var $href = $(this).attr("href");
		$("body").stop().animate({
			scrollTop: $($href).offset().top
		}, 1000);
		return false;
	});


	for(var i = 1; i <= 27; i++) {
		var duration = 1 + Math.random() * 3;
		$("#star" + i).css({
			"animation" : duration + "s gleam infinite ease"
		})
	}

});