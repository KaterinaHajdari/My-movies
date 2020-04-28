
$(document).ready(function () {

    if (sessionStorage.getItem('AuthenticationState') === null) {
        window.open("Login.html", "_self");
    }

    else {
       var x = document.getElementsByClassName("NavAdmin");
       x[0].style.display = "block";
       x[1].style.display = "block";
     
        }
    


});
