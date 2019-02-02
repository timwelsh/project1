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

  var name;
  var correct;
  var incorrect;
  
  database.ref().on("child_added", function(snapshot) {

        name = snapshot.val().name;
        correct = snapshot.val().correct;
        incorrect = snapshot.val().incorrect;

    }, function(errorObject) {
    console.log("Error: " + errorObject.code);
    });

    $('#login-btn').on("click", function() {
        
        name = $("#name-input").val().trim();
        correct = 0;
        incorrect = 0;
        database.ref().push({
            name : name,
            correct: correct,
            incorrect: incorrect,
            date:firebase.database.ServerValue.TIMESTAMP
        })

    });  // End of firebase code

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
                // $("#reqObject").text(url);
                $("#returnObject").text(JSON.stringify(result, null, 4));  
                $("#apod_explaination").text(result.explanation);
                $("#apod_title").text(result.title)
        });
    });

    
    // When user clicks an image, pull up modal
    $("#option-1_image").on("click", function(event) {
        $(".modal").addClass("is-active");
    });
    $("#option-2_image").on("click", function(event) {
        $(".modal").addClass("is-active");
    });

    // MODAL BUTTONS: close modal on button click or key press
    $(".modal_button").on("click", function(e) {
        $(".modal").removeClass("is-active");
    });
    $(window).on("keydown", function(e) {
        if (e.keyCode === 13 || e.keyCode === 27) {
            $(".modal").removeClass("is-active");
        }
    });
});