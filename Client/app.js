(function($){
    movies = []
    selectedMovieId = -1;
    function UpdateMovie(e){
       // get request first
    //    const selectedMovie = movies.find(movie => {movie.movieId === selectedMovieId})
    //    selectedMovie.title = this["title"].value
    //    selectedMovie.genre = this["genre"].value
    //    selectedMovie.director = this["director"].value
    //    selectedMovie.imagePath = this["imagePath"].value

       var movie = {
            MovieId : selectedMovieId,
            Title : this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value,
            ImagePath: this["imagePath"].value
        };
        
        $.ajax({
            url: `https://localhost:44325/api/movie`,
            dataType: 'json',
            type: 'put',
            contentType: 'application/json',
            data: JSON.stringify(movie),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        }).then(function() {
            GetAllMovies();
        })
        
        e.preventDefault();
    }

    $('#update-form').submit(UpdateMovie);

    function processForm( e ){
        var dict = {
            Title : this["title"].value,
            Genre: this["genre"].value,
            Director: this["director"].value,
        	ImagePath: this["imagePath"].value
        };

        $.ajax({
            url: 'https://localhost:44325/api/movie',
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(dict),
            success: function( data, textStatus, jQxhr ){
                $('#response pre').html( data );
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });

        e.preventDefault();
    }

    $('#addForm').submit(processForm);

    function GetAllMovies() {
        $(document).ready(function() {
            $.ajax({
                type: 'GET',
                url: "https://localhost:44325/api/movie",
                dataType: 'json',
                success: function () {
                    $('.movieData').html('');
                }
            })
                .then(function (data) {
                    movies = data
                    $.each(data, function (index, value) {
                        $('.movieData').append(
                            '<tr>' +
                            '<td>' + value.title + '</td>' +
                            '<td>' + value.genre + '</td>' +
                            '<td>' + value.director + '</td>' +
                            '<td>' + value.imagePath + '</td>' +
                            `<td><button type="button" value="Update" onclick="Unhide(${value.movieId}, '${value.title}', '${value.genre}', '${value.director}', '${value.imagePath}')">Update</button></td>` +
                            '</tr>' 
                        );
                        

                    });
                });

        });
    }
    
    // function UpdateMovieForm(data) {

    //     document.getElementById('movieId').placeholder = value.movieId;
    //     document.getElementById('title').placeholder = Title;
    //     document.getElementById('genre').placeholder = Director;
    //     document.getElementById('imagePath').placeholder = ImagePath;
    // }

    

    

    // function AddMovie(){
    //     var data = getMovieObject();
    //     $(document).ready(function() {
    //         $.ajax({
    //             type: 'POST',
    //             url: "https://localhost:44325/api/movie",
    //             dataType: 'json',
    //             data : data
    //         }).then(function(){
    //             GetAllMovies();
    //         });
    //     });
    // }

    // function getMovieObject(){
    //     var data = {
    //         "Title": document.getElementById('title').value,
    //         "Genre": document.getElementById('genre').value,
    //         "Director": document.getElementById('director').value,
    //         "Image": document.getElementById('imagePost').value,
    //     }
    //     return data;
    // }

$(document).ready(GetAllMovies());
})(jQuery);

function Unhide(movieId,title,genre,director,imagePath){
    this.selectedMovieId = movieId;
    
    var x = document.getElementById("updateForm");
    if (x.style.display === "none") {
      x.style.display = "block";
    //   document.getElementById('movieId').placeholder = movieId;
      document.getElementById('title').value = title;
      document.getElementById('genre').value = genre;
      document.getElementById('director').value = director;
      document.getElementById('imagePath').value = imagePath;
    } else {
      x.style.display = "none";
    }
}



