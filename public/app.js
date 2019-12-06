$(document).on("click", ".articleSave", function() {
  // Grab the id associated with the article from the submit button
  var thisHeadline = $(this).attr("data-headline");
  var thisSummary = $(this).attr("data-summary");
  var thisUrl = $(this).attr("data-url");
console.log("are we saving anything?")
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/save/",
    data: {
      headline: thisHeadline,
      summary: thisSummary,
      url: thisUrl
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
    })})

$(document).on("click", "#scrapeButton", function () {
   $.getJSON("../routes/scrape", function(data) {
    //   // For each one
      for (var i = 0; i < data.length; i++) {
        // Display the information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + "<br />" + data[i].link + "</p>");
      }
    })
  })