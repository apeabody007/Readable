var booksIRead=[];
var booksImReading=[];
var booksIWantToRead=[];

//Checks if lists are saved and if saved, updates the lists on the UI
if(localStorage.getItem("bookLists") != null && localStorage.getItem("bookLists").length > 0) {

    var savedBookLists = localStorage.getItem("bookLists");
    savedBookLists = JSON.parse(savedBookLists);

    booksImReading = savedBookLists.booksImReading;
    booksIRead = savedBookLists.booksIRead;
    booksIWantToRead = savedBookLists.booksIWantToRead;

    updateLists();
}


var booksIRead=[];
var booksImReading=[];
var booksIWantToRead=[];

//Checks if lists are saved and if saved, updates the lists on the UI
if(localStorage.getItem("bookLists") != null && localStorage.getItem("bookLists").length > 0) {

    var savedBookLists = localStorage.getItem("bookLists");
    savedBookLists = JSON.parse(savedBookLists);

    booksImReading = savedBookLists.booksImReading;
    booksIRead = savedBookLists.booksIRead;
    booksIWantToRead = savedBookLists.booksIWantToRead;

    updateLists();
}


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

   $("#myform").submit(function(evt){

      evt.preventDefault();
   	  var search = $("#books").val();
   	  if(search == ""){}else{		
   	  var url = "";
   	  var img = "";
      var title = "";
      var author = "";
      var divCol = "";

      //empties result div
      $("#result").empty();

   	  $.get("https://www.googleapis.com/books/v1/volumes?q=" + search,function(response){

          for(i=0;i<response.items.length;i++)
          {
           divCol = $("<div>");
           divCol.addClass("column book-div");

           title=$('<h5 class="book-title"><strong>' + response.items[i].volumeInfo.title + '</strong></h5>'); 
           if(response.items[i].volumeInfo.authors != undefined) {
            author=$('<h5 class="book-author">' + response.items[i].volumeInfo.authors[0] + '</h5>');
           } else {
               author = $('<h5 class="book-author">Unknown</h5>');
           }
           img = $('<img class="aligning card z-depth-5" id="dynamic"><br><a href=' + response.items[i].volumeInfo.infoLink + '>'); 
           
           //if no thumbnail is available, use a placeholder
           if(response.items[i].volumeInfo.imageLinks != undefined) {
            url= response.items[i].volumeInfo.imageLinks.thumbnail.replace("http","https");
            } else {
                url = "https://via.placeholder.com/150x200";
            }
           img.attr('src', url);

           buttonDiv = $("<div>");
           button1 = $('<button book="'+response.items[i].volumeInfo.title+'" status="read" class="btn hollow button add-btn">Read</button>');
           button2 = $('<button book="'+response.items[i].volumeInfo.title+'" status="reading" class="btn hollow button add-btn">Reading</button>');
           button3 = $('<button book="'+response.items[i].volumeInfo.title+'" status="wantToRead" class="btn hollow button add-btn">Want to Read</button>');
           
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
                    
            $(".add-btn").on("click",function() {
                //grabe book attr from bttn
                var bookTitle=$(this).attr("book");
                console.log("title - "+bookTitle);
                var status=$(this).attr("status");
                console.log("status - "+status);

                if(status=="read") {
                    booksIRead.push(bookTitle)
                } else if(status=="reading") {
                    booksImReading.push(bookTitle)
                } else if(status=="wantToRead") {
                    booksIWantToRead.push(bookTitle)
                }

                updateLists();
            });


         });
         
         //clears search input
         $("#books").val("");
      
      }
      return false;
   });

});


//Update ULs using global variable arrays
function updateLists() {

    $("#books-read").empty();
    $("#books-reading").empty();
    $("#books-to-read").empty();

// add button to each li item/class (below), [DONE]
//  name each button the name of book (name is string), 
// THEN call update to list function

    for(var i = 0; i < booksIRead.length; i++) {

        var li = $("<li>");
        var divRow = $("<div>");
        divRow.addClass("row");
        

        var colDiv1 = $("<div>");
        colDiv1.addClass("col-6");
        colDiv1.html("<p>"+booksIRead[i]+"</p>");

        var colDiv2 = $("<div>");
        colDiv2.addClass("col-6");
        colDiv2.html('<input type="button" value="Delete" class="deleteBooksRead" index="'+i+'" />');

        divRow.append(colDiv1, colDiv2);
        li.append(divRow);
        $("#books-read").append(li);

    }


    for(var n = 0; n < booksImReading.length; n++) {

        var li = $("<li>");
        var divRow = $("<div>");
        divRow.addClass("row");
        

        var colDiv1 = $("<div>");
        colDiv1.addClass("col-6");
        colDiv1.html("<p>"+booksImReading[n]+"</p>");

        var colDiv2 = $("<div>");
        colDiv2.addClass("col-6");
        colDiv2.html('<input type="button" value="Delete" class="deleteBooksReading" index="'+n+'" />');

        divRow.append(colDiv1, colDiv2);
        li.append(divRow);
        $("#books-reading").append(li);

    }


    for(var k = 0; k < booksIWantToRead.length; k++) {

        var li = $("<li>");
        var divRow = $("<div>");
        divRow.addClass("row");
        

        var colDiv1 = $("<div>");
        colDiv1.addClass("col-6");
        colDiv1.html("<p>"+booksIWantToRead[k]+"</p>");

        var colDiv2 = $("<div>");
        colDiv2.addClass("col-6");
        colDiv2.html('<input type="button" value="Delete" class="deleteBooksIWantToRead" index="'+k+'" />');

        divRow.append(colDiv1, colDiv2);
        li.append(divRow);
        $('#books-to-read').append(li);

    }

    $(".deleteBooksRead").on("click",deleteBook);

    $(".deleteBooksReading").on("click",deleteBook);

    $(".deleteBooksIWantToRead").on("click",deleteBook);

    //creating data object of lists to save to local storage    
    var listObj = {};
    listObj.booksIRead = booksIRead;
    listObj.booksIWantToRead = booksIWantToRead;
    listObj.booksImReading = booksImReading;

    //saving object to local storage
    localStorage.setItem("bookLists", JSON.stringify(listObj));

}

// RYAN end js function bookSearch

//Checks if value is already added to array. If yes, return false. If city is new, return true.
function isDuplicate(value, array) {

    var check = array.filter(function(n) {
        return n == value;
    });

    if(check != null && check.length > 0) {
        return true;
    }else {
        return false;
    }
    
}

// (RYAN) Event Listeners for Delete buttons 
//event listener for bttns with id img bttn

function deleteBook(){

    var index=$(this).attr("index");

    var className=$(this).attr("class");
    if(className == "deleteBooksRead"){
        console.log(booksIRead)
        booksIRead.splice(index,1);
        console.log(index)

    }else if(className == "deleteBooksReading"){
        booksImReading.splice(index,1);

    }else if(className == "deleteBooksIWantToRead"){
        booksIWantToRead.splice(index,1);
    }

    var listObj = {};
    listObj.booksIRead = booksIRead;
    listObj.booksIWantToRead = booksIWantToRead;
    listObj.booksImReading = booksImReading;

    //saving object to local storage
    localStorage.setItem("bookLists", JSON.stringify(listObj));
    updateLists()
}
