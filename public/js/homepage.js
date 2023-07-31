// ---- SHOW START DISCUSSION ---- //
const   discussionMenu = document.querySelector(".discussion-board-nav"),
        startDiscussion = discussionMenu.querySelector(".start-discussion-btn"),
        writePost = document.querySelector(".write-post-border"),
        exitPost = document.querySelector(".close-post"),
        submitPost = document.querySelector(".submit-btn")
        titleInput = document.querySelector(".post-title"),
        captionInput = document.querySelector(".post-caption"),
        tagInput = document.querySelector(".selected-tag");

// opens and closes write post
startDiscussion.addEventListener("click", () => writePost.classList.toggle("active"));
exitPost.addEventListener("click", () => writePost.classList.remove("active"));

// submit post
submitPost.addEventListener("click", async () =>{
    try {
        // if fields are empty
    if (titleInput.value.trim() === "" || captionInput.value.trim() === "") {
        alert("Please fill in all the fields.");
        return;
    }
    // if there is not tag selected
    if (tagInput.textContent=="Choose Tags") {
        alert("Please select a discussion tag.");
        return;
    }

    // if all fields are valid, add post
    const newPost = {
        username: "@newUser", // TODO: replace with username of logged-in user
        date: formatDate(new Date()),
        title: titleInput.value,
        content: captionInput.value,
        tag: tagInput.textContent, 
        comments: [],
        upvotes: 0,
        downvotes: 0,
        edited: false // Default value, you can change this if needed
    };

    // send request to server
    const response = await fetch('/addPost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      if (response.status==400) {
        throw new Error('Error adding post.');
      }
  
      // Handle successful post creation here (e.g., show a success message, redirect, etc.)
      console.log('Post created successfully:', newPost);
    } catch (err) {
      // Handle errors here (e.g., show an error message)
      console.error('Error creating post:', err.message);
    }

    titleInput.value = "";
    captionInput.value = "";
    tagInput.textContent = "Choose Tags";
    writePost.classList.remove("active");
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

//
const lftTag = document.querySelector('#lft-tag');

// Add an event listener to handle the tag click
lftTag.addEventListener('click', async (e) => {
  e.preventDefault();

  try {
    // Fetch the posts with tags "LFT" from the server
    const response = await fetch('/getLFT', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch posts with tags "LFT"');
    }

    console.log("getLFT")

  } catch (error) {
    console.error(error);
    // Handle the error here, e.g., display an error message on the page.
  }
});
