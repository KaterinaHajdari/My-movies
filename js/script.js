$(document).ready(function(){

  $('.slider').slick({
  	slidesToShow: 1,
  	slidesToScroll: 1,
  	dots: true,
  	arrows: true,
  	infinite: false
  });


	$('.choose-us-slider').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: true,		
	});

		// init Isotope
		var $grid = $('.grid').isotope({
			// options
		});
		// filter items on button click
		$('.filter-button-group').on( 'click', 'button', function() {
			var filterValue = $(this).attr('data-filter');
			$grid.isotope({ filter: filterValue });
		});
});