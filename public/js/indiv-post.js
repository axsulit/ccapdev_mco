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
      window.location.href = "/";
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
 
      if (contentEdit.value===""){
        alert("You cannot leave your post blank. Please try again.");
        return;
      } else {
        const confirmEdit = window.confirm("Are you sure you want to make these changes?");
        if (!confirmEdit) {
          return; // User canceled the deletion
        }
      }

    const post = {
      id: postID,
      content: newContent
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

