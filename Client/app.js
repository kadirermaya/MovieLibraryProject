(function($){
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

    $('#my-form').submit(processForm);

    function GetAllMovies(){
        $(document).ready(function() {
            $.ajax({
                type: 'GET',
                url: "https://localhost:44325/api/movie",
                dataType: 'json',
                success: function(){
                    $('.movieData').html('');
                }
            })
                .then(function(data) {
                    $.each(data, function(index, value){
                        $('.movieData').append(
                        "<tr>" +
                            "<td>" + value.title + "<td>" +
                            "<td>" + value.genre + "<td>" +
                            "<td>" + value.director + "<td>" +
                            "<td>" + value.imagePath + "<td>" +
                        "<tr>"
                        );
                    });
            });
    
        });
    }


    function AddMovie(){
        var data = getMovieObject();
        $(document).ready(function() {
            $.ajax({
                type: 'POST',
                url: "https://localhost:44325/api/movie",
                dataType: 'json',
                data : data
            }).then(function(){
                GetAllMovies();
            });
        });
    }

    function getMovieObject(){
        var data = {
            "Title": document.getElementById('title').value,
            "Genre": document.getElementById('genre').value,
            "Director": document.getElementById('director').value,
            "Image": document.getElementById('imagePost').value,
        }
        return data;
    }

$(document).ready(GetAllMovies);
})(jQuery);
