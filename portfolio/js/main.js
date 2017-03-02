function init() {

	$("head").append('<link href="https://fonts.googleapis.com/css?family=Lora:400,700&amp;subset=cyrillic" rel="stylesheet">');
		$("head").append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">');
		$("head").append('<link rel="stylesheet" type="text/css" href="portfolio/styles/main.css">');

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

	});
}