var booksIRead=[];
var booksImReading=[];
var booksIWantToRead=[];
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
      var divCol = "";

   	  $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){

          for(i=0;i<response.items.length;i++)
          {
           divCol = $("<div>");
           divCol.addClass("column book-div");

           title=$('<h5 class="book-title"><strong>' + response.items[i].volumeInfo.title + '</strong></h5>');  
           author=$('<h5 class="book-author"> By:' + response.items[i].volumeInfo.authors + '</h5>');
           img = $('<img class="aligning card z-depth-5" id="dynamic"><br><a href=' + response.items[i].volumeInfo.infoLink + '>'); 	
           url= response.items[i].volumeInfo.imageLinks.thumbnail;
           img.attr('src', url);

           buttonDiv = $("<div>");
           button1 = $('<button book="'+response.items[i].volumeInfo.title+'" status="read" id="imagebutton" class="btn hollow button">Read</button>');
           button2 = $('<button book="'+response.items[i].volumeInfo.title+'" status="reading" id="imagebutton" class="btn hollow button">Reading</button>');
           button3 = $('<button book="'+response.items[i].volumeInfo.title+'" status="wantToRead" id="imagebutton" class="btn hollow button">Want to Read</button>');
           
           divCol.append(title);
           divCol.append(author);
           divCol.append(img);
           
           buttonDiv.addClass("read-btns");
           buttonDiv.append(button1);
           buttonDiv.append(button2);
           buttonDiv.append(button3);
           divCol.append(buttonDiv);

           $("#result").append(divCol);

          } 

          //event listener for bttns with id img bttn
           
          $("#imagebutton").on("click",function() {
            //grabe book attr from bttn
            var bookTitle=$(this).attr("book");
            var status=$(this).attr("status");
            if(status=="read") {
                booksIRead.push(bookTitle)
            } else if(status=="reading") {
                booksImReading.push(bookTitle)
            } else if(status=="wantToRead") {
                booksIWantToRead.push(bookTitle)
            }

            updateList();

            

          });
   	  });
      
      }
      return false;
   });

});


// RYAN end js function bookSearch
