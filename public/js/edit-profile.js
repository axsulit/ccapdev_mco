const saveDescription=document.querySelector("#saveButton");

// Allows user to change bio
saveDescription?.addEventListener("click",async(e)=>{
    e.preventDefault();
    console.log("clicking");
    
    const newDescription=document.querySelector("#description").value;
    const newUsername=document.querySelector("#newUsername").textContent;
    
    console.log(newUsername); 
    const user={
        username:newUsername,
        bio: newDescription
    }
    console.log("bio ",user.bio);
    const jUser=JSON.stringify(user);
    console.log(jUser)
     try {
            const response = await fetch("/edit-profile/saveDescription", {
                method: 'POST',
                body: jUser,
                headers: {
                'Content-Type': 'application/json'
                }
            });
            console.log(response);
            if (response.status === 200) {
                location.reload();
            } else {
                console.log("Status code received: " + response.status);
            }
    
    } catch (err) {
        console.error('Error occurred:', err);
    }

      
});