const saveDescription=document.querySelector("#saveButton");

// Allows user to change bio
saveDescription?.addEventListener("click",async(e)=>{
    e.preventDefault();
    console.log("clicking");
    
    const newDescription=document.querySelector("#descriptionbio").value;
    console.log("desc",newDescription);
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

    
// changes the active page on the left nav of the screen
$('.profile-tags a').click(function(e) {
    e.preventDefault();
    
    // remove 'active' class from all the <li> elements within .profile-tags
    $('.profile-tags li').removeClass('active');

    // get value of active page
    var activePage = $(this);
    console.log(activePage);

    //get value of active page and add 'active' class to the clicked <li> element
    $(this).find('li').addClass('active');


    // if replies page is selected, change content
    if (activePage.attr('id') == "replies") {
        // show profile contents
        $('.profile-header').removeClass('invisible');
        $('.posts').removeClass('invisible');
        $('.edit-profile').addClass('invisible');

        // edit post from posts to replies
        var editPost = $('.posts');
        editPost.text("It looks like there are no replies here.")
    }
    // if edit profile page is selected, change content
    else if (activePage.attr('id') == "edit-profile") {
        // hide profile contents
        $('.profile-header').addClass('invisible');
        $('.posts').addClass('invisible');

        // add edit-profile contents
        $('.edit-profile').removeClass('invisible');
    // if profile page is selected, change content
    } else if (activePage.attr('id') == "profile") {
        // show profile contents
        $('.profile-header').removeClass('invisible');
        $('.posts').removeClass('invisible');
        $('.edit-profile').addClass('invisible');

        // edit post from replies to posts
        var editPost = $('.posts');
        editPost.text("It looks like there are no posts here.")
    }
});

// TODO: add a function that changes  <img src={{pfp}} class="edit-pfp"> to "{{picture}}" when the choose file is triggered