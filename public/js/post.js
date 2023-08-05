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

    // // const upvoteBtn = document.querySelectorAll("#upvote");
    // // const downvoteBtn = document.querySelectorAll("#downvote");

    // const upvoteBtns = document.querySelectorAll("#upvote");
    // const downvoteBtns = document.querySelectorAll("#downvote");

    paragraphElements.forEach(function(paragraphElement) {
    var content = paragraphElement.textContent;
    var shortenedContent = shortenContent(content, maxLength);
    paragraphElement.textContent = shortenedContent;
    });

    // --- VOTES ---

    // upvoteBtns.forEach(function(upvoteBtn) {
    //   upvoteBtn.addEventListener('click', async function (e) {
    //     console.log("upvote");
    //     // Add your upvote logic here (e.g., update the vote count, send a request to the server, etc.)
    //   });
    // });
  
    // downvoteBtns.forEach(function(downvoteBtn) {
    //   downvoteBtn.addEventListener('click', async function (e) {
    //     console.log("downvote");
    //     // Add your downvote logic here (e.g., update the vote count, send a request to the server, etc.)
    //   });
    // });


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

    // // Function to fetch the logged-in user's data
    // async function fetchUserData() {
    //   try {
    //     const response = await fetch("/api/user"); // Assuming this endpoint provides the user's data
    //     if (response.status === 200) {
    //       const userData = await response.json();
    //       return userData;
    //     } else {
    //       console.log("Failed to fetch user data.");
    //       return null;
    //     }
    //   } catch (err) {
    //     console.error("Error occurred while fetching user data:", err);
    //     return null;
    //   }
    // }

    // // Function to update the profile picture of the logged-in user in the post-pfp-container
    // async function updateProfilePicture() {
    //   const postPfpContainer = document.querySelector(".post-pfp-container");
    //   const userData = await fetchUserData();

    //   if (userData && userData.pfp) {
    //     // If the user data is available and contains the pfp property
    //     const profilePictureUrl = userData.pfp;
    //     const profilePicture = postPfpContainer.querySelector(".post-pfp");
    //     profilePicture.src = profilePictureUrl;
    //   } else {
    //     // If user data or pfp property is not available, you can set a default profile picture
    //     const profilePicture = postPfpContainer.querySelector(".post-pfp");
    //     profilePicture.src = "/static/images/default-profile-picture.png";
    //   }
    // }

    // // Call the function to update the profile picture
    // updateProfilePicture();

});
  

