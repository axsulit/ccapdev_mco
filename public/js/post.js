// function for shortening post description
function shortenContent(content, maxLength) {
    if (content.length > maxLength) {
      return content.substring(0, maxLength) + "...";
    }
    return content;
}

async function upvotePost(postId) {
  try {
    const response = await fetch(`/upvote/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const upvotesElement = document.querySelector(`#post-${postId} .post-upvotes`);
      upvotesElement.textContent = data.upvotes;
    } else {
      console.error("Failed to upvote post.");
    }
  } catch (error) {
    console.error("Error occurred while upvoting post:", error);
  }
}

async function downvotePost(postId) {
  try {
    const response = await fetch(`/downvote/${postId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const upvotesElement = document.querySelector(`#post-${postId} .post-upvotes`);
      upvotesElement.textContent = data.downvotes;
    } else {
      console.error("Failed to downvote post.");
    }
  } catch (error) {
    console.error("Error occurred while downvoting post:", error);
  }
}
  
document.addEventListener("DOMContentLoaded", function() {
    
    // limit post description to 100 characters
    var maxLength = 100;
    var paragraphElements = document.querySelectorAll(".post-description");

    paragraphElements.forEach(function(paragraphElement) {
    var content = paragraphElement.textContent;
    var shortenedContent = shortenContent(content, maxLength);
    paragraphElement.textContent = shortenedContent;
    });

});
  

