// get all elements with the class name "edit-comment-border"
const allOpenEditComments = document.querySelectorAll(".edit-comment-border");
const editCommentBtns = document.querySelectorAll(".commentEdit-btn");
const closeCommentBtns = document.querySelectorAll(".close-edit-comment");

// iterate through each comment element and attach the event listener
for (let i = 0; i < editCommentBtns.length; i++) {
  const editCommentBtn = editCommentBtns[i];
  const openEditComment = allOpenEditComments[i];
  const closeEditComment = closeCommentBtns[i];

  // opens edit comment
  editCommentBtn.addEventListener("click", () => { openEditComment.classList.toggle("active");});
  // closes edit comment
  closeEditComment.addEventListener("click", () => openEditComment.classList.remove("active"));

}