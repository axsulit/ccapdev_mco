$(document).ready(function() {
    
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
});
