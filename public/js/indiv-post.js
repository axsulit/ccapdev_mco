// TODO: delete functionality (still not working)
// function deletePost(postId) {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const response = await fetch(`/delete/${postId}`, {
//         method: "GET",
//       });

//       if (response.status === 200) {
//         resolve(true); // Deletion success
//       } else {
//         resolve(false); // Deletion failure
//       }
//     } catch (err) {
//       console.error("Error occurred:", err);
//       resolve(false); // Deletion failure
//     }
//   });
// }

async function deletePost(postId) {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      // Post deleted successfully, remove it from the page or update its visibility
      console.log("Post deleted successfully!");
      // Example: Reload the page to reflect the updated content after deletion
      window.location.reload();
    } else {
      console.error("Failed to delete post.");
    }
  } catch (error) {
    console.error("Error occurred while deleting post:", error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
    const writePost = document.querySelector(".ip-write-post-border"),
    editPost = document.querySelector(".edit-btn"),
    exitPost = document.querySelector(".close-post");
  let contentEdit = document.querySelector(".content-edit");
  const saveButton = document.querySelector(".submit-btn");

  // opens and closes write post
  editPost.addEventListener("click", () => writePost.classList.toggle("active"));
  exitPost.addEventListener("click", () => writePost.classList.remove("active"));

  saveButton?.addEventListener("click", async (e) => {
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

  // Event listener for the delete button
  const deleteBtn = document.querySelectorAll(".delete-btn");

  // deleteBtn.addEventListener("click", function() {
  //   const postId = document.querySelector(".post-id").textContent;
  //   deletePost(postId);
  // });

  // -----

  // deleteButton.forEach(function (button) {
  //   button.addEventListener("click", async function () {
  //     console.log("delete btn clicked");
  //     // Get the post ID from the "data-post-id" attribute of the delete button
  //     const postId = button.dataset.postId;
  //     // Call the deletePost function passing the post ID
  //     const isDeleted = await deletePost(postId);

  //     if (isDeleted) {
  //       // If the post is successfully deleted, redirect to another page
  //       window.location.href = "/profile"; 
  //       console.log("Post deleted.");
  //     } else {
  //       // Handle deletion failure if needed
  //       console.log("Failed to delete the post.");
  //     }
  //   });
  // });

  //------
  deleteBtn.addEventListener('click', async function (e) {
    console.log("delete btn clicked");
    e.preventDefault();

    if (e.target instanceof Element && e.target.matches('.delete-btn')) { // ensures that the event is triggered only when the element is clicked
        console.log(e.target.parentElement);
        const postElement = document.querySelector(".individual-post");
        const postID = document.querySelector(".post-id").textContent; // stores value
        
        console.log(postID);
        const data = {postID: postID.innerText}; 
        deletePost(postId);


        const json = JSON.stringify(data);
        
        const response = await fetch('/delete', {
            method: 'POST',
            body: json,
            headers: {
                'Content-Type': 'application/json' // This sets the request header to specify that the content type of the request body is JSON.
            }
        });

        if (response.status == 200) {
            postElement.parentNode.removeChild(postElement);

            console.log("Post deleted successfully!");
            window.location.href = "src/views/homepage.hbs";
        } else {
            console.log('server error occurred');
        }
    }
  }, true);

});



// $(document).ready(async function () {

// });
