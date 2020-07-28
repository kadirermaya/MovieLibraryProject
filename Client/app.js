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

    function GetAllMovies() {
        $(document).ready(function () {
            $.ajax({
                type: 'GET',
                url: 'https://localhost:44325/api/movie',
                dataType: 'json',
                success: function () {
                    $('.movieData').append

                }


            })
        }
        
        )}

})(jQuery);

