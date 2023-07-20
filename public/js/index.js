// ._____________________________________.
// ||									||
// ||          CONSTRUCTORS             ||
// ||___________________________________||
// '

const User = function (username, password, picture) {
    this.username = username;
    this.picture = picture;
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

const Tag = function (type, icon) {
    this.type = type;
    this.icon = icon;
}

// ._____________________________________.
// ||									||
// ||         GLOBAL VARIABLES          ||
// ||___________________________________||
// '

let posts = [];
let comments = [];
let postCtr = 0;
let currentUser = new User("placeholder", 123, "./images/fade-icon.png");

// Tags
let generalDiscussion = new Tag("General Discussion", "fa-regular fa-comments");
let lft = new Tag("LFT", "fa-solid fa-user-group");
let technicalIssues = new Tag("Technical Issues", "fa-solid fa-wrench");
let offTopic = new Tag("Off Topic", "Off Topic");

const formOpenBtn = $("#form-open");
const home = $(".home");
const formContainer = $(".form-container"); // contains form content for login or signup
const formCloseBtn = $(".form-close"); // closes form

// buttons for transferring between signup and login
const signUpBtn = $("#signup");
const loginBtn = $("#login");

// buttons for submission of username and password in login/sign-up
const submitSignBtn = $("#sign-submit");
const submitLogBtn = $("#log-submit");

const logoutBtn = $(".logout"); // retrieves log out button
const accountBtn = $(".user-profile"); // retrieves username + pfp in navbar
const searchInput = $("#search-input"); // retrieves the content in search bar

$(document).ready(function () {
    // Load data from users.json
    $.getJSON("users.json", function (usersData) {
        // Load data from comments.json
        $.getJSON("comments.json", function (commentsData) {
            // Load data from posts.json
            $.getJSON("posts.json", function (postsData) {

                // Default sort posts based on votes score
                postsData.posts.sort(function (a, b) {
                    var diffA = a.upvotes - a.downvotes;
                    var diffB = b.upvotes - b.downvotes;
                    return diffB - diffA;
                });

                //Access and store list of comments per post
                $.each(postsData.posts, function (index, post) {
                    var postComments = commentsData.comments.filter(function (comment) {
                        return comment.postid === post.postid;
                    });
                    post.comments = postComments;
                });


                // Access the posts
                $.each(postsData.posts, function (index, post) {
                    // Find the matching user in usersData
                    var user = usersData.users.find(function (user) {
                        return user.username === post.username;
                    });

                    // Access the user's picture 
                    var picture = user ? user.picture : "default_icon.png";
                    post.picture = picture;

                    // Add post
                    posts.push(post);
                    postCtr++;
                    refreshPostDisplay(posts);
                });

            });
        });
    });
});


// ._____________________________________.
// ||									||
// ||       DISCUSSION FUNCTIONS        ||
// ||___________________________________||
// '

function showWritePost() {
    $('#popup-container').css('display', 'block');
}

function closeWritePost() {
    $('#popup-container').css('display', 'none');
}

function submitPost(event) {
    event.preventDefault(); // Prevent form submission

    var title = $("#post-title").val();
    var caption = $("#post-caption").val();

    // Clear and Close form
    $("#post-form")[0].reset();
    closeWritePost();

    // Create a new post and add it to posts
    postCtr++;

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


// ._____________________________________.
// ||									||
// ||          POST FUNCTIONS           ||
// ||___________________________________||
// '

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

    postContentSpan.hover(function () {
        postContentSpan.css('cursor', 'pointer');
    });


    postContentSpan.bind('click', function () {
        console.log("clicked" + newPost.postid);
        //window.location.href = 'post.html';
        let postId = newPost.postid;

        window.location.href = `post.html?postid=${postId}`;
    });

    $('#posts-container').append(postItemDiv);
}
