//bella work here
const editButton = document.querySelector('.edit-button');
const contentText = document.querySelector('.content-text');
let contentEdit = document.querySelector('.content-edit');
const saveButton=document.querySelector('.save-button');

  editButton.addEventListener('click', () => {
    contentText.style.display = 'none';
    contentEdit.style.display = 'block';
    saveButton.style.display = 'block';
    contentEdit.focus();
    
  });

 saveButton?.addEventListener('click', async (e) => {
    e.preventDefault();
    contentEdit = document.querySelector(".content-edit");
    postID=document.querySelector("#postid").textContent;
    console.log(postID);
    
    
    newContent=contentEdit.value;
    console.log("desc",newContent);

    const post={
        id:postID,
        content: newContent
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
            contentText.style.display = 'block';
            contentEdit.style.display = 'none';
            saveButton.style.display = 'none';
           location.reload();
        } else {
            console.log("Status code received: " + response.status);
        }

    } catch (err) {
            console.error('Error occurred:', err);
    } 

    
   
    
  });