//opens up pop-up
const formOpenBtn = document.querySelector("#form-open"),
home = document.querySelector(".home"),

//comtains form content for login or signup
formContainer = document.querySelector(".form-container");

//closes form
formCloseBtn = document.querySelector(".form-close");

//buttons for transferring between signup and login
signUpBtn = document.querySelector("#signup");
loginBtn = document.querySelector("#login");

//buttons for submission of username and password in login/ sign-up
submitSignBtn = document.querySelector("#sign-submit");
submitLogBtn=document.querySelector("#log-submit");

//retrieves log out button
logoutBtn=document.querySelector(".logout");
//retrieves username + pfp in navbar
accountBtn=document.querySelector(".user-profile");


//Sample existing users
var reg_users={
    anne_s:"sulit123",
    bella_t:"torio123",
    zhoe_g:"gon123",
    mar_v:"villa123",
    jack_e:"eli123"
};
// Allows user to log in
submitLogBtn.addEventListener("click",async(e)=>{
    e.preventDefault();

    //retrieves username
    let login_un=document.querySelector("#login-username").value;
    //retrieves password
    let login_pw=document.querySelector("#login-pw").value;
    //retrieves username in nav bar
    let nav_un=document.querySelector(".nav-username");
    

    //retrieves div for displaying error message
    let errormsg=document.getElementById("login-error-msg");

    if(reg_users.hasOwnProperty(login_un)){
        //console.log("username exists. valid log in");
        if(reg_users[login_un]==login_pw){
            errormsg.textContent="";
            //hides log in page
            home.classList.remove("show");
            accountBtn.classList.remove("hidden");
            formOpenBtn.classList.add("hidden");

            //displays the user's username in navbar
            nav_un.textContent=login_un;
        }
        else{
            errormsg.textContent="The password you've entered is incorrect.";
        }
    }
    else{
        errormsg.textContent="Username does not exist";
    }
});

logoutBtn.addEventListener("click",async(e)=>{
    console.log("working");
    accountBtn.classList.add("hidden");
    formOpenBtn.classList.remove("hidden");

    //retrieves username in nav bar
    let nav_un=document.querySelector(".nav-username");
    nav_un.textContent="";

    //clears form
    let forms = document.querySelectorAll(".form-log-sign");
    forms.forEach((form) => form.reset());
});

// Allows user to create an account
submitSignBtn.addEventListener("click", async(e)=>{
    e.preventDefault();
    //console.log("working");

    //retrieves username
    let username=document.querySelector("#username").value;
    console.log(`${username}`);

    //retrieves password and confirmation password
    let pw=document.querySelector(".pw").value;
    let confirm_pw=document.querySelector(".confirm-pw").value;

    //retrieves div for displaying error message
    let errormsg=document.getElementById("sign-error-msg");

    //retrieves username in nav bar
    let nav_un=document.querySelector(".nav-username");
    

    if(reg_users.hasOwnProperty(username)){
        errormsg.textContent="Username is already taken";
    }
    else{
        //console.log("username not taken");
        errormsg.textContent="";

        if(pw==confirm_pw){
            //console.log("same passwords");
            reg_users[username]=pw;
            home.classList.remove("show");
            accountBtn.classList.remove("hidden");
            formOpenBtn.classList.add("hidden");
            nav_un.textContent=username;
            console.log(reg_users);
        }
        else{
            errormsg.textContent="Passwords do not match.";
        }
    } 
});

// LOGIN AND SIGN UP FUNCTIONS
handleLoginSignUp();
function handleLoginSignUp() {
    let signup = false;
    // opens login form
    formOpenBtn.addEventListener("click", () => {
        home.classList.add("show");
        formContainer.classList.remove("active");
        signup=false;
        closeLoginSignUp(signup);
    });

    // switches to signup form
    signUpBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.add("active");
        signup=true;
        // DEBUG: console.log(signup);
        closeLoginSignUp(signup);
    });
    //switches to signup form
    loginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        formContainer.classList.remove("active");
        signup=false;
        // DEBUG: console.log(signup);
        closeLoginSignUp(signup);
    });
};


function closeLoginSignUp(signup) {
    // DEBUG: console.log("inside close: " + signup);
    if (signup == true) {
        formCloseBtn.addEventListener("click", () => {
            home.classList.remove("show");
            formContainer.classList.add("active");
            // DEBUG: console.log(signup);
        });
    } else {
        formCloseBtn.addEventListener("click", () => {
            home.classList.remove("show");
            formContainer.classList.remove("active");
            // DEBUG: console.log(signup);
        });
    }
}

