//bella work here
const   writePost = document.querySelector(".ip-write-post-border"),
        editPost = document.querySelector('.edit-btn'),
        exitPost = document.querySelector(".close-post");
let contentEdit = document.querySelector('.content-edit');
const saveButton=document.querySelector('.submit-btn');

// opens and closes write post
editPost.addEventListener("click", () => writePost.classList.toggle("active"));
exitPost.addEventListener("click", () => writePost.classList.remove("active"));

saveButton?.addEventListener('click', async (e) => {
    e.preventDefault();
    contentEdit = document.querySelector(".post-caption");
    postID=document.querySelector(".post-id").textContent;
    console.log(postID);
    
    
    newContent=contentEdit.value;
    console.log("desc",newContent);

    const post={
        id:postID,
        content: newContent,
        edited:true
    }

    const jPost=JSON.stringify(post);
    console.log("JPOST: ", jPost);

    try {
        const response = await fetch("/saveContent", {
            method: 'POST',
            body: jPost,
            headers: {
            'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (response.status === 200) {
            writePost.classList.remove("active");
           location.reload();
        } else {
            console.log("Status code received: " + response.status);
        }

    } catch (err) {
            console.error('Error occurred:', err);
    } 
  });

