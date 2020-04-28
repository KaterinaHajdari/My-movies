function loadImage() {
    CheckAuthentication();

    if(localStorage.getItem("variable")) {

        // set the ID here
        var sourceUrl = 'Movies' + localStorage.getItem("variable");
        document.getElementById('video').src = sourceUrl;
        // after setting remember to remove it, if it's not required
        localStorage.removeItem("variable");
       }      
}//opens at playmovie.hml the movie/ serial clicked

