// sample of users already registered
var accounts = {
    "anne_s": "password1",
    "bella_t": "password2",
    "zhoe_g": "password3",
    "marissa_v": "password4"
};

//checks if username is already taken
function checkExistAcc(){
  
    let uname = document.getElementById("uname").value;

    if (accounts.hasOwnProperty(uname)) {
        console.log("used username");
       
        
    } else {
        console.log("username is unique");
        
    }  
}
  

function showNextElements() {
    // Gets value of account type
    var accountTypeRadios = document.getElementsByName("acctype");
    var selectedValue;

    
    
    for (var i = 0; i < accountTypeRadios.length; i++) {
    if (accountTypeRadios[i].checked) {
        selectedValue = accountTypeRadios[i].value;
        break;
    }
    }
    console.log("Selected value: " + selectedValue);
    //Shows company registration
    if (selectedValue=="Company"){
        
        var nextElements = document.getElementsByClassName('next-elements company');
        for (var i = 0; i < nextElements.length; i++) {
            nextElements[i].classList.remove('hidden');
        }
        var nextElements = document.getElementsByClassName('next-elements personal');
        for (var i = 0; i < nextElements.length; i++) {
            nextElements[i].classList.add('hidden');
        }
    } 
    //shows personal registration
    else {
        if (selectedValue=="Personal"){
            var nextElements = document.getElementsByClassName('next-elements personal');
            for (var i = 0; i < nextElements.length; i++) {
                nextElements[i].classList.remove('hidden');
            }
            var nextElements = document.getElementsByClassName('next-elements company');
            for (var i = 0; i < nextElements.length; i++) {
                nextElements[i].classList.add('hidden');
            }
        } 
    }
}