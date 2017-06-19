function init() {

	$('head').append('<link href="https://fonts.googleapis.com/css?family=Lora:400,700&amp;subset=cyrillic" rel="stylesheet">')
		.append('<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">')
		.append('<link rel="stylesheet" type="text/css" href="portfolio/styles/main.css">');

	var $links = $('.links');

	if ($(document).scrollTop() != 0) {
		$links.css({'opacity': 0});
	}
	
	$(window).scroll(function() {
		var yScroll = $(this).scrollTop();
		var opacity, z;

		opacity = Math.min(Math.max(1 - (yScroll - 100) / 150, 0), 1);
		z = yScroll > 250 ? -10 : 200;
		$links.css({'opacity': opacity, 'z-index': z});
	});

	$(document).ready(function() {
		$('.links a').on('click', function(e) {
			e.preventDefault();
			var $href = $(this).attr('href');
			$('body, html').stop().animate({
				scrollTop: $($href).offset().top
			}, 1000);
		});

		$('#resumes').on('click', function(e) {
			e.preventDefault();
			var $this = $(this);
					$resumeParent = $this.parent();
					$resumeWrap = $this.next();

			if ($resumeParent.hasClass('active')) {
				$resumeParent.removeClass('active');
				$resumeWrap.slideUp();
			} else {
				$resumeParent.addClass('active')
				$resumeWrap.slideDown();
			}
		});
	});
}

init();
