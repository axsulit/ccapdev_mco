$(document).ready(function () {

    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('postid');


    $.getJSON('posts.json', function (data) {

        const post = data.posts.find(function (item) {
            return item.postid === postId;
        });

        // Check if the post is found
        if (post) {
            // Render the post content in the postContainer div
            console.log(post);

            refreshPost(post);

            if (post.comments.length != 0) {
                console.log(post.comments.length);

                for (const c of post.comments) {
                    refreshComment(c);
                }
            }
        } else {
            console.log("not found");
        }
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
    }

    function refreshComment(c) {
        console.log(c);


        const commentItem = $('<div>').addClass('comment-item');
        const comment = $('<span>').addClass('comment');
        const postVotes = $('<span>').addClass('post-votes').text(String(c.upvotes - c.downvotes));
        const upvoteButton = $('<button>').addClass('votes');
        const upvoteIcon = $('<i>').addClass('fa-solid fa-arrow-up').attr('id', 'upvote');
        const upvoteCount = $('<p>').addClass('vote-cnt').text(c.upvotes + c.downvotes);
        const downvoteButton = $('<button>').addClass('votes');
        const downvoteIcon = $('<i>').addClass('fa-solid fa-arrow-down').attr('id', 'downvote');

        let buttons = [upvoteButton, downvoteButton];
        upvoteButton.bind('click', handleVote(buttons, comment, 1, postVotes));
        downvoteButton.bind('click', handleVote(buttons, comment, 0, postVotes));

        const commentPfp = $('<img>').addClass('comment-pfp').attr({
            src: 'images/fade-icon.png',
            height: '60px',
            width: '60px'
        });
        const postContent = $('<span>').addClass('post-content');
        const details = $('<span>').addClass('details');
        const status = $('<span>').addClass('status');
        const username = $('<span>').addClass('username').text(c.username);
        const postDate = $('<span>').addClass('post-date').text(c.date);
        const edited = $('<span>').addClass('edited').text('Edited');
        const description = $('<div>').addClass('description').text(c.comment);
        const actions = $('<span>').addClass('actions');
        const reply = $('<div>').addClass('reply').text('Reply');
        const meatballs = $('<div>').addClass('meatballs').text('Options');

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
