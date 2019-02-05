// NASA API key E0dwINrsYxiDcYZN3iRUIXooCzBUT7NBn90dq7N0
// example: https://api.nasa.gov/planetary/apod?api_key=E0dwINrsYxiDcYZN3iRUIXooCzBUT7NBn90dq7N0

$(document).ready(function() {
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC2u_ttl0dFV88Dyux2lNnGa-cWwFj4nVk",
    authDomain: "space-sounds.firebaseapp.com",
    databaseURL: "https://space-sounds.firebaseio.com",
    projectId: "space-sounds",
    storageBucket: "space-sounds.appspot.com",
    messagingSenderId: "811578548981"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database
  var database = firebase.database();
  var counter2 = 0;
  var name = "";
  var correct = 0;
  var incorrect = 0;
  var newPostKey = firebase.database().ref().child('posts').push().key;

//TODO: Need to fix the firebase reference to the specifically saved record
  database.ref().on("child_added", function(snapshot) {
        $("#player").text(snapshot.val().name).addClass("has-text-white");
        $("#correct").text(snapshot.val().correct).addClass("has-text-white");
        $("#incorrect").text(snapshot.val().incorrect).addClass("has-text-white");

    }, function(errorObject) {
        console.log("Error: " + errorObject.code);
    });

    $('#login-btn').on("click", function() {
         var name = $("#name-input").val().trim();

    });  

    // var dateSelected = "2019-01-22"
    var startDate = "";
    function buildQueryURL() {
        var url = "https://api.nasa.gov/planetary/apod?api_key=E0dwINrsYxiDcYZN3iRUIXooCzBUT7NBn90dq7N0&date="
        var startDate = $("#start-date").val().trim();
        return url + startDate; 
    }

    $("#run-date").on("click", function(event) {
        event.preventDefault();
        // clear();
        var queryURL = buildQueryURL();
        $.ajax({
          url: queryURL,
          method: "GET"

        }).then(function(result) {
            if("copyright" in result) {
                $("#copyright").text("Image Credits: " + result.copyright);
            }
            else {
                $("#copyright").text("Image Credits: " + "Public Domain");
            }
                
            if(result.media_type == "video") {
                $("#apod_img_id").css("display", "none"); 
                $("#apod_vid_id").attr("src", result.url);
            }
            else {
                $("#apod_vid_id").css("display", "none"); 
                $("#apod_img_id").attr("src", result.url);
            }
            $("#apod_date").text(result.date);
            $("#returnObject").text(JSON.stringify(result, null, 4));  
            $("#apod_explaination").text(result.explanation);
            $("#apod_title").text(result.title)
        });
    });

    // When use hovers over an image, create overlay
    $(".image").mouseover(function(hover) {
        
    });
    
    // TODO: Modal header will be green or yellow when answer is correct or incorrect
    // has-text-white	
    // has-background-success
    // has-background-warning

    // When user clicks an image, pull up modal
    $(".image").on("click", function(event) {
        var userChoice = this.id;
        if (userChoice === answer) {
            correct++;
            $(".modal-card-head").addClass("has-background-success");
            $(".modal-card-title").text("Correct!").addClass("has-text-white");
        }
        else {
            incorrect++;
            $(".modal-card-head").addClass("has-background-danger");
            $(".modal-card-title").text("Incorrect").addClass("has-text-white");
        }
        $(".modal").addClass("is-active");
    });

        // console.log (imageArray.length + " length ");
        // MODAL BUTTONS: close modal on button click or key press
        $(".modal_button").on("click", function(e) {
            $(".modal").removeClass("is-active");
            total = correct + incorrect;
            name = "Tim";  //TODO: temporarily in here until TW fixes the firebase reference
            // Game over logic
            if (total === 2) {
                window.open("gameover.html");
                endOfGame(correct, incorrect, name);
            } else {
                display();
                moveRocket();
            }

        });
        $(window).on("keydown", function(e) {
            if (e.keyCode === 13 || e.keyCode === 27) {
                $(".modal").removeClass("is-active");
            }
        });


    function moveRocket (){ //name of the button that will load the next question
        counter2++
        if (counter2 < 14){
        $('#rocket').attr('src', 'assets/images/rocket.png').addClass('animation'+counter2).removeClass('animation'+(counter2-1));
        timer = setTimeout(switchImage, 1000)
        }
    };
    
    function switchImage () { //switches the rocket image source
        $('#rocket').attr('src', 'assets/images/unpowered.png');
    }
    
    function endOfGame (correct, incorrect, name) {
        var postData = {
            corret: correct,
            incorrect: incorrect,
            name: name
        };
        var updates = {};
        console.log(newPostKey + " key ")
        updates[newPostKey] = postData;
        console.log (name + " " + correct + " " + incorrect);
        return firebase.database().ref().update(updates);

    }
});