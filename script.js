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