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


/***POPUP FUNCTIONS ***/

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

    var item = new Post(postCtr, currentUser.username, currentUser.picture, "date", title, caption, "General Discussion");
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

    // Create the description div
    const descriptionDiv = $('<div>').addClass('description').text(newPost.content);

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
