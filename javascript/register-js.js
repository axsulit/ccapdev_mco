//dictionary of registered users
var reg_users={
    anne_s:"sulit123",
    bella_t:"torio123",
    zhoe_g:"gon123",
    mar_v:"villa123"
};

//delays check of username
function delayedCheckAvailability(){
    let delayTimer=setTimeout(function(){
        checkUsernameAvailability();
        
    },2000); //Delay in 2 seconds
}

//checks if username is available
function checkUsernameAvailability(){
    //retrieves input username
    let usernameInput=document.getElementById("username").value;
    //retrieves submit button
    let submitButton=document.getElementById("submit");
    let errormsg=document.getElementById("error-msg");

    if(reg_users.hasOwnProperty(usernameInput)){
        console.log("username taken");
        errormsg.textContent="Username is already taken";
        submitButton.disabled=true;

    }
    else{
        console.log("username not taken");
        errormsg.textContent="";
        submitButton.disabled=false;
    }
}

//shows hidden elements
function showNextElements(){
    // retrieves elements in account type (personal and company)
   let accType=document.getElementsByName("acctype");
   let selectedValue;

   // retrieves chosen option (personal or company)
   for(let i=0;i<accType.length;i++){
        
        if(accType[i].checked){
            selectedValue=accType[i].value;
            break;
        }
   }
   console.log("Selected account type: " + selectedValue);

   // displays additional information for company
   if(selectedValue=="company"){
        let nextElements=document.getElementsByClassName('next-elements');
        //iterates through hidden elements
        for (var i = 0; i < nextElements.length; i++) {
            nextElements[i].classList.remove('hidden');
        }
   }
   else{
    //hides additional information for company
        let nextElements = document.getElementsByClassName('next-elements');
        for (let i = 0; i < nextElements.length; i++) {
            nextElements[i].classList.add('hidden');
        }
   }

}

