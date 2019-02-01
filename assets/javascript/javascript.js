var counter = 0;
var timer;

// Object that holds the information for making the AJAX calls
var data = {
    array: [{
        arrayPosition : "0",
        title: "Sun Sonification",
        wiki: "Plasma_(physics)",
        nasa: "Plasma",
        imageNumber: "8",
        sound: "01.wav"
        },
        {
        arrayPosition : "1",
        title: "Sounds of Saturn: Enceladus Moon Hiss",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "02.mp3"
        },
        {
        arrayPosition : "2",
        title: "Voyager Plasma Sounds",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "03.mp3"
        },
        {
        arrayPosition : "3",
        title: "Cassini Shields Up",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "04.mp3"
        },
        {
        arrayPosition : "4",
        title: "Juno: Crossing Jupiter's Bow Shock",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "05.mp3"
        },
        {
        arrayPosition : "5",
        title: "Beware of Jupiter’s Largest Moon Ganymede",
        wiki: "Ganymede_(moon)",
        nasa: "Ganymede",
        imageNumber: "8",
        sound: "06.mp3"
        },  
        {
        arrayPosition : "6",
        title: "Juno: Entering Jupiter's Magnetosphere",
        wiki: "Bow_shocks_in_astrophysics#Around_the_Earth",
        nasa: "Jupiter",
        imageNumber: "58",
        sound: "07.mp3"
        },  
        {
        arrayPosition : "7",
        title: "Kepler: Star KIC12268220C Light Curve Waves to Sound",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "08.mp3"
        },  
        {
        arrayPosition : "8",
        title: "Kepler: Star KIC7671081B Light Curve Waves to Sound",
        wiki: "Cassini%E2%80%93Huygens",
        nasa: "Cassini",
        imageNumber: "35",
        sound: "09.mp3"
        },  
        {
        arrayPosition : "9",
        title: "Voyager: Lightning on Jupiter",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "10.mp3"
        },  
        {
        arrayPosition : "10",
        title: "Stardust: Passing Comet Tempel 1",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "11.mp3"
        },  
        {
        arrayPosition : "11",
        title: "Voyager: Interstellar Plasma Sounds",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "12.mp3"
        },  
        {
        arrayPosition : "12",
        title: "Cassini: Saturn Radio Emissions #2",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "13.mp3"
        },  
        {
        arrayPosition : "13",
        title: "Chorus Radio Waves within Earth's Atmosphere",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "14.mp3"
        },
        {
        arrayPosition : "14",
        title: "Cassini: Saturn Radio Emissions #1",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "15.mp3"
        },  
        {
        arrayPosition : "15",
        title: "Cassini: Enceladus Sound",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "16.mp3"
        }, 
        {
        arrayPosition : "16",
        title: "Plasmaspheric Hiss",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "17.mp3"
        }, 
        {
        arrayPosition : "17",
        title: "Plasmawaves - Chorus",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "18.mp3"
        }, 
        {
        arrayPosition : "18",
        title: "Whistler Waves",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "19.mp3"
        }, 
        {
        arrayPosition : "19",
        title: "Jupiter Sounds 2001",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "20.mp3"
        }, 
        {
        arrayPosition : "20",
        title: "Ultra Cold Liquid Helium-3",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "21.mp3"
        }, 
        {
        arrayPosition : "21",
        title: "Radar Echoes From Titan's Surface",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "22.mp3"
        }, 
        {
        arrayPosition : "22",
        title: "Speeding Through Titan's Haze",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "23.mp3"
        }, 
        {
        arrayPosition : "23",
        title: "Scientists Find That Saturn's Rotation Period Is A Puzzle",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "24.mp3"
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