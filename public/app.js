$(document).ready(
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function () {
        // console.log('congratulations, you got to the second part of your API call')
    })
)

$("#scrapeButton").on("click", function (e) {
    window.location.reload();

    $.ajax({
        method: "GET",
        url: "/"
    }).then(function (data) {
        // console.log("DATA IS RIGHT HERE: ", data)
    })
});

$(document).on("click", ".noteButton", function (event) {
    $("#noteDiv").empty();
    var thisId = $(this).attr("data-id");
    var thisTitle = $(this).attr("data-title");

    $("#noteDiv").css('display', 'block');

    console.log("ID OF BUTTON U CLICK:", thisId)

    console.log("This is the 'this' of your button click:", $(this))

    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })
        .then(function (data) {
            console.log("DATA THAT IS RETURNED ON ARTICLE THING: ", data);

            var noteContent = $("<div>")
            noteContent.attr("class", 'noteContent')

            noteContent.append(thisTitle);
            noteContent.append("<br>");
            noteContent.append("<br>");
            noteContent.append("<input id='titleinput' name='title' placeholder='Note Title'>");
            noteContent.append("<br>")
            noteContent.append("<br>")
            noteContent.append("<textarea id='bodyinput' name='body' placeholder='Note Content'></textarea>");
            noteContent.append("<br>")
            noteContent.append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

            noteContent.append("<span class='close'>&times;</span>");

            noteContent.append("<br>")
            noteContent.append("<br>")
           

            $("#noteDiv").append(noteContent)

            console.log("data note???data: ", data.note)

            if (data.note) {

                noteContent.append("<h2><strong>Article Notes:</strong> </h2>")
                noteContent.append("<hr>");

    
                for (let i = 0; i < data.note.length; i++) {
                    
                    noteContent.append("<p><em>Title:</em> " + data.note[i].title + "</p>");
                    noteContent.append("<p><em>Body:</em> " + data.note[i].body + "</p>");
                    noteContent.append("<hr>");
                }
                
            }
        })
})

$(document).on("click", ".close", function(){

$("#noteDiv").css('display', 'none');

});

// window.onclick = function(event) {
//     if (event.target == $("#noteDiv")) {
//         $("#noteDiv").css('display', 'none');
//     }
//   }

$(document).on("click", "#savenote", function() {
    var thisId = $(this).attr("data-id");
  
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        title: $("#titleinput").val(),
        body: $("#bodyinput").val()
      }
    })
    .then(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });


