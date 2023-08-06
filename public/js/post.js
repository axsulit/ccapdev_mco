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
      const upvotesElement = document.querySelector(`#post-${postId} .post-votes`);
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
      const upvotesElement = document.querySelector(`#post-${postId} .post-votes`);
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

    // --- VOTES ---

    const voteBtns = document.querySelectorAll(".vote-btn");

    voteBtns.forEach((voteBtn) => {
      voteBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        const postId = voteBtn.getAttribute("data-post-id");
        const voteType = voteBtn.getAttribute("data-vote-type");
        await toggleVote(postId, voteType);
      });
    });

    // const upvoteBtns = document.querySelectorAll("#upvoteBtn");
    // const downvoteBtns = document.querySelectorAll("#downvoteBtn");

    // upvoteBtns.forEach((upvoteBtn) => {
    //   upvoteBtn.addEventListener("click", async (e) => {
    //     e.preventDefault();
    //     const postId = upvoteBtn.getAttribute("data-post-id");
    //     await toggleVote(postId, "upvote");
    //   });
    // });

    // downvoteBtns.forEach((downvoteBtn) => {
    //   downvoteBtn.addEventListener("click", async (e) => {
    //     e.preventDefault();
    //     const postId = downvoteBtn.getAttribute("data-post-id");
    //     await toggleVote(postId, "downvote");
    //   });
    // });
  

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

const upvoteBtn=document.querySelector("#upvoteBtn"),
      downvoteBtn=document.querySelector("#downvoteBtn");
//let cantAuth = document.querySelector(".nav-menu-logo").getAttribute("data-not-auth");

// upvoteBtn?.addEventListener("click", async(e)=>{
//   e.preventDefault();
//   console.log("clicking upvote");
//   if(cantAuth==="false"){
//     console.log("processing upvote")
//     await fetch("/upvotePost", {
//       method: 'POST',
     
//     });
   
//   }
//   else{
//     console.log("unauthorized to upvote");
//   }
  
// });

upvoteBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  await toggleVote("upvote");
});

// downvoteBtn?.addEventListener("click", async(e)=>{
//   e.preventDefault();
//   console.log("clicking downvote");
//   if(cantAuth==="false"){
//     console.log("processing downvote")
//     await fetch("/downvotePost", {
//       method: 'POST',
     
//     });
   
//   }
//   else{
//     console.log("unauthorized to downvote");
//   }
  
// });

downvoteBtn?.addEventListener("click", async (e) => {
  e.preventDefault();
  await toggleVote("downvote");
});

async function toggleVote(postId, voteType) {
  
  try {
    const response = await fetch(`/toggleVote/${postId}/${voteType}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const votesElement = document.querySelector(`#post-${postId} .post-votes`);
      votesElement.textContent = data.totalVotes;
    } else {
      console.error(`Failed to ${voteType} post.`);
    }
  } catch (error) {
    console.error(`Error ${voteType}ing post:`, error);
  }
}
  

