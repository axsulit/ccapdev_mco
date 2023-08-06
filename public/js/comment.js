// get all elements with the class name "edit-comment-border"
const allOpenEditComments = document.querySelectorAll(".edit-comment-border");
const editCommentBtns = document.querySelectorAll(".commentEdit-btn");
const closeCommentBtns = document.querySelectorAll(".close-edit-comment");
const saveEditCommentBtns = document.querySelectorAll(".saveEditComments-btn");
const editCommentContentsAll = document.querySelectorAll(".editComment-caption");

// iterate through each comment element and attach the event listener
for (let i = 0; i < editCommentBtns.length; i++) {
  const editCommentBtn = editCommentBtns[i];
  const openEditComment = allOpenEditComments[i];
  const closeEditComment = closeCommentBtns[i];
  const saveEditComment = saveEditCommentBtns[i];
  const editCommentContent = editCommentContentsAll[i]

  // opens edit comment
  editCommentBtn.addEventListener("click", () => { openEditComment.classList.toggle("active");});
  // closes edit comment
  // closes edit comment
  closeEditComment.addEventListener("click", () => {
    openEditComment.classList.remove("active");
    editCommentContent.value = ""; // Clear the text value
  });

  // save comment edits
  saveEditComment?.addEventListener("click", async (e) => {
    e.preventDefault();
    const newEditCommentContent = editCommentContentsAll[i].value;
    const commentID = document.querySelector(".comment-id").textContent;
    console.log("comment id:" + commentID);
    console.log("edits:" + newEditCommentContent);


    // closes edit comment and clears input
    openEditComment.classList.remove("active");
    editCommentContent.value = "";
  });

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
}