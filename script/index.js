/***CONSTRUCTORS ***/

const User = function (username, password) {
    this.username = username;
    this.picture = "./images/fade-icon.png";
    this.password = password;
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
submitLogBtn = document.querySelector("#log-submit");

//retrieves log out button
logoutBtn = document.querySelector(".logout");
//retrieves username + pfp in navbar
accountBtn = document.querySelector(".user-profile");

//retrieves the content in search bar
searchInput = document.querySelector("#search-input");

$(document).ready(function () {

    $.getJSON("users.json", function (usersData) {
        $.getJSON("posts.json", function (postsData) {

            postsData.posts.sort(function (a, b) {
                var diffA = a.upvotes - a.downvotes;
                var diffB = b.upvotes - b.downvotes;
                return diffB - diffA;
            });

            // Access the posts
            $.each(postsData.posts, function (index, post) {
                // Find the matching user
                var user = usersData.users.find(function (user) {
                    return user.username === post.username;
                });

                // Access the user's icon
                var picture = user ? user.picture : "default_icon.png";
                post.picture = picture;

                posts.push(post);

                refreshPostDisplay(posts);
            });
        });
    });
});

/*** SAMPLE EXISTING USERS ***/
var reg_users = {
    anne_s: "sulit123",
    bella_t: "torio123",
    zhoe_g: "gon123",
    mar_v: "villa123",
    jack_e: "eli123",
    andre_a: "aqui123",
    bien_m: "mir123",
    dom_b: "bac123",
    vinnie_i: "ino123",
    luis_r: "ran123",
};

/*** LOG IN FUNCTION ***/
submitLogBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    //retrieves username
    let login_un = document.querySelector("#login-username").value;
    //retrieves password
    let login_pw = document.querySelector("#login-pw").value;
    //retrieves username in nav bar
    let nav_un = document.querySelector(".nav-username");


    //retrieves div for displaying error message
    let errormsg = document.getElementById("login-error-msg");

    if (reg_users.hasOwnProperty(login_un)) {
        //console.log("username exists. valid log in");
        if (reg_users[login_un] == login_pw) {
            errormsg.textContent = "";
            //hides log in page
            home.classList.remove("show");
            accountBtn.classList.remove("hidden");
            formOpenBtn.classList.add("hidden");

            //displays the user's username in navbar
            nav_un.textContent = login_un;
        } else {
            errormsg.textContent = "The password you've entered is incorrect.";
        }
    } else {
        errormsg.textContent = "Username does not exist";
    }
});

/*** LOG OUT FUNCTION ***/
logoutBtn.addEventListener("click", async (e) => {
    console.log("working");
    accountBtn.classList.add("hidden");
    formOpenBtn.classList.remove("hidden");

    //retrieves username in nav bar
    let nav_un = document.querySelector(".nav-username");
    nav_un.textContent = "";

    //clears form
    let forms = document.querySelectorAll(".form-log-sign");
    forms.forEach((form) => form.reset());
});


/*** CREATE ACCOUNT FUNCTION ***/
submitSignBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    //retrieves username
    let username = document.querySelector("#username").value;
    console.log(`${username}`);

    //retrieves password and confirmation password
    let pw = document.querySelector(".pw").value;
    let confirm_pw = document.querySelector(".confirm-pw").value;

    //retrieves div for displaying error message
    let errormsg = document.getElementById("sign-error-msg");

    //retrieves username in nav bar
    let nav_un = document.querySelector(".nav-username");


    if (reg_users.hasOwnProperty(username)) {
        errormsg.textContent = "Username is already taken";
    } else {
        errormsg.textContent = "";
        //Sets username to be longer than 2 characters
        if (username.length < 3) {
            errormsg.textContent = "Username should be longer than 2 characters";
        } else {
            //Sets password to be longer than 2 characters
            if (pw.length < 3) {
                errormsg.textContent = "Password should be longer than 2 characters";
            } else {
                //Confirms the input password is the same as the confirmation password
                if (pw == confirm_pw) {
                    reg_users[username] = pw;
                    home.classList.remove("show");
                    accountBtn.classList.remove("hidden");
                    formOpenBtn.classList.add("hidden");
                    nav_un.textContent = username;
                    console.log(reg_users);
                } else {
                    errormsg.textContent = "Passwords do not match.";
                }
            }

        }
    }
});

/*** SEARCH FUNCTION ***/
searchInput.addEventListener("input", e => {
    //retrieves input in search bar
    const value = e.target.value.toLowerCase();
    //retrieves all post
    const postsElements = document.querySelectorAll(".post-item");
    //iterates through each post
    postsElements.forEach(post => {
        //retrieve title in this post
        const titleElement = post.querySelector(".title").textContent;
        //retrieve description in this post
        const descriptionElement = post.querySelector(".description").textContent;

        //checks if title or description includes searched value
        const isVisible = titleElement.toLowerCase().includes(value) || descriptionElement.toLowerCase().includes(value);
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
        signup = false;
        closeLoginSignUp(signup);
    });

    // switches to signup form
    signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("active");
        signup = true;
        // DEBUG: console.log(signup);
        closeLoginSignUp(signup);
    });
    //switches to signup form
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("active");
        signup = false;
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

function handleVote(buttons, newPost, type, voteCountP) {
    return function () {
        let status = $(this).css('color');
        let button = $(this);

        /**************************
        
        if(user == logged in), do the items below, else 
        
        *********************************/
        //activate button
        if (status !== 'rgb(211, 84, 0)') {
            console.log("clicked" + newPost.title);

            if (type == 1) {
                newPost.upvotes += 1;
                buttons[0].css('color', '#d35400');
                buttons[1].css('color', '#95a5a6');
            } else {
                newPost.downvotes += 1;
                buttons[1].css('color', '#d35400');
                buttons[0].css('color', '#95a5a6');
            }

            voteCountP.text(newPost.upvotes - newPost.downvotes);
        }
        //unclick button
        else {
            console.log("unclicked" + newPost.title);

            type == 1 ? newPost.upvotes -= 1 : newPost.downvotes -= 1;

            voteCountP.text(newPost.upvotes - newPost.downvotes);
            button.css('color', '#95a5a6');
        }
    };
}

function displayPost(newPost) {

    const postItemDiv = $('<div>').addClass('post-item');

    const postVotesSpan = $('<span>').addClass('post-votes');
    const voteUpButton = $('<button>').addClass('votes');
    const voteUpIcon = $('<i>').addClass('fa-solid fa-arrow-up').attr('id', 'upvote');


    const voteCountP = $('<p>').addClass('vote-cnt').text(newPost.upvotes - newPost.downvotes);
    const voteDownButton = $('<button>').addClass('votes');
    const voteDownIcon = $('<i>').addClass('fa-solid fa-arrow-down').attr('id', 'downvote');

    let buttons = [voteUpButton, voteDownButton];
    voteUpButton.bind('click', handleVote(buttons, newPost, 1, voteCountP));
    voteDownButton.bind('click', handleVote(buttons, newPost, 0, voteCountP));

    postVotesSpan.append(voteUpButton.append(voteUpIcon), $('<br>'), voteCountP, voteDownButton.append(voteDownIcon))


    const postContentSpan = $('<span>').addClass('post-content');
    const postContentTopSpan = $('<span>').addClass('post-content-top');

    const pfpImg = $('<img>').addClass('pfp').attr({
        src: newPost.picture,
        height: '45px',
        width: '45px'
    });

    const detailsSpan = $('<span>').addClass('details');
    const topRowDiv = $('<div>').addClass('top-row');
    const titleSpan = $('<span>').addClass('title').text(newPost.title);

    const postMetadataDiv = $('<div>').addClass('post-metadata');
    const postTagSpan = $('<span>').addClass('post-tag');

    const tagImg = $('<img>').attr({
        src: 'images/default-1.png',
        height: '15px',
        width: '15px'
    });

    postTagSpan.append(tagImg, newPost.tag);

    const commentCntSpan = $('<span>').addClass('comment-cnt');
    const commentCntImg = $('<i>').addClass('fa-solid fa-comment').attr('id', 'comment-icon').css('color', 'lightgray');

    commentCntSpan.append(commentCntImg, String(newPost.comments.length));
    postMetadataDiv.append(postTagSpan, commentCntSpan);
    topRowDiv.append(titleSpan, postMetadataDiv);

    const statusSpan = $('<span>').addClass('status');
    const usernameSpan = $('<span>').addClass('username').text(newPost.username);
    const postTimeSpan = $('<span>').addClass('post-time').text(" started this discussion on " + newPost.date);

    statusSpan.append(usernameSpan, postTimeSpan);

    const descriptionDiv = $('<div>').addClass('description').text(newPost.content.substring(0, 120) + "...");

    detailsSpan.append(topRowDiv, statusSpan);
    postContentTopSpan.append(pfpImg, detailsSpan);
    postContentSpan.append(postContentTopSpan, descriptionDiv);
    postItemDiv.append(postVotesSpan, postContentSpan);

    postItemDiv.hover(function () {
        postItemDiv.css('cursor', 'pointer');
    });


    postItemDiv.bind('click', function () {
        console.log("clicked" + newPost.postid);
        //window.location.href = 'post.html';
        let postId = newPost.postid;

        window.location.href = `post.html?postid=${postId}`;
    });

    $('#posts-container').append(postItemDiv);
}
