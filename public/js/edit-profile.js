const saveDescription=document.querySelector("#saveButton");

let newImagePath='';

// show the selected pfp to upload
const fileInput = document.querySelector('#file-input');
const profilePicture = document.querySelector('.edit-pfp');

fileInput.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const imageUrl = '/static/images/' + selectedFile.name;
        profilePicture.src = imageUrl;
    }
});