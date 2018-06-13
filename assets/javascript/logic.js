//array for starting shows and added shows
var terms = ['Simpsons', 'Family Guy', 'Futurama', 'American Dad', 'Cleveland Show', 'Archer', 'Ren and Stimpy', 'Cat Dog', 'Samurai Jack'];

//function for rendering the buttons in the array
function renderButtons() {
    $('#buttons').text('');

    for (i=0; i < terms.length; i++){

      var name = terms[i];

      var buttonCurrent = $('<button class="btn btn-primary">' + name + '</button>').attr({name: terms[i]});

      $('#buttons').append(buttonCurrent);

    }
  }

  //Click event for adding shows to the array
  $("#add-show").on("click", function(event) {

    event.preventDefault();

    var showText = $("#show-input").val().trim();
    console.log(showText);

    terms.push(showText);

    renderButtons();
  });

  //click event for generating GIFs
$("button").on("click", function() {
    var term = $(this).attr("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      term + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var termImage = $("<img>");
          termImage.attr("src", results[i].images.fixed_height.url);

          gifDiv.prepend(termImage);

          $("#display").prepend(gifDiv);
        }
      });
  });

