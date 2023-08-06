const writeEditComment = document.querySelector(".edit-comment-border");
const editComment = document.querySelector(".commentEdit-btn");
const exitComment = document.querySelector(".close-post");

editComment.addEventListener("click", () => writeEditComment.classList.toggle("active"));