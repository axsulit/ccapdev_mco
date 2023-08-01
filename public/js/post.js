// function for shortening post description
function shortenContent(content, maxLength) {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
}
  
// function upvotePost(postId) {
//   // TODO: Perform logic to upvote the post with the given `postId`
//   // For example, you can send an AJAX request to your server to update the upvote count.

//   // After successfully upvoting the post, update the upvotes count in the DOM
//   var upvotesElement = document.querySelector(`#post-upvotes-${postId}`);
//   var currentUpvotes = parseInt(upvotesElement.textContent, 10);
//   upvotesElement.textContent = (currentUpvotes + 1).toString();
// }

// function downvotePost(postId) {
//   // TODO: Perform logic to downvote the post with the given `postId`
//   // For example, you can send an AJAX request to your server to update the upvote count.

//   // After successfully downvoting the post, update the upvotes count in the DOM
//   var upvotesElement = document.querySelector(`#post-upvotes-${postId}`);
//   var currentUpvotes = parseInt(upvotesElement.textContent, 10);
//   upvotesElement.textContent = (currentUpvotes - 1).toString();
// }

document.addEventListener("DOMContentLoaded", function() {
    
    // limit post description to 100 characters
    var maxLength = 100;
    var paragraphElements = document.querySelectorAll(".post-description");

    paragraphElements.forEach(function(paragraphElement) {
    var content = paragraphElement.textContent;
    var shortenedContent = shortenContent(content, maxLength);
    paragraphElement.textContent = shortenedContent;
    });

    // // Event listeners for upvote and downvote buttons
    // var upvoteButtons = document.querySelectorAll(".vote-btn#upvote");
    // var downvoteButtons = document.querySelectorAll(".vote-btn#downvote");

    // upvoteButtons.forEach(function (button) {
    //   button.addEventListener("click", function () {
    //     upvotePost(this.dataset.postId);
    //   });
    // });

    // downvoteButtons.forEach(function (button) {
    //   button.addEventListener("click", function () {
    //     downvotePost(this.dataset.postId);
    //   });
    // });
});
  

