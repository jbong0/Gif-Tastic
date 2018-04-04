var topics = ["Pizza", "Hot Dogs", "Cupcakes", "Watermelon", "Fruits", "Vegetables"]

function gifDisplay(){
    var food = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    food + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method:"GET"
    }) .then(function(response){
        var results = response.data;
        for (var i = 0; i < results.length; i++){
            if(results[i].rating !== "r" && "pg-13"){
                var gifDiv = $("<div class='float'>");

                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating );

                var foodImage = $("<img>");
                    foodImage.addClass("foodClick")
                    foodImage.attr("src", results[i].images.fixed_height_still.url);
                    foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                    foodImage.attr("data-animate", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(foodImage);
                    $("#gifHolder").prepend(gifDiv);
                    
                    $(".foodClick").on("click", function() {
                        var state = $(this).attr("data-state");
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"));
                                $(this).attr("data-state", "animate");
                            } else {
                                $(this).attr("src", $(this).attr("data-still"));
                                $(this).attr("data-state", "still");
                            }
                    });
                    
            }
        }
    })
}


function createButtons(){
    $("#buttonHolder").empty();

    for (var i = 0; i < topics.length; i++){
        var newButton = $("<button>");
        newButton.addClass("foodButton");
        newButton.attr("data-name", topics[i]);
        newButton.text(topics[i]);
        $("#buttonHolder").append(newButton);
    }
}
$(document).on("click", ".foodButton", gifDisplay)

$("#addFood").on("click", function(event){
    event.preventDefault();
    var food = $("#foodInput").val().trim();
    topics.push(food);
    createButtons();
});


createButtons();

