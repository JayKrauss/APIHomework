//array for starting shows and added shows
var terms = ['Simpsons', 'Family Guy', 'Futurama', 'American Dad', 'Rick and Morty', 'Archer', 'Ren and Stimpy', 'Cat Dog', 'Samurai Jack'];

//function for rendering the buttons in the array
function renderButtons() {
    $('#buttons').text('');

    for (i=0; i < terms.length; i++){

      var name = terms[i];

      var buttonCurrent = $('<button class="btn btn-danger" id="show-button">' + name + '</button>').val(terms[i]);

      $('#buttons').append(buttonCurrent);

    }
  }

  //Click event for adding shows to the array
  $(document).on('click', '#add-show', function(event) {

    event.preventDefault();

    var showText = $("#show-input").val().trim();
    console.log(showText);

    for (i = 0; i < terms.length; i++){

      if (showText === [i]){
        alert('You cant add the same show twice!')

      }

      else if (showText != [i]) {
        terms.push(showText);  
        renderButtons();
        $('#show-input').clear();
      }
    }

  });

  //Gif generation
  $(document).on("click", "#show-button", function() {

      $('#display').html('');

        var show = $(this).attr('value');
          console.log(show);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
          show + "&api_key=dc6zaTOxFJmzC&limit=9";
        
        $.ajax({
          url: queryURL,
          method: "GET"
        })
          .then(function(response) {
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
              if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                var gifDiv = $("<div class='col-md-4'>");
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
  
                var showImage = $("<img>");

                showImage.attr("src", results[i].images.fixed_height.url);
  
                gifDiv.append(p);
                gifDiv.append(showImage);

                $("#display").prepend(gifDiv);
              }
            }
          });
      });
    

