// Initial "Menu" Items
var topics = ["Pizza", "Hot Dogs", "Cupcakes", "Watermelon", "Fruits", "Vegetables", "Cake", "Steak", "Ice Cream"]


// Fxn to display gifs
function gifDisplay(){
    var food = $(this).attr("data-name")

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=food " +
    food + "&api_key=dc6zaTOxFJmzC&limit=10"

    $.ajax({
        url: queryURL,
        method:"GET"
    }) .then(function(response){
        var results = response.data
        for (var i = 0; i < results.length; i++){
            // Only gets gifs that are appropriate
            if(results[i].rating !== "r" && "pg-13"){
                var gifDiv = $("<div class='float'>")

                // Displays rating onto the image
                var rating = results[i].rating
                var p = $("<p>").html("<span class ='text'> Rating: " + rating + "</span>")
                var text = $("<text class='download'>").html("<a href='" + results[i].images.original.url + "' target='_blank' download ><i class='fas fa-download'></i></a>")

                // Gets animated and still images URL and sets class for image click event.
                var foodImage = $("<img>")
                    foodImage.addClass("foodClick")
                    foodImage.attr("src", results[i].images.fixed_height_still.url)
                    foodImage.attr("data-still", results[i].images.fixed_height_still.url)
                    foodImage.attr("data-animate", results[i].images.fixed_height.url)

                    //Appends rating and GIF image with added attributes

                    gifDiv.append(p)
                    gifDiv.append(text)

                    gifDiv.append(foodImage)
                    $("#gifHolder").prepend(gifDiv)
                    
                    // Click fxn for gifs to animate when still, and vice versa.
                    foodImage.on("click", function() {
                        var state = $(this).attr("data-state")
                            if (state === "still") {
                                $(this).attr("src", $(this).attr("data-animate"))
                                $(this).attr("data-state", "animate")
                            } else {
                                if (state === "animate")
                                $(this).attr("src", $(this).attr("data-still"))
                                $(this).attr("data-state", "still")
                            }
                    });
                    
            }
        }
    })
}

//Creates new buttons for menu
function createButtons(){
    $("#buttonHolder").empty()

    // creates buttons, and adds topic to array
    for (var i = 0; i < topics.length; i++){
        var newButton = $("<button>")
        newButton.addClass("foodButton")
        newButton.attr("data-name", topics[i])
        newButton.text(topics[i])
        $("#buttonHolder").prepend(newButton)
    }
}

// Click events for new buttons
$(document).on("click", ".foodButton", gifDisplay)


// Creates button from input
$("#addFood").on("click", function(event){
    event.preventDefault()
    var food = $("#foodInput").val().trim()
    topics.push(food)
    createButtons()
})


createButtons()