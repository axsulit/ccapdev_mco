const Post = function (username, picture, date, title, content) {
    this.username = username;
    this.picture = picture;
    this.date = date;
    this.title = title;
    this.content = content;
}

function showPopup() {
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "block";
}
// Hide the popup container
function closePopup() {
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "none";
}
function submitPost(event) {
    event.preventDefault(); // Prevent form submission

    var title = document.getElementById("post-title").value;
    var caption = document.getElementById("post-caption").value;

    // Do something with the submitted data (e.g., send it to a server)
    console.log("Title: " + title);
    console.log("Caption: " + caption);

    // Clear the form
    document.getElementById("post-form").reset();
}

// try

const User = function(username) {
    this.username = username;
    this.img = "./images/fade-icon.png";
}



let posts = [];
let messages = [];
let postCtr = 0;

let currentUser = new User("Fade");