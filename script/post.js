const Comment = function (postid, commentid, username, date, content) {
    this.postid = postid;
    this.commentid = commentid;
    this.username = username;
    this.date = date;
    this.content = content;
    this.upvotes = 0;
    this.downvotes = 0;
    this.edited = false;
    this.replies = []; // Comments
}

var commentsCnt = 0;
var comments = [];
var currentUsername = "";
var currentuserPfp = "";
var origPost = 0;

$(document).ready(function () {

    currentUsername = localStorage.getItem("username");
    currentuserPfp = localStorage.getItem("profilepic");

    $('.nav-username').text(currentUsername);
    $('.nav-pfp').attr('src', currentuserPfp);

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postid');

    window.postid = postId;

    $.getJSON("users.json", function (usersData) {
        $.getJSON('comments.json', function (commentsData) {
            $.getJSON('posts.json', function (data) {

                const post = data.posts.find(function (item) {
                    return item.postid === postId;
                });
                
                origPost = post;

                const user = usersData.users.find(function (user) {
                    return user.username === post.username;
                });


                $.each(data.posts, function (index, post) {
                    var postComments = commentsData.comments.filter(function (comment) {
                        return comment.postid === post.postid;
                    });

                    post.comments = postComments;

                });

                $.each(commentsData.comments, function (index, comment) {
                    var user = usersData.users.find(function (user) {
                        return user.username === comment.username;
                    });

                    var picture = user ? user.picture : "./images/default-1.png";
                    comment.picture = picture;

                    commentsCnt++;
                });

                console.log("num of comments:" + commentsCnt);

                // Check if the post is found
                if (post) {

                    var picture = user ? user.picture : "default_icon.png";
                    post.picture = picture;

                    console.log(post);

                    refreshPost(post);

                    if (post.comments.length != 0) {
                        for (const c of post.comments) {
                            comments.push(c);
                            refreshComment(c);
                        }
                    }
                } else {
                    console.log("not found");
                }
            });
        });
    });

    function handleVote(buttons, newPost, type, voteCountP) {
        return function () {
            let status = $(this).css('color');
            let button = $(this);

            /**************************
            
            if(user == logged in), do the items below, else 
            
            *********************************/
            //activate button
            if (status !== 'rgb(211, 84, 0)') {
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
                type == 1 ? newPost.upvotes -= 1 : newPost.downvotes -= 1;

                voteCountP.text(newPost.upvotes - newPost.downvotes);
                button.css('color', '#95a5a6');
            }
        };
    }

    function refreshPost(post) {
        $('.post-tag').text(post.tag);
        $('.title').text(post.title);

        var postVotesSpan = $('<span>').addClass('post-votes');
        var upvoteButton = $('<button>').addClass('votes');
        var upvoteIcon = $('<i>').addClass('fa-solid fa-arrow-up').attr('id', 'upvote');
        upvoteButton.append(upvoteIcon);
        var voteCountP = $('<p>').addClass('vote-cnt').text(String(post.upvotes - post.downvotes));
        var downvoteButton = $('<button>').addClass('votes');
        var downvoteIcon = $('<i>').addClass('fa-solid fa-arrow-down').attr('id', 'downvote');
        downvoteButton.append(downvoteIcon);

        let buttons = [upvoteButton, downvoteButton];
        upvoteButton.bind('click', handleVote(buttons, post, 1, voteCountP));
        downvoteButton.bind('click', handleVote(buttons, post, 0, voteCountP));

        postVotesSpan.append(upvoteButton, $('<br>'), voteCountP, downvoteButton);

        var pfpImg = $('<img>').addClass('pfp').attr('src', post.picture).attr('height', '60px').attr('width', '60px');

        var postContentSpan = $('<span>').addClass('post-content');
        var detailsSpan = $('<span>').addClass('details');
        var statusSpan = $('<span>').addClass('status');
        var usernameSpan = $('<span>').addClass('username').text(post.username);
        var postDateSpan = $('<span>').addClass('post-date').text(post.date);
        var editedSpan = $('<span>').addClass('edited').text('Edited');
        statusSpan.append(usernameSpan, postDateSpan, editedSpan);
        detailsSpan.append(statusSpan);
        postContentSpan.append(detailsSpan, $('<div>').addClass('description').text(post.content));

        $('.post-item').append(postVotesSpan, pfpImg, postContentSpan);
        
        if(post.username != currentUsername){
            $('.meatballs').css('display','none');
        }
    }

    window.fresfreshComment = refreshComment;

    function refreshComment(c) {
        /**
        no functionality for reply, option, error when clicking updown vote on comments
        **/

        const commentItem = $('<div>').addClass('comment-item');
        const comment = $('<span>').addClass('comment');

        const upvoteButton = $('<button>').addClass('votes');
        const upvoteIcon = $('<i>').addClass('fa-solid fa-arrow-up').attr('id', 'upvote');
        const upvoteCount = $('<p>').addClass('vote-cnt').text(String(c.upvotes - c.downvotes));

        const postVotes = $('<span>').addClass('post-votes');
        const downvoteButton = $('<button>').addClass('votes');
        const downvoteIcon = $('<i>').addClass('fa-solid fa-arrow-down').attr('id', 'downvote');

        let buttons = [upvoteButton, downvoteButton];
        upvoteButton.bind('click', handleVote(buttons, c, 1, upvoteCount));
        downvoteButton.bind('click', handleVote(buttons, c, 0, upvoteCount));

        const commentPfp = $('<img>').addClass('comment-pfp').attr('src', c.picture).attr('height', '60px').attr('width', '60px');
        const postContent = $('<span>').addClass('post-content');
        const details = $('<span>').addClass('details');
        const status = $('<span>').addClass('status');
        const username = $('<span>').addClass('username').text(c.username);
        const postDate = $('<span>').addClass('post-date').text(c.date);
        const edited = $('<span>').addClass('edited').text('Edited');
        const description = $('<div>').addClass('description').text(c.content);
        const actions = $('<span>').addClass('actions');
        const reply = $('<div>').addClass('reply').text('Reply');
        const meatballs = $('<div>').addClass('meatballs').text('Options');

        edited.css('visibility', 'hidden');
        upvoteButton.append(upvoteIcon);
        downvoteButton.append(downvoteIcon);
        postVotes.append(upvoteButton, $('<br>'), upvoteCount, downvoteButton);
        status.append(username, postDate, edited);
        details.append(status);
        postContent.append(details, description);
        comment.append(postVotes, commentPfp, postContent);
        
        actions.append(reply, meatballs);
        commentItem.append(comment, actions);
        $('#comments-container').append($('<hr>'), commentItem);

    }
});

function replyToPost() {
    $('#popup-container').css('display', 'block');
    $('.reply-title').text("RE: " + origPost.title);
}

function closePopup() {
    $('#popup-container').css('display', 'none');
}

function submitReply(event) {
    event.preventDefault();

    commentsCnt++;
    var content = $('#reply-caption').val();

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


    var reply = new Comment(postid, commentsCnt, currentUsername, formattedDate, content);

    reply.picture = currentuserPfp;
    
    comments.push(reply);


    $("#comments-container").html('');
    for (const c of comments) {
        fresfreshComment(c);
    }
    
    $('#reply-form')[0].reset();
    closePopup();
}
