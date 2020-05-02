
//Updates user icon on top right on load
function updateUserIcon(){

    var savedIconIdentifier = localStorage.getItem("userIcon");

    if(savedIconIdentifier) {
        //USE SAVED IDENTIFIER TO LOAD THE SAME USER AVATAR
        var svg = $("<img>");
        svg.addClass("avatar-img");
        svg.attr("src", "https://avatars.dicebear.com/v2/avataaars/avatar"+savedIconIdentifier+".svg?mood=happy&radius=30&width=75&background=%23FFFFFF");
        svg.attr("alt", "avatar");
        $("#user-icon").append(svg);

    } else {
        //GENERATE NEW USER ICON

        var randomIdentifier = Math.random() * 100;

        var svg = $("<img>");
            svg.addClass("avatar-img");
            svg.attr("src", "https://avatars.dicebear.com/v2/avataaars/avatar"+randomIdentifier+".svg?mood=happy&radius=30&width=75&background=%23FFFFFF");
            svg.attr("alt", "avatar");
            $("#user-icon").append(svg);

        localStorage.setItem("userIcon", randomIdentifier);
    }

}

updateUserIcon();

// RYAN start js function bookSearch
$(document).ready(function(){	

   $("#myform").submit(function(){

   	  var search = $("#books").val();
   	  if(search == ""){}else{		
   	  var url = "";
   	  var img = "";
      var title = "";
      var author = "";

   	  $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){

          for(i=0;i<response.items.length;i++)
          {
           title=$('<h5 class="center-align">' + response.items[i].volumeInfo.title + '</h5>');  
           author=$('<h5 class="center-align"> By:' + response.items[i].volumeInfo.authors + '</h5>');
           img = $('<img class="aligning card z-depth-5" id="dynamic"><br><a href=' + response.items[i].volumeInfo.infoLink + '><button id="imagebutton" class="btn">Read More</button>'); 	
           url= response.items[i].volumeInfo.imageLinks.thumbnail;
           img.attr('src', url);
           title.appendTo('#result');
           author.appendTo('#result');
           img.appendTo('#result');
          }
   	  });
      
      }
      return false;
   });

});
// RYAN end js function bookSearch
