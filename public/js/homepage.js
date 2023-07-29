const   discussionMenu = document.querySelector(".discussion-board-nav"),
        startDiscussion = discussionMenu.querySelector(".start-discussion-btn"),
        writePost = document.querySelector(".write-post-border"),
        exitPost = document.querySelector(".close-post");

startDiscussion.addEventListener("click", () => writePost.classList.toggle("active"));
exitPost.addEventListener("click", () => writePost.classList.remove("active"));