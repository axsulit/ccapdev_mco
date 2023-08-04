const   profileNav = document.querySelector("#pn-profile"),
        commentNav = document.querySelector("#pn-comments"),
        editNav = document.querySelector("#pn-edit"),
        canEdit = commentNav.getAttribute("data-can-edit"),
        canEditBool = canEdit === "true";


const   profileDiv = document.querySelector(".profile-post"),
        commentDiv = document.querySelector(".profile-comment"),
        editDiv = document.querySelector(".profile-edit"),
        profileHeader = document.querySelector(".profile-header");

// opens comments menu
commentNav.addEventListener("click", () => {
    if (!commentDiv.classList.contains("active")) {
        commentDiv.classList.add("active");

        profileHeader.classList.remove("active");
        profileDiv.classList.remove("active");
        editDiv.classList.remove("active");
    }
});

// opens edit profile menu
if (canEditBool) {
    editNav.addEventListener("click", () => {
        if (!editDiv.classList.contains("active")) {
            editDiv.classList.add("active");
            
            profileHeader.classList.add("active");
            commentDiv.classList.remove("active");
            profileDiv.classList.remove("active");
        }
    });
}
// opens profile menu
profileNav.addEventListener("click", () => {
    if (!profileDiv.classList.contains("active")) {
        profileDiv.classList.add("active");

        profileHeader.classList.remove("active");
        commentDiv.classList.remove("active");
        editDiv.classList.remove("active");
    }
});



