let canEdit = document.querySelector("#upvote").getAttribute("data-can-edit");
console.log("canEdit",canEdit);
let notAuth = document.querySelector("#upvote").getAttribute("data-not-auth");
console.log("notAuth",notAuth);

// delete post
async function deletePost(postId) {
  try {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) {
      return; // User canceled the deletion
    }

    const response = await fetch("/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: postId }),
    });

    if (response.ok) {
      // Post deleted successfully, remove it from the page or update its visibility
      console.log("Post deleted successfully!");
      // Example: Reload the page to reflect the updated content after deletion
      // window.location.reload();
      window.location.href = "/";
      // window.history.pushState(null, null, "/");
      // window.dispatchEvent(new PopStateEvent("popstate"));
    } else {
      console.error("Failed to delete post.");
    }
  } catch (error) {
    console.error("Error occurred while deleting post:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const writePost = document.querySelector(".ip-write-post-border");
  const editPost = document.querySelector(".edit-btn");
  const exitPost = document.querySelector(".close-post");
  let contentEdit = document.querySelector(".content-edit");
  const saveEditBtn = document.querySelector(".saveEdit-btn");

  
  // opens and closes write post
  if(canEdit==="true"){
    console.log("can edit post");
    editPost.addEventListener("click", () => writePost.classList.toggle("active"));
  }
  
  exitPost.addEventListener("click", () => writePost.classList.remove("active"));

  saveEditBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    contentEdit = document.querySelector(".post-caption");
    postID = document.querySelector(".post-id").textContent;
    console.log("id" + postID);

    newContent = contentEdit.value;
    console.log("desc", newContent);

    const post = {
      id: postID,
      content: newContent,
      edited: true,
    };

    const jPost = JSON.stringify(post);
    console.log("JPOST: ", jPost);

    try {
      const response = await fetch("/saveContent", {
        method: "POST",
        body: jPost,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 200) {
        writePost.classList.remove("active");
        location.reload();
      } else {
        console.log("Status code received: " + response.status);
      }
    } catch (err) {
      console.error("Error occurred:", err);
    }

  });

  // // Event listener for the delete button
  // const deleteBtn = document.querySelectorAll(".delete-btn");
  // deleteBtn.addEventListener('click', async function (e) {
  //   console.log("delete btn clicked");
  //   e.preventDefault();

  //   if (e.target instanceof Element && e.target.matches('.delete-btn')) { // ensures that the event is triggered only when the element is clicked
  //       console.log(e.target.parentElement);
  //       const postElement = document.querySelector(".individual-post");
  //       const postID = document.querySelector(".post-id").textContent; // stores value
        
  //       console.log(postID);
  //       const data = {postID: postID.innerText}; 
  //       deletePost(postId);


  //       const json = JSON.stringify(data);
        
  //       const response = await fetch('/delete', {
  //           method: 'POST',
  //           body: json,
  //           headers: {
  //               'Content-Type': 'application/json' // This sets the request header to specify that the content type of the request body is JSON.
  //           }
  //       });

  //       if (response.status == 200) {
  //           postElement.parentNode.removeChild(postElement);

  //           console.log("Post deleted successfully!");
  //           window.location.href = "src/views/homepage.hbs";
  //       } else {
  //           console.log('server error occurred');
  //       }
  //   }
  // }, true);

});


// REPLY TO POST (COMMENTS)
  const writeComment = document.querySelector(".ip-write-comment-border");
  const openReply = document.querySelector(".reply-btn");
  const closeReply = document.querySelector(".close-reply");
  const submitReplyBtn = document.querySelector(".submit-reply");
  const replyInput = document.querySelector(".reply-caption");
  const postId = document.querySelector(".post-id");

  // opens and closesreply button
  if(notAuth==="false"){
    openReply.addEventListener("click", () => writeComment.classList.toggle("active"));
  }

  closeReply.addEventListener("click", () => writeComment.classList.remove("active"));
  
  // successfully adds comment
  submitReplyBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    
    if (replyInput.value.trim() === "") {
      alert("Please write a comment.");
      return;
  }

  // add comment
  const newComment = {
    _id: "",
    username: "",
    post: postId.textContent,
    date: formatDate(new Date()),
    content: replyInput.value,
    upvotes: 0,
    downvotes: 0,
    edited: false
  }

  // send POST request to server
  const response = await fetch('/addComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });

  if (response.status==400) {
    throw new Error('Error adding comment.');
  } else if(response.status==200){
      location.reload();
      console.log('Comment created successfully:', newComment);
  }

  });

// function to format date to "11/26/2022 13:48"
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // January is month 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
  
    return `${month}/${day}/${year} ${hours}:${minutes}`;
}

