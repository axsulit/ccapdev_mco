const saveDescription=document.querySelector("#saveButton");

let newImagePath='';

// upload photo
function loadFile(event) {
    const fileInput = event.target; // Get the file input element
    const file = fileInput.files[0]; // Get the selected file

    // Check if a file is selected
    if (file) {
        // Perform actions with the selected file, for example:
        console.log("File name:", file.name);
        newImagePath = '/static/images/'+file.name;
        console.log(newImagePath); 
        // You can also read the file as a data URL and use it to update the profile picture (similar to the previous example)
        const reader = new FileReader();

        reader.onload = () => {
            // Update the profile picture with the selected image
            const profilePicture = document.querySelector('.edit-pfp');
            profilePicture.src = reader.result;
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        // Handle the case when no file is selected
        console.log("No file selected.");
        newImagePath = '';
    }
}

// Allows user to change bio
saveDescription?.addEventListener("click",async(e)=>{
    e.preventDefault();
    console.log("clicking");

    const fileInput = document.getElementById('file');
    const file = fileInput.files[0]; // Get the selected file'

    //gets current image
    const imgElement = $('.edit-pfp');
    console.log(imgElement);
    const srcValue = imgElement.attr('src');

    console.log("SRC value: ",srcValue);
    // Check if a file is selected
    if (file) {
        // Perform actions with the selected file, for example:
        console.log("File name:", file.name);
        newImagePath = '/static/images/'+file.name;
        console.log(newImagePath); 
        // You can also read the file as a data URL and use it to update the profile picture (similar to the previous example)
        const reader = new FileReader();

        reader.onload = () => {
            // Update the profile picture with the selected image
            const profilePicture = document.querySelector('.edit-pfp');
            profilePicture.src = reader.result;
        };

        reader.readAsDataURL(file); // Read the file as a data URL
    } else {
        // Handle the case when no file is selected
        console.log("No file selected.");
        newImagePath = srcValue;
    }

    
    const newDescription=document.querySelector("#descriptionbio").value;
    console.log("desc",newDescription);
    const newUsername=document.querySelector("#newUsername").textContent;
    
    console.log(newUsername); 
    const user={
        username:newUsername,
        bio: newDescription,
        picture: newImagePath
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