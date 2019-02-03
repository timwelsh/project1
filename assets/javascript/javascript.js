var imageArray = [0,1,2,4,5,9,12,16,19,22]
var imagePick = [0,1]
var counter = -1;
var timer;
var answer;

// Object that holds the information for making the AJAX calls
var data = {
    array: [{
        arrayPosition : "0",
        title: "Sun Sonification",
        wiki: "Sun",
        nasa: "Sun",
        imageNumber: "47",
        sound: "assets/sounds/01.wav"
        },
        {
        arrayPosition : "1",
        title: "Sounds of Saturn: Enceladus Moon Hiss",
        wiki: "Enceladus",
        nasa: "Enceladus",
        imageNumber: "1",
        sound: "assets/sounds/02.mp3"
        },
        {
        arrayPosition : "2",
        title: "Voyager Plasma Sounds",
        wiki: "Plasma_(physics)",
        nasa: "Plasma",
        imageNumber: "44",
        sound: "assets/sounds/03.mp3"
        },
        {
        arrayPosition : "3",
        title: "Cassini Shields Up",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/04.mp3"
        },
        {
        arrayPosition : "4",
        title: "Juno: Crossing Jupiter's Bow Shock",
        wiki: "Bow_shocks_in_astrophysics#Around_the_Earth",
        nasa: "Jupiter",
        imageNumber: "58",
        sound: "assets/sounds/05.wav"
        },
        {
        arrayPosition : "5",
        title: "Beware of Jupiter’s Largest Moon Ganymede",
        wiki: "Ganymede_(moon)",
        nasa: "Ganymede",
        imageNumber: "8",
        sound: "assets/sounds/06.mp3"
        },  
        {
        arrayPosition : "6",
        title: "Juno: Entering Jupiter's Magnetosphere",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/07.mp3"
        },  
        {
        arrayPosition : "7",
        title: "Kepler: Star KIC12268220C Light Curve Waves to Sound",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/08.mp3"
        },  
        {
        arrayPosition : "8",
        title: "Kepler: Star KIC7671081B Light Curve Waves to Sound",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/09.mp3"
        },  
        {
        arrayPosition : "9",
        title: "Voyager: Lightning on Jupiter",
        wiki: "Atmosphere_of_Jupiter",
        nasa: "Jupiter Lightning",
        imageNumber: "2",
        sound: "assets/sounds/10.mp3"
        },  
        {
        arrayPosition : "10",
        title: "Stardust: Passing Comet Tempel 1",
        wiki: "Tempel_1",
        nasa: "Tempel 1",
        imageNumber: "8",
        sound: "assets/sounds/11.mp3"
        },  
        {
        arrayPosition : "11",
        title: "Voyager: Interstellar Plasma Sounds",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/12.mp3"
        },  
        {
        arrayPosition : "12",
        title: "Cassini: Saturn Radio Emissions #2",
        wiki: "Cassini%E2%80%93Huygens",
        nasa: "Cassini",
        imageNumber: "35",
        sound: "assets/sounds/13.mp3"
        },  
        {
        arrayPosition : "13",
        title: "Chorus Radio Waves within Earth's Atmosphere",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/14.mp3"
        },
        {
        arrayPosition : "14",
        title: "Cassini: Saturn Radio Emissions #1",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/15.mp3"
        },  
        {
        arrayPosition : "15",
        title: "Cassini: Enceladus Sound",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/16.mp3"
        }, 
        {
        arrayPosition : "16",
        title: "Plasmaspheric Hiss",
        wiki: "Polar_(satellite)",
        nasa: "Plasma",
        imageNumber: "27",
        sound: "assets/sounds/17.wav"
        }, 
        {
        arrayPosition : "17",
        title: "Plasmawaves - Chorus",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/18.mp3"
        }, 
        {
        arrayPosition : "18",
        title: "Whistler Waves",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/19.mp3"
        }, 
        {
        arrayPosition : "19",
        title: "Jupiter Sounds 2001",
        wiki: "Jupiter",
        nasa: "Jupiter",
        imageNumber: "8",
        sound: "assets/sounds/20.wav"
        }, 
        {
        arrayPosition : "20",
        title: "Ultra Cold Liquid Helium-3",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/21.mp3"
        }, 
        {
        arrayPosition : "21",
        title: "Radar Echoes From Titan's Surface",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/22.mp3"
        }, 
        {
        arrayPosition : "22",
        title: "Speeding Through Titan's Haze",
        wiki: "Titan_(moon)",
        nasa: "Titan",
        imageNumber: "1",
        sound: "assets/sounds/23.mp3"
        }, 
        {
        arrayPosition : "23",
        title: "Scientists Find That Saturn's Rotation Period Is A Puzzle",
        wiki: "",
        nasa: "",
        imageNumber: "",
        sound: "assets/sounds/24.mp3"
        }, 
    ]
    
}

display();

function display () { //function that makes the API calls
    $("#option-1_header").empty();
    $("#option-2_header").empty();
    $("#option-1_image").attr("src", "");
    $("#option-2_image").attr("src", "");
    $(".audio").empty()
    counter = imageArray[Math.floor(Math.random() * imageArray.length)];
    placement = imagePick[Math.floor(Math.random() * imagePick.length)];

    var audioSource = $("<source>").attr("src", data.array[counter].sound);
    var audioTag = $("<audio>").attr("controls", true);
    audioTag.append(audioSource)
    $(".audio").append(audioTag)

    $("audio").css("height", "50px");
    $("audio").css("width", "300px");

    for (i=0; i < imageArray.length; i++) {
        if (imageArray[i] === counter ) {
            imageArray.splice(i, 1)
        }
    }
    var nasa = data.array[counter].nasa
    var wiki = data.array[counter].wiki
    var imageNumber = data.array[counter].imageNumber

    
    //WIKI API CALL START
    var xhr = new XMLHttpRequest();
    var url = "https://en.wikipedia.org/api/rest_v1/page/summary/"+ wiki;

    xhr.open('GET', url, true);
    xhr.onload = function() {
        var data = JSON.parse(this.response);
        var wikiInfo= data.extract;
        $("#modal-content").html(wikiInfo); // This will populate the modal text
    }
    xhr.send();


    // NASA API CALL START
    var queryURL = "https://images-api.nasa.gov/search?q="+nasa

    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
    console.log(response); 
    var results = response.collection.items[imageNumber].links[0].href;
    var header = data.array[counter].title;
    if (placement === 0) {
    $("#option-1_image").attr("src", results);
    $("#option-1_header").text(header);
    $("#option-1_header").css("text-align", "center");
    answer = 0;
    }
    else {
    $("#option-2_image").attr("src", results);
    $("#option-2_header").text(header);
    $("#option-2_header").css("text-align", "center");
    answer = 1
    }
    });
}