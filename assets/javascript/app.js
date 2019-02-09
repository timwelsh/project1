// NASA API key E0dwINrsYxiDcYZN3iRUIXooCzBUT7NBn90dq7N0
// example: https://api.nasa.gov/planetary/apod?api_key=E0dwINrsYxiDcYZN3iRUIXooCzBUT7NBn90dq7N0

$(document).ready(function() {
    var planetArray = ["#sun", "#mercury", "#venus", "#earth", "#mars", "#jupiter", "#saturn", "#uranus", "#neptune", "#kuiper"];
    var shipArray = ["assets/images/x-wing.png", "assets/images/pelican.png", "assets/images/enterprise.png"];

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
    var newPostKey = firebase.database().ref().child("posts").push().key;
    var blowUp;
    var x = 0;
    var upgrade = false;
    var xwing = false;
    var enterprise = false;
    var pelican = false;
    var clickCounter = "";
    
    database.ref().on("child_added", function(snapshot) {
        $("#player").text(snapshot.val().name).addClass("has-text-white");
        $("#correct").text(snapshot.val().correct).addClass("has-text-white");
        $("#incorrect").text(snapshot.val().incorrect).addClass("has-text-white");

    }, function(errorObject) {
        console.log("Error: " + errorObject.code);
    });

    // When use hovers over an image, create overlay
    $(".image").mouseover(function(hover) {
    });

    // When user clicks an image, pull up modal
    $(".image").on("click", function(event) {
        event.stopImmediatePropagation();
        var userChoice = this.id;
        if (userChoice === answer) {
            correct ++;
            $("#correct").text(correct);
            $(".modal-card-head").addClass("has-background-success");
            $(".modal-card-head").removeClass("has-background-danger");
            $(".modal-card-title").text("Correct!").addClass("has-text-white");
            blowUp = false;
        }
        else {
            incorrect ++;
            $("#incorrect").text(incorrect);
            $(".modal-card-head").addClass("has-background-danger");
            $(".modal-card-head").removeClass("has-background-success");
            $(".modal-card-title").text("Incorrect").addClass("has-text-white");
            blowUp=true;
        }
        clickCounter ++;
        $(".modal1").addClass("is-active");
        $("#question-tracker").html(clickCounter + "/10");
    });
    
    // MODAL BUTTONS: close modal on button click
    $(".modal_button").on("click", function(e) {
        total = correct + incorrect;
        if (total === 10) {
            window.location = "gameover.html";
            endOfGame(correct, incorrect);
        } 
        planet = planetArray[counter2];
        if (correct !== 2 && correct !== 4 && correct !== 7 || (xwing === true && correct === 2) || (pelican === true && correct === 4) || (enterprise === true && correct === 7)) {
            checkStatus();
        }
        if (correct === 2 && xwing === false) {
            $("#ship-upgrade").css("visibility", "visible");
        }
        if (correct === 4  && pelican === false) {
            $("#ship-upgrade").css("visibility", "visible");
            $("#ship-text").html("You have collected enought data to upgrade to a Halo Pelican!");
            $("#ship").attr("src", shipArray[1]);
        }
        if (correct === 7 && enterprise === false) {
            $("#ship-upgrade").css("visibility", "visible");
            $("#ship-text").html("You have collected enought data to upgrade to the Star Trek Enterprise!");
            $("#ship").attr("src", shipArray[2]);
        }
        $(".modal1").removeClass("is-active");
        // Game over logic
        if ((correct === 2 && xwing === false)|| (correct === 4 && pelican === false) || (correct === 7 && enterprise === false)) {
            $(".modal2").addClass("is-active");
        }
    });

    // Changes the users ship to the ship displayed
    $(".modal_upgrade").on("click", function(e) {
        if (correct === 2 ) {
            $("#rocket").attr("src", "assets/images/x-wing-on.png");
            $("#rocket").css("margin-top", "1.5%");
            xwing = true;
        }
        if (correct === 4 ) {
            $("#rocket").attr("src", "assets/images/pelican-on.png");
            $("#rocket").css("margin-top", "1%");
            pelican = true;
        }
        if (correct === 7 ) {
            $("#rocket").attr("src", "assets/images/enterprise-on.png");
            $("#rocket").css("margin-top", "1.5%");
            enterprise = true;
        }
        upgrade = true;
        $(".modal2").removeClass("is-active");
        checkStatus();
    })

    // Changes the appropriate variables in the user doesn"t want to change ships
    $(".modal_reject").on("click", function(e) {
        e.preventDefault();
        console.log(correct);
        if (correct === 2 ) {
            xwing = true;
        }
        if (correct === 4 ) {
            pelican = true;
        }
        if (correct === 7 ) {
            enterprise = true;
        }
        $(".modal2").removeClass("is-active");
        checkStatus();
    })

    // Function that moves the rocket on the progress bar
    function moveRocket (){ 
        counter2 ++;
        if (counter2 < 14){
        $("#rocket").addClass("animation" + counter2).removeClass("animation" + (counter2 - 1));
            console.log(upgrade);
            console.log(pelican);
            console.log(xwing);  
            if (upgrade === false) {
                $("#rocket").attr("src", "assets/images/rocket.png");
                    timer = setTimeout(switchImage, 1000);
            }
            else if (xwing === true && pelican === false) {
                console.log("hello");
                $("#rocket").attr("src","assets/images/x-wing-on.png");
                timer = setTimeout(function() {
                    $("#rocket").attr("src", "assets/images/x-wing.png");
                }, 1000);
            }
            else if (pelican === true && enterprise === false) {
                console.log("hello");
                $("#rocket").attr("src","assets/images/pelican-on.png");
                timer = setTimeout(function() {
                    $("#rocket").attr("src", "assets/images/pelican.png");
                }, 1000);
            }
            else if (enterprise === true) {
                console.log("hello");
                $("#rocket").attr("src","assets/images/enterprise-on.png");
                timer = setTimeout(function() {
                    $("#rocket").attr("src", "assets/images/enterprise.png");
                }, 1000);
            }
        }   
    };
    
    //switches the rocket image 
    function switchImage () { 
        $("#rocket").attr("src", "assets/images/unpowered.png");
    }
    
    //Sets the name entered by the user into Local Storage
    $("#login-btn").on("click", function() {
        var username = $("#name-input").val().trim();
        localStorage.clear();
        localStorage.setItem("name", username);
   });  

   //Checks to see if the user is the appropriate age and if they have entered a username
   $("#login").on("click", function(event) {
        event.preventDefault();
        var age = $("#age-input").val().trim();
        var username = $("#name-input").val().trim();
        if (age > 6 && age < 101 && username !== "") {
           window.location.href = "game.html";
        }
   });  

   //Pushes the data from the game to Firebase
   function endOfGame (correct, incorrect) {
        name = localStorage.getItem("name");
        var postData = {
            correct: correct,
            incorrect: incorrect,
            name: name
        };
        var updates = {};
        updates[newPostKey] = postData;
        return firebase.database().ref().update(updates);
   }

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            console.log("auth state changed: " + user.uid);
            userID = user.uid; //when connecting by link, this will be the same user
            let shortUserID = Math.floor(Math.random() * 1000 + 1000);
            userName = prompt("Please enter a name to use for sending messages. If you don't choose one, we'll call you by this random number: ", shortUserID);
            if (userName == null || userName.trim() == "") {
                userName = shortUserID;
            };
            // User is signed in
            userSignedIn = true;
            userIdentificationPath = "users/" + userID + "/identification";
            if (window.location.href.indexOf("?") > 0) {
                turnURLIntoUserInstancesPath();
                console.log("user ID after signout: " + userID);
            } else {
                if (localStorageUIPath != null) {
                    userInstancesPath = localStorageUIPath;
                } 
                else {
                    userInstancesPath = userID + "/space-sounds/" + (+ new Date());
                }
                userMessagesPath = userInstancesPath + "/messages";
            }
            if (localStorageLastURLParams != null) {
                turnURLIntoUserInstancesPath(localStorageLastURLParams);
            };
            getLocation();
            setTimeout(function () {
                doAddEntry("connected");
            }, 2000);
        };
    });

    //Makes the planet the user was on explode if they get the question wrong
    function explosionAnimation () {
        setTimeout(function () {
            $(planet).attr("src", "assets/images/exploding.png");
        }, 1000);
        setTimeout(function () {
            $(planet).attr("src", "assets/images/exploding-one.png");
        }, 1075);
        setTimeout(function () {
            $(planet).attr("src", "assets/images/exploding-two.png");
        }, 1150);
        setTimeout(function () {
            $(planet).attr("src", "assets/images/exploding-three.png");
        }, 1225);
        setTimeout(function () {
            $(planet).attr("src", "assets/images/exploding-four.png");
        }, 1300);
        setTimeout(function () {
            $(planet).css("margin-top", "1.85%");
            $(planet).attr("src", "assets/images/exploding-five.png");
        }, 1375);
        setTimeout(function () {
            $(planet).attr("src", "");
        }, 1450);
    }

    //Gives the user positive feedback if they get a question correct
    function dataCollection () {
        $("#data-div").addClass("animation-data");
        $("#data-div").css("visibility", "visible");
        $("#data-div").css("margin-left", x + "vw");
        setTimeout(function() {
            $("#data-div").css("visibility", "hidden");
            $("#data-div").removeClass("animation-data");
        }, 1900);
    }

    //Checks to see if the planet should blow up, if the rocket should move, and what should be displayed
    function checkStatus () {
        if (blowUp === true) {
            $(planet).addClass("shake");
            explosionAnimation();
            display();
            moveRocket();
        }
        else {
            dataCollection();
            display();
            moveRocket();
        }
        x = x + 10;
        if (x === 48 || x=== 60 || x === 72) {
            x = x + 2;
        }
        else if (x === 20 || x === 39) {
            x = x - 1;
        }
        if (correct === 2 ) {
            xwing === true;
        }
        if (correct === 4 ) {
            pelican === true;
        }
        if (correct === 7 ) {
            enterprise === true;
        }
    }

});