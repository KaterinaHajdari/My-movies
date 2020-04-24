function loadImage() {



    if(localStorage.getItem("variable")) {

        // set the ID here


        var sourceUrl = 'http://www.youtube.com/embed/' + localStorage.getItem("variable") + '?autoplay=1&html5=1';
        document.getElementById('video').src = sourceUrl;

        // after setting remember to remove it, if it's not required
        localStorage.removeItem("variable");
       }



       
}

/* var1= do mbaje linkun e filmit 1
 var1= do mbaje linkun e filmit 2
  var3= do mbaje linkun e filmit 3

  dhe do i shkruash me funksion ne java 
  brenda nje div 
  */