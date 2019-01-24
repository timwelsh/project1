// NASA API key E0dwINrsYxiDcYZN3iRUIXooCzBUT7NBn90dq7N0
// example: https://api.nasa.gov/planetary/apod?api_key=E0dwINrsYxiDcYZN3iRUIXooCzBUT7NBn90dq7N0

$(document).ready(function() {
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
});