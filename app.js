var foodArray = ["Pizza", "Hot Dogs", "Cupcakes", "Watermelon"]
var title = $("#title")


function foodTitle(){
    var foodType = $(this).attr("data-name");
    console.log(foodType)
    title.prepend("<h5>" + foodType + "</h5>");
}

function createButtons(){
    $("#buttonHolder").empty();

    for (var i = 0; i < foodArray.length; i++){
        var newButton = $("<button>");
        newButton.addClass("food");
        newButton.attr("data-name", foodArray[i]);
        newButton.text(foodArray[i]);
        $("#buttonHolder").append(newButton);
    }
}

$("#addFood").on("click", function(event){
    event.preventDefault();
    var food = $("#foodInput").val().trim();
    foodArray.push(food);
    title.prepend("<h5>" + food + "</h5>");
    createButtons();
});

createButtons();

function clear(){
    $("#clearBtn").on("click", function(){
        $("#buttonHolder").empty();
    })
}

$("button").on("click", function() {
    var food = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      food + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
    method: "GET" 
    })
      .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
          if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var foodImage = $("<img>");
            foodImage.attr("src", results[i].images.fixed_height.url);

            gifDiv.append(p);
            gifDiv.append(foodImage);

            $("#gifHolder").prepend(gifDiv);
          }
        }
    });
});

