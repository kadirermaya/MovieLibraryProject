(function($){

    

    function UpdateMovie(e){
       
       // get request first
       // 
        var movie = {
            MovieId : parseInt(this["movieId"].value),
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
                $('#')
            },
            error: function( jqXhr, textStatus, errorThrown ){
                console.log( errorThrown );
            }
        });
        // .then(function(data) {
        //     $.each(data, function(index, value){
        //         $('.update-form').append(
        //             '<input type="text" name="title" placeholder="' + value.title +'"/>'+
        //             '<input type="text" name="genre" placeholder="' + value.genre +'"/>'+
        //             '<input type="text" name="director" placeholder="' + value.director +'"/>'+
        //             '<input type="text" name="imagePath" placeholder="' + value.imagePath +'"/>'
        //         );
        //     });
        // });


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
                    $.each(data, function (index, value) {
                        $('.movieData').append(
                            '<tr>' +
                            '<td>' + value.title + '</td>' +
                            '<td>' + value.genre + '</td>' +
                            '<td>' + value.director + '</td>' +
                            '<td>' + value.imagePath + '</td>' +
                            '<td><button type="button" value="Update" onclick="Unhide()">Update</button></td>' +
                            '</tr>'
                        );
                    });
                });

        });
    }
    
    
    

    

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

function Unhide(){
    var x = document.getElementById("updateForm");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
    UpdateMovie(movie.MovieId)
}



