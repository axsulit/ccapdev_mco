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

// Create the profile picture image
const pfpImg = $('<img>').addClass('pfp').attr({
  src: 'images/fade-icon.png',
  height: '50px',
  width: '50px'
});

// Create the details span
const detailsSpan = $('<span>').addClass('details');

// Create the top row div
const topRowDiv = $('<div>').addClass('top-row');

// Create the title span
const titleSpan = $('<span>').addClass('title').text('This is a title.');

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
postTagSpan.append(tagImg, 'General Discussion');

// Create the comment count span
const commentCntSpan = $('<span>').addClass('comment-cnt');

// Create the comment count image
const commentCntImg = $('<img>').attr({
  src: 'images/fade-icon.png',
  height: '15px',
  width: '15px'
});

// Append the comment count image and text to the comment count span
commentCntSpan.append(commentCntImg, '50');

// Append the post tag and comment count spans to the post metadata div
postMetadataDiv.append(postTagSpan, commentCntSpan);

// Append the title and post metadata div to the top row div
topRowDiv.append(titleSpan, postMetadataDiv);

// Create the status div
const statusDiv = $('<div>').addClass('status').html('<b>aeririyel</b> started 2 hours ago');

// Create the description div
const descriptionDiv = $('<div>').addClass('description').text('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse vel iaculis nulla. Integer cursus ligula et diam congue placerat...');

// Append the profile picture, top row div, status div, and description div to the details span
detailsSpan.append(pfpImg, topRowDiv, statusDiv, descriptionDiv);

// Append the details span to the main container div
postItemDiv.append(detailsSpan);

// Append the main container div to the desired parent element in the document
$('#posts-container').append(postItemDiv); // Replace "parentElement" with the actual ID or selector of the parent element



    // Create elements/tags


    //        // Create elements/tags
    //        const singlePostMain = $("<div></div>");
    //        const singlePost = $("<div></div>");
    //        const spLeft = $("<div></div>");
    //        const imgContainer = $("<div></div>");
    //        const spPicture = $("<img>");
    //        const spRight = $("<div></div>");
    //        const spRightContent = $("<div></div>");
    //        const spTitle = $("<div></div>");
    //        const spBody = $("<div></div>");
    //        const spRightBottom = $("<div></div>");
    //        const spName = $("<div></div>");
    //        const spDate = $("<div></div>");
    //
    //        // DONE: Add classes to your created elements
    //        singlePostMain.addClass("single-post-main");
    //        singlePost.addClass("single-post");
    //        spLeft.addClass("sp-left");
    //        spPicture.addClass("sp-picture");
    //        spRight.addClass("sp-right");
    //        spRightContent.addClass("sp-right-content");
    //        spTitle.addClass("sp-title");
    //        spBody.addClass("sp-body");
    //        spRightBottom.addClass("sp-right-bottom");
    //        spName.addClass("sp-name");
    //        spDate.addClass("sp-date");
    //
    //        // DONE: Set the proper hierarchy of the created elements
    //        singlePostMain.append(singlePost);
    //        singlePost.append(spLeft);
    //        spLeft.append(imgContainer);
    //        imgContainer.append(spPicture);
    //        singlePost.append(spRight);
    //        spRight.append(spRightContent);
    //        spRightContent.append(spTitle);
    //        spRightContent.append(spBody);
    //        spRightContent.append(spRightBottom);
    //        spRightBottom.append(spName);
    //        spRightBottom.append(spDate);
    //
    //        // DONE: Set the proper content/values to the correct elements/tags
    //        spPicture.attr("src", newPost.picture);
    //        spTitle.text(newPost.title);
    //        spBody.text(newPost.content);
    //        spName.text(newPost.name);
    //        spDate.text(newPost.date.replace("T", " | "));
    //
    //        // DONE: Place the outermost element (single-post-main) inside post-container
    //        $("div#posts-container").append(singlePostMain);
}
