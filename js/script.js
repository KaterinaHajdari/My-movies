$(document).ready(function(){


    $('.post-wrapper').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3,
      autoplay:true,
      autoplaySpeed:2000,
      nextArrow:$('.next'),
      prevArrow:$('.prev'),

    });
    $(document).on('click', '.hanging-close, .modal-backdrop, .modal', function (event) {
      // Remove the src so the player itself gets removed, as this is the only
      // reliable way to ensure the video stops playing in IE
      $("#trailer-video-container").empty();
  });
  // Start playing the video whenever the trailer modal is opened
  $(document).on('click', '.movie-img', function (event) {

    var trailerYouTubeId = $(this).attr('data-trailer-youtube-id')
    localStorage.setItem("variable",trailerYouTubeId);
    window.open("test2.html", "_self");
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
        
    
    var is_touch_device = ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch;
    $('[data-toggle="popover"]').popover({ html : true, trigger: is_touch_device ? "focus" : "hover focus"});
    
  });
  /**
   * Vertically center Bootstrap 3 modals
   
   */
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
  /*progressive sidebar*/
  function move() {
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  }

})