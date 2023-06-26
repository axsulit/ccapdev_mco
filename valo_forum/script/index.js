/***CONSTRUCTORS ***/

const User = function (username) {
    this.username = username;
    this.picture = "./images/fade-icon.png";
}

const Post = function (postid, username, picture, date, title, content, tag) {
    this.postid = postid;
    this.username = username;
    this.picture = picture;

    this.date = date;
    this.title = title;
    this.content = content;
    this.tag = tag;
    this.comments = [];
    this.upvotes = 0;
    this.downvotes = 0;
    this.edited = false;
}

const Comment = function (username, date, content) {
    this.username = username;
    this.date = date;
    this.content = content;
    this.edited = false;
    this.replies = []; // Comments
}

const Tag = function (type, icon) {
    this.type = type;
    this.icon = icon;
}

/***GLOBAL VARIABLES ***/

let posts = [];
let comments = [];
let postCtr = 0;

let generalDiscussion = new Tag("General Discussion", "fa-regular fa-comments");
let lft = new Tag("LFT", "fa-solid fa-user-group");
let technicalIssues = new Tag("Technical Issues", "fa-solid fa-wrench");
let offTopic = new Tag("Off Topic", "Off Topic");

//opens up pop-up
const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),

//comtains form content for login or signup
formContainer = document.querySelector(".form-container");

//closes form
formCloseBtn = document.querySelector(".form-close");

//buttons for transferring between signup and login
signUpBtn = document.querySelector("#signup");
loginBtn = document.querySelector("#login");

//buttons for submission of username and password in login/ sign-up
submitSignBtn = document.querySelector("#sign-submit");
submitLogBtn=document.querySelector("#log-submit");

//retrieves log out button
logoutBtn=document.querySelector(".logout");
//retrieves username + pfp in navbar
accountBtn=document.querySelector(".user-profile");

//retrieves the content in search bar
searchInput=document.querySelector("#search-input");

$(document).ready(function () {

    //  // Load the JSON file and store the posts in the array
    //  $.getJSON('posts.json', function(data) {
    //    // Iterate over each post in the JSON data
    //    $.each(data.posts, function(index, post) {
    //      // Add the post to the array
    //      posts.push(post);
    //    });
    //
    //    // Do something with the postsArray
    //    refreshPostDisplay(posts);
    //  });
});

/*** SAMPLE EXISTING USERS ***/
var reg_users={
    anne_s:"sulit123",
    bella_t:"torio123",
    zhoe_g:"gon123",
    mar_v:"villa123",
    jack_e:"eli123",
    andre_a:"aqui123",
    bien_m:"mir123",
    dom_b:"bac123",
    vinnie_i:"ino123",
    luis_r:"ran123",

};

/*** LOG IN FUNCTION ***/
submitLogBtn.addEventListener("click",async(e)=>{
    e.preventDefault();

    //retrieves username
    let login_un=document.querySelector("#login-username").value;
    //retrieves password
    let login_pw=document.querySelector("#login-pw").value;
    //retrieves username in nav bar
    let nav_un=document.querySelector(".nav-username");
    

    //retrieves div for displaying error message
    let errormsg=document.getElementById("login-error-msg");

    if(reg_users.hasOwnProperty(login_un)){
        //console.log("username exists. valid log in");
        if(reg_users[login_un]==login_pw){
            errormsg.textContent="";
            //hides log in page
            home.classList.remove("show");
            accountBtn.classList.remove("hidden");
            formOpenBtn.classList.add("hidden");

            //displays the user's username in navbar
            nav_un.textContent=login_un;
        }
        else{
            errormsg.textContent="The password you've entered is incorrect.";
        }
    }
    else{
        errormsg.textContent="Username does not exist";
    }
});

/*** LOG OUT FUNCTION ***/
logoutBtn.addEventListener("click",async(e)=>{
    console.log("working");
    accountBtn.classList.add("hidden");
    formOpenBtn.classList.remove("hidden");

    //retrieves username in nav bar
    let nav_un=document.querySelector(".nav-username");
    nav_un.textContent="";

    //clears form
    let forms = document.querySelectorAll(".form-log-sign");
    forms.forEach((form) => form.reset());
});


/*** CREATE ACCOUNT FUNCTION ***/
submitSignBtn.addEventListener("click", async(e)=>{
    e.preventDefault();

    //retrieves username
    let username=document.querySelector("#username").value;
    console.log(`${username}`);

    //retrieves password and confirmation password
    let pw=document.querySelector(".pw").value;
    let confirm_pw=document.querySelector(".confirm-pw").value;

    //retrieves div for displaying error message
    let errormsg=document.getElementById("sign-error-msg");

    //retrieves username in nav bar
    let nav_un=document.querySelector(".nav-username");
    

    if(reg_users.hasOwnProperty(username)){
        errormsg.textContent="Username is already taken";
    }
    else{
        errormsg.textContent="";
        //Sets username to be longer than 2 characters
        if(username.length<3){
            errormsg.textContent="Username should be longer than 2 characters";
        }
        else{
            //Sets password to be longer than 2 characters
            if(pw.length<3){
                errormsg.textContent="Password should be longer than 2 characters";
            }
            else{
                //Confirms the input password is the same as the confirmation password
                if(pw==confirm_pw){ 
                    reg_users[username]=pw;
                    home.classList.remove("show");
                    accountBtn.classList.remove("hidden");
                    formOpenBtn.classList.add("hidden");
                    nav_un.textContent=username;
                    console.log(reg_users);
                }
                else{
                    errormsg.textContent="Passwords do not match.";
                }
            }
            
        }  
    } 
});

/*** SEARCH FUNCTION ***/
searchInput.addEventListener("input",e=>{
    //retrieves input in search bar
    const value=e.target.value.toLowerCase();
    //retrieves all post
    const postsElements=document.querySelectorAll(".post-item");
    //iterates through each post
    postsElements.forEach(post=>{
        //retrieve title in this post
        const titleElement=post.querySelector(".title").textContent;
        //retrieve description in this post
        const descriptionElement=post.querySelector(".description").textContent;

        //checks if title or description includes searched value
        const isVisible=titleElement.toLowerCase().includes(value)||descriptionElement.toLowerCase().includes(value);
        post.style.display = isVisible ? "flex" : "none";
        
    });


});

/*** LOG IN AND SIGN UP FUNCTIONS ***/
handleLoginSignUp();
function handleLoginSignUp() {
    let signup = false;
    // opens login form
    formOpenBtn.addEventListener("click", () => {
        home.classList.add("show");
        formContainer.classList.remove("active");
        signup=false;
        closeLoginSignUp(signup);
    });

    // switches to signup form
    signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("active");
        signup=true;
        // DEBUG: console.log(signup);
        closeLoginSignUp(signup);
    });
    //switches to signup form
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("active");
        signup=false;
        // DEBUG: console.log(signup);
        closeLoginSignUp(signup);
    });
};


function closeLoginSignUp(signup) {
    // DEBUG: console.log("inside close: " + signup);
    if (signup == true) {
        formCloseBtn.addEventListener("click", () => {
            home.classList.remove("show");
            formContainer.classList.add("active");
            // DEBUG: console.log(signup);
        });
    } else {
        formCloseBtn.addEventListener("click", () => {
            home.classList.remove("show");
            formContainer.classList.remove("active");
            // DEBUG: console.log(signup);
        });
    }
}


/*** POPUP FUNCTIONS ***/

function showPopup() {
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "block";
}

function closePopup() {
    var popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "none";
}

function submitPost(event) {
    event.preventDefault(); // Prevent form submission

    var title = document.getElementById("post-title").value;
    var caption = document.getElementById("post-caption").value;

    // Clear and Close form
    document.getElementById("post-form").reset();
    closePopup();


    // Create a new post and add it to posts
    postCtr++;
    let currentUser = new User("Fade");

    // Get today's date
    const today = new Date();

    // Format the date into "Month Day, Year hour:minutes AM/PM" format
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: false
    };
    const formattedDate = today.toLocaleString('en-US', options);

    console.log(formattedDate); // Output: May 29, 2023 10:30 AM


    var item = new Post(postCtr, currentUser.username, currentUser.picture, formattedDate, title, caption, "General Discussion");
    posts.push(item);

    console.log(item);
    console.log(posts);

    // Refresh the displayed posts
    refreshPostDisplay(posts);
}

// try

/***VOTE BUTTON FUNCTIONS***/

var upvote_state = false;
var downvote_state = false;

function upvote() {
    if (upvote_state === false) {
        document.getElementById("upvote").style.color = "#d35400";
        document.getElementById("downvote").style.color = "#95a5a6";
        upvote_state = true;
        downvote_state = false;
    } else {
        document.getElementById("upvote").style.color = "#95a5a6";
        upvote_state = false;
    }
}

function downvote() {
    if (downvote_state === false) {
        document.getElementById("downvote").style.color = "#d35400";
        document.getElementById("upvote").style.color = "#95a5a6";
        upvote_state = false;
        downvote_state = true;
    } else {
        document.getElementById("downvote").style.color = "#95a5a6";
        downvote_state = false;
    }
}

/***POST FUNCTIONS***/

function refreshPostDisplay(displayedPosts) {
    $("#posts-container").html('');

    if (displayedPosts.length == 0) {
        const filter = $("<p></p>");
        filter.addClass("filler-text");
        filter.html("▓▒░(°◡°)░▒▓<br>Wow such empty...");
        $("#posts-container").append(filter);
    } else {
        displayPosts(displayedPosts);
    }
}

function displayPosts(newPosts) {
    $("#posts-container").html('');

    for (const p of newPosts) {
        displayPost(p);
    }
}

function displayPost(newPost) {
    // Create the main container div
    const postItemDiv = $('<div>').addClass('post-item');

    // POst votes span
    const postVotesSpan = $('<span>').addClass('post-votes');

    // Create the vote up button
    const voteUpButton = $('<button>').addClass('votes').click(upvote);

    // Create the vote up icon
    const voteUpIcon = $('<i>').addClass('fa-solid fa-arrow-up').attr('id', 'upvote');

    // Create the vote count paragraph
    const voteCountP = $('<p>').addClass('vote-cnt').text(newPost.upvotes - newPost.downvotes);

    // Create the vote down button
    const voteDownButton = $('<button>').addClass('votes').click(downvote);

    // Create the vote down icon
    const voteDownIcon = $('<i>').addClass('fa-solid fa-arrow-down').attr('id', 'downvote');

    // Create the vote buttons container
    postVotesSpan.append(voteUpButton.append(voteUpIcon), $('<br>'), voteCountP, voteDownButton.append(voteDownIcon))

    // Create the post content span
    const postContentSpan = $('<span>').addClass('post-content');

    // Create the post content top span
    const postContentTopSpan = $('<span>').addClass('post-content-top');

    // Create the profile picture image
    const pfpImg = $('<img>').addClass('pfp').attr({
        src: newPost.picture,
        height: '50px',
        width: '50px'
    });

    // Create the details span
    const detailsSpan = $('<span>').addClass('details');

    // Create the top row div
    const topRowDiv = $('<div>').addClass('top-row');

    // Create the title span
    const titleSpan = $('<span>').addClass('title').text(newPost.title);

    // Create the post metadata div
    const postMetadataDiv = $('<div>').addClass('post-metadata');

    // Create the post tag span
    const postTagSpan = $('<span>').addClass('post-tag');

    // Create the tag image
    const tagImg = $('<img>').attr({
        src: 'images/fade-icon.png',
        height: '15px',
        width: '15px'
    });

    // Append the tag image and text to the post tag span
    postTagSpan.append(tagImg, newPost.tag);

    // Create the comment count span
    const commentCntSpan = $('<span>').addClass('comment-cnt');

    // Create the comment count image
    const commentCntImg = $('<img>').attr({
        src: 'images/fade-icon.png',
        height: '15px',
        width: '15px'
    });

    // Append the comment count image and text to the comment count span
    commentCntSpan.append(commentCntImg, String(newPost.comments.length));

    // Append the post tag and comment count spans to the post metadata div
    postMetadataDiv.append(postTagSpan, commentCntSpan);

    // Append the title and post metadata div to the top row div
    topRowDiv.append(titleSpan, postMetadataDiv);

    // Create the status span
    const statusSpan = $('<span>').addClass('status');

    // Create the username span
    const usernameSpan = $('<span>').addClass('username').text(newPost.username);

    // Create the post time span
    const postTimeSpan = $('<span>').addClass('post-time').text(" started this discussion on " + newPost.date);

    // Append the username and post time spans to the status span
    statusSpan.append(usernameSpan, postTimeSpan);
    
    const descriptionDiv = $('<div>').addClass('description').text(newPost.content.substring(0, 130) + "...");

    // Append the profile picture, top row div, status div, and description div to the details span
    detailsSpan.append(topRowDiv, statusSpan);

    // Append to post-content-top span
    postContentTopSpan.append(pfpImg, detailsSpan);

    postContentSpan.append(postContentTopSpan, descriptionDiv);

    // Append the details span to the main container div
    postItemDiv.append(postVotesSpan, postContentSpan);

    // Append the main container div to the desired parent element in the document
    $('#posts-container').append(postItemDiv);
}
