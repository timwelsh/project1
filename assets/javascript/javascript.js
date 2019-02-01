var counter = 0;
var timer;

// Object that holds the information for making the AJAX calls
var data = {
    array: [{
        arrayPosition : "0",
        wiki: "Plasma_(physics)",
        nasa: "Plasma",
        imageNumber: "8"
        },
        {
        arrayPosition : "1",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },
        {
        arrayPosition : "2",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },
        {
        arrayPosition : "3",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },
        {
        arrayPosition : "4",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },
        {
        arrayPosition : "5",
        wiki: "Ganymede_(moon)",
        nasa: "Ganymede",
        imageNumber: "8"
        },  
        {
        arrayPosition : "6",
        wiki: "Bow_shocks_in_astrophysics#Around_the_Earth",
        nasa: "Jupiter",
        imageNumber: "58"
        },  
        {
        arrayPosition : "7",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },  
        {
        arrayPosition : "8",
        wiki: "Cassini%E2%80%93Huygens",
        nasa: "Cassini",
        imageNumber: "35"
        },  
        {
        arrayPosition : "9",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },  
        {
        arrayPosition : "10",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },  
        {
        arrayPosition : "11",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },  
        {
        arrayPosition : "12",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },  
        {
        arrayPosition : "13",
        wiki: "",
        nasa: "",
        imageNumber: ""
        },  
    ]
    
}

display();


$('#moveButton').click(function(){ //name of the button that will load the next question
    if (counter < 14){
    counter++
    $('#rocket').attr('src', 'assets/images/rocket.png').addClass('animation'+counter).removeClass('animation'+(counter-1));
    timer = setTimeout(switchImage, 1000)
    }
    $("#rocket").attr("data-wiki",data.array[counter].wiki).attr("data-nasa",data.array[counter].nasa).attr("data-imageNumber",data.array[counter].imageNumber)
    if (data.array[counter].wiki !== ""){
        display();
    }
    else {
        $("#picture-div").empty()
        $("#description-div").empty()
    }
});

$('#restartButton').click(function(){ //button that starts the game over (we don't plan on having this in the game as of right now, but good to have for testing purposes)
    counter = 0
    $('#rocket').removeClass();
    $("#rocket").attr("data-wiki",data.array[counter].wiki).attr("data-nasa",data.array[counter].nasa).attr("data-imageNumber",data.array[counter].imageNumber)
    display();
});

function switchImage () { //switches the rocket image source
    $('#rocket').attr('src', 'assets/images/unpowered.png');
}

function display () { //function that makes the API calls
    var nasa = $("#rocket").attr("data-nasa");
    var wiki = $("#rocket").attr("data-wiki");
    var imageNumber = $("#rocket").attr("data-imageNumber");

    //WIKI API CALL START


    var xhr = new XMLHttpRequest();
    var url = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ wiki;

    xhr.open('GET', url, true);
    xhr.onload = function() {
        var data = JSON.parse(this.response);
        var wikiInfo= data.extract;
        $("#description-div").html(wikiInfo) //This div will be where the description goes
    }
    xhr.send();


    // NASA API CALL START

    var queryURL = "https://images-api.nasa.gov/search?q="+nasa

    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    console.log(response)
 

    var results = response.collection.items[imageNumber].links[0].href;
    var imageDiv = $("<div>");
    var image = $("<img>");
    
    image.attr("src", results);
    imageDiv.append(image);
    $("#picture-div").html(imageDiv) //This Div will be image goes
    });
}