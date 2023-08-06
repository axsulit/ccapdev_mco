// get all elements with the class name "edit-comment-border"
const allOpenEditComments = document.querySelectorAll(".edit-comment-border");
const editCommentBtns = document.querySelectorAll(".commentEdit-btn");
const closeCommentBtns = document.querySelectorAll(".close-edit-comment");
const saveEditCommentBtns = document.querySelectorAll(".saveEditComments-btn");
const editCommentContentsAll = document.querySelectorAll(".editComment-caption");
const allCommentIDs = document.querySelectorAll(".comment-id");

// iterate through each comment element and attach the event listener
for (let i = 0; i < editCommentBtns.length; i++) {
    const editCommentBtn = editCommentBtns[i];
    const openEditComment = allOpenEditComments[i];
    const closeEditComment = closeCommentBtns[i];
    const saveEditComment = saveEditCommentBtns[i];
    const editCommentContent = editCommentContentsAll[i];
    const selectedCommentID = allCommentIDs[i];
  
    // opens edit comment
    editCommentBtn.addEventListener("click", () => { openEditComment.classList.toggle("active"); });
  
    // closes edit comment
    closeEditComment.addEventListener("click", () => {
      openEditComment.classList.remove("active");
      editCommentContent.value = ""; // Clear the text value
    });
  
    // save comment edits
    saveEditComment?.addEventListener("click", async (e) => {
      e.preventDefault();
      const newEditCommentContent = editCommentContent.value; // Use editCommentContent directly here
      const commentID = selectedCommentID.textContent;
      console.log("comment id:" + commentID);
      console.log("edits:" + newEditCommentContent);
  
      const comment = {
        id: commentID,
        content: newEditCommentContent,
        edited: true,
      }
  
      const jPost = JSON.stringify(comment);
      console.log("JPOST: ", jPost);
  
      try {
        const response = await fetch("/saveComment", {
          method: "POST",
          body: jPost,
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        if (response.status === 200) {
          openEditComment.classList.remove("active");
          location.reload();
        } else {
          console.log("Status code received: " + response.status);
        }
      } catch (err) {
        console.error("Error occurred:", err);
      }
    });
  }


    // newContent = contentEdit.value;
    // console.log("desc", newContent);

    // const post = {
    //   id: postID,
    //   content: newContent,
    //   edited: true,
    // };

    // const jPost = JSON.stringify(post);
    // console.log("JPOST: ", jPost);

    // try {
    //   const response = await fetch("/saveContent", {
    //     method: "POST",
    //     body: jPost,
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   });
    //   console.log(response);
    //   if (response.status === 200) {
    //     writePost.classList.remove("active");
    //     location.reload();
    //   } else {
    //     console.log("Status code received: " + response.status);
    //   }
    // } catch (err) {
    //   console.error("Error occurred:", err);
    // }
