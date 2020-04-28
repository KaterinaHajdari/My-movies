
$(document).ready(function(){


    $('.post-wrapper').slick({
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 3,
      autoplay:true,
      autoplaySpeed:2000,
      nextArrow:$('.next'),
      prevArrow:$('.prev'),

    });// homepage movie slider
   
    CreateHtml("http://localhost:3000/Movies");
    CheckAuthentication();
  

  
   // opens the video on playmovie.html 
  $(document).on('click', '.movie-img', function (event) {

    var MoviePath = $(this).attr('MoviePath')
    localStorage.setItem("variable",MoviePath);
    window.open("playMovie.html", "_self");
  });
  // Animate in the movies when the page loads
  $(document).ready(function () {
    var deferred = $.Deferred();
    $(".movie-btn").hide();
    var movie_tile_length = $('.movie-tile').length
    i = 0;
    $('.movie-tile').hide().first().show("fast", function showNext() {
      $(this).next("div").show("fast", showNext);
      i++;
      if(i == movie_tile_length)
          $(".movie-btn").show('slow');
      console.log(i);
    });
        
    
  });

   //Vertically center Bootstrap 3 modals
   
  $(function() {
      function reposition() {
          var modal = $(this),
              dialog = modal.find('.modal-dialog');
          modal.css('display', 'block');
          dialog.css("margin-top", Math.max(0, ($(window).height() - dialog.height()) / 2));
      }
      $('.modal').on('show.bs.modal', reposition);
      $(window).on('resize', function() {
          $('.modal:visible').each(reposition);
      });
  });

  
});
