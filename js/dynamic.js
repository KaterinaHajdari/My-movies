
var Result;



function GetData(Url) 
{
    var OurRequest = new XMLHttpRequest();
    OurRequest.open("GET", Url, false);
    OurRequest.onreadystatechange = function () {
        Result = JSON.parse(OurRequest.responseText);
    };
    OurRequest.send();

} // this function  gets data from db and stores them to the Result variable


function CreateHtml(Url) {

    GetData(Url);

    var Writehtml = "";
    for (var i = 0; i < Result.length; i++) {
        var obj = Result[i];

        Writehtml = Writehtml + '<div class="col-md-3 col-sm-4 col-xs-6 col-centered movie-tile"><div class="thumbnail"><img class="img-responsive movie-img" src="' + obj.ImagePath + '" alt="' + obj.Tittle + '" MoviePath="' + obj.MoviePath + '" data-toggle="modal" data-target="#trailer"><button class="btn btn-sm btn-block movie-btn" data-toggle="popover" data-placement="top auto" title="' + obj.Tittle + '">' + obj.Tittle + '</button></div></div>';

    }


    document.getElementById("MovieContainer").innerHTML = Writehtml;
} // this function shows movie containers 


function Search() {
    GetData("http://localhost:3000/Serials/");
    var ResultHtml = "";
    var flag = 0;
    var data = Result;

    Result = "";
    GetData("http://localhost:3000/Movies/");


    var data1 = Result;

    var inputVal = document.getElementById("src").value;

    for (var i = 0; i < data.length; i++) {
        var obj = data[i];

        if (obj.Tittle.toLowerCase().match(inputVal.toLowerCase())) {
            flag = 1;
            ResultHtml = ResultHtml + '<div class="col-md-3 col-sm-4 col-xs-6 col-centered movie-tile"><div class="thumbnail"><img class="img-responsive movie-img" src="' + obj.ImagePath + '" alt="' + obj.Tittle + '" MoviePath="' + obj.MoviePath + '" data-toggle="modal" data-target="#trailer"><button class="btn btn-sm btn-block movie-btn" data-toggle="popover" data-placement="top auto" title="' + obj.Tittle + '">' + obj.Tittle + '</button></div></div>';


        }


    } 

    for (var i = 0; i < data1.length; i++) {
        var obj = data1[i];

        if (obj.Tittle.toLowerCase().match(inputVal.toLowerCase())) {
            flag = 1;
            ResultHtml = ResultHtml + '<div class="col-md-3 col-sm-4 col-xs-6 col-centered movie-tile"><div class="thumbnail"><img class="img-responsive movie-img" src="' + obj.ImagePath + '" alt="' + obj.Tittle + '" MoviePath="' + obj.MoviePath + '" data-toggle="modal" data-target="#trailer"><button class="btn btn-sm btn-block movie-btn" data-toggle="popover" data-placement="top auto" title="' + obj.Tittle + '">' + obj.Tittle + '</button></div></div>';
        }


    }


    if (flag) {
        document.getElementById("MovieContainer").innerHTML = ResultHtml;
    }
    else {
        document.getElementById("MovieContainer").innerHTML = "Not Found";
    }

}//  search elements on db and shows the results 

function Login() {
    GetData("http://localhost:3000/users");
    var username = document.getElementById("txtUsername").value;
    var password = document.getElementById("txtPassword").value;
    var flag = 1;

    for (var i = 0; i < Result.length; i++) {
        if (Result[i].username === username) {
            if (Result[i].password === password) {
                sessionStorage.setItem('AuthenticationState', 'Authenticated');
                window.open('admin.html', '_self');
                break;
            }
            else {
                document.getElementById("lbl-error").innerHTML = "Password is incorrect";
                break;
            }

        }
        else {
            document.getElementById("lbl-error").innerHTML = "Username is incorrect";

        }
    }


} //User autentication login 




function CheckAuthentication() {

    var x = document.getElementsByClassName("NavAdmin");

    if (sessionStorage.getItem('AuthenticationState') === null) {
        x[0].style.display = "none";
        x[1].style.display = "none";
    }
    else {
        x[0].style.display = "block";
        x[1].style.display = "block";
    }

} // shows at navbar "admin" & "logout" if the user is authenticated 






function LogOut() {

    sessionStorage.clear();
    window.open("Homepage.html", "_self");

}


function addMovies() {

    var newMoviesHtml = '<table id="tbl-movie-list" ><tr><td>Tittle</td><td><input type="textbox" id="txtMovieTittle" class="txtMoviePath"><label id="lblErrorTitle" class="lblError">*</label></td></tr><tr><td>Image</td><td><input type="textbox" id="txtImagePath" class="txtMoviePath"><label id="lblErrorImage" class="lblError">*</label></td></tr><tr><td>Movie</td><td><input type="textbox" id="txtMoviePath" class="txtMoviePath"><label id="lblErrorMovie" class="lblError">*</label></td></tr></tr><tr><td>Category</td><td><input type="radio" id="catMovies" name="category" value="Movies"> <label for="Movies">Movies</label> <input type="radio" id="catSerials" name="category" value="Serials"><label for="Serials">Serials</label> <label id="lblErrorCategory" class="lblError">*</label></td></tr><td colspan="2"><input type="button" value="Send" id="btnSend" onclick="SendMovie()"></td></table>';
    document.getElementById("elements").innerHTML = newMoviesHtml;
}// show table with elements that allows to add a new movie 

function listMovies() {

    var MoviesURL = "http://localhost:3000/Movies/";
    var SerialsURL = "http://localhost:3000/Serials/";

    GetData(MoviesURL);
    var lstMovies = Result;
    GetData(SerialsURL);
    var lstSerials = Result;

    var listMoviesHtml = '<table id="tbl-movie-list">';
    for (var i = 0; i < lstMovies.length; i++) {
        var nr = i + 1;
        listMoviesHtml = listMoviesHtml + '<tr><td>' + nr + '</td><td>"' + lstMovies[i].Tittle + '"</td><td><a1 style="cursor:pointer"onclick="Edit(\'' + lstMovies[i].id + '\',\'' + lstMovies[i].Tittle + '\',\'' + lstMovies[i].MoviePath + '\',\'' + lstMovies[i].ImagePath + '\',\'' + MoviesURL + '\')">Edit</a1></td><td><a1 style="cursor:pointer" onclick="Delete(\'' + lstMovies[i].id + '\',\'' + lstMovies[i].Tittle + '\',\'' + MoviesURL + '\')">Delete</a1></td></tr>';
    }
    var Nr;
    for (var i = 0; i < lstSerials.length; i++) {
        nr = i + lstMovies.length + 1;
        listMoviesHtml = listMoviesHtml + '<tr><td>' + nr + '</td><td>"' + lstSerials[i].Tittle + '"</td><td><a1 style="cursor:pointer"onclick="Edit(\'' + lstSerials[i].id + '\',\'' + lstSerials[i].Tittle + '\',\'' + lstSerials[i].MoviePath + '\',\'' + lstSerials[i].ImagePath + '\',\'' + SerialsURL + '\')">Edit</a1></td><td><a1 style="cursor:pointer" onclick="Delete(\'' + lstSerials[i].id + '\',\'' + lstSerials[i].Tittle + '\',\'' + SerialsURL + '\')">Delete</a1></td></tr>';
    }

    listMoviesHtml = listMoviesHtml + '</table>'
    document.getElementById("elements").innerHTML = listMoviesHtml;
} // this function lists all movies & serials 


function Edit(btnId, btnTitle, btnMoviePath, btnImagePath, url) {


    var newMoviesHtml = '<table id="tbl-movie-list" ><tr><td>Tittle</td><td><input type="textbox" id="txtMovieTittle" class="txtMoviePath" value="' + btnTitle +
        '"><label id="lblEditErrorTitle" class="lblError">*</label></td></tr><tr><td>Image</td><td><input type="textbox" id="txtImagePath"  class="txtMoviePath" value="' + btnImagePath +
        '"><label id="lblEditErrorImage" class="lblError">*</label></td></tr><tr><td>Movie</td><td><input type="textbox" id="txtMoviePath"  class="txtMoviePath" value="' + btnMoviePath +
        '"><label id="lblEditErrorMovie" class="lblError">*</label></td></tr><td  colspan="2"><input type="button" value="Update" id="btnSend" onclick="UpdateMovie(\'' + url + '\',\'' + btnId + '\')"></td></table>';

    document.getElementById("elements").innerHTML = newMoviesHtml;

}// shows the table with movie details we want to edit after clicking "edit" button



function UpdateMovie(url, UpdateId) {

    var updateUrl = url + UpdateId;
    var MovieData = { Tittle: "", MoviePath: "", ImagePath: "" };


    if (document.getElementById("txtMovieTittle").value === "") {
        document.getElementById("lblEditErrorTitle").style.display = "inline-block";
        alert("Please Write a Tittle");
    }

    else if (document.getElementById("txtImagePath").value === "") {
        document.getElementById("lblEditErrorImage").style.display = "inline-block";
        alert("Please Write a Image Path");

    }
    else if (document.getElementById("txtMoviePath").value === "") {
        document.getElementById("lblEditErrorMovie").style.display = "inline-block";
        alert("Please Write a Movie Path");
    }
    else {

        var Title = document.getElementById("txtMovieTittle").value;
        var MoviePath = document.getElementById("txtMoviePath").value;
        var ImagePath = document.getElementById("txtImagePath").value;
        MovieData.Tittle = Title;
        MovieData.MoviePath = MoviePath;
        MovieData.ImagePath = ImagePath;


        $.ajax({
            type: 'PUT',
            url: updateUrl,
            data: MovieData
        });

        alert("Movie" + Title + "is Updated");
    }
} //updates movies/serials on db



function Delete(BtnDeleteId, BtnDeleteTittle, BtnDeleteCategory) {

    var url = BtnDeleteCategory + BtnDeleteId;
    var OurRequest = new XMLHttpRequest();
    OurRequest.open("DELETE", url, false);
    OurRequest.send();

    alert("Movie " + BtnDeleteTittle + " is deleted!");
    listMovies();


}// delete movies/ serials on db

function SendMovie() {

    var urlMovies = "http://localhost:3000/Movies/";
    var urlSerials = "http://localhost:3000/Serials/";
    var url;
    var MovieData = { Tittle: "", MoviePath: "", ImagePath: "" };

    if (document.getElementById("txtMovieTittle").value === "") {
        document.getElementById("lblErrorTitle").style.display = "inline-block";
        alert("Please Write a Tittle");
    }

    else if (document.getElementById("txtImagePath").value === "") {
        document.getElementById("lblErrorImage").style.display = "inline-block";
        alert("Please Write a Image Path");

    }
    else if (document.getElementById("txtMoviePath").value === "") {
        document.getElementById("lblErrorMovie").style.display = "inline-block";
        alert("Please Write a Movie Path");
    }

    else if (document.getElementById("catSerials").checked != true && document.getElementById("catMovies").checked != true) {
        document.getElementById("lblErrorCategory").style.display = "inline-block";
        alert("Please Check Category");
    }
    else {

        if (document.getElementById("catMovies").checked == true) {
            url = urlMovies;

        }
        else if (document.getElementById("catSerials").checked == true) {
            url = urlSerials;

        }


        var Title = document.getElementById("txtMovieTittle").value;
        var MoviePath = document.getElementById("txtMoviePath").value;
        var ImagePath = document.getElementById("txtImagePath").value;
        MovieData.Tittle = Title;
        MovieData.MoviePath = MoviePath;
        MovieData.ImagePath = ImagePath;

        $.post(url, MovieData);
        alert("Movie" + Title + " is inserted!");

    }

}// inserts movies / serials on db
