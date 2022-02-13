//

var stored_user_info = document.cookie;
const profile_div = document.getElementById("profile");

//  Goes into Website Cookie to look for user login info
//  Displays "Profile" Button if login exist
//  Else will show "Sign-In" and "Sign-Out" Button

function getUserInfo() {
    getdata("username") == "" ? displayProfileButton(false) : displayProfileButton(true);
}

function displayProfileButton(hasinfo) {
    var Profile_Button = document.createElement("li");
    Profile_Button.classList.add("user-info-button");
    if(hasinfo){
        Profile_Button.appendChild(document.createTextNode("Sign-Out"));
        Profile_Button.addEventListener('click', 
            function() {
                document.cookie = "username= ";
                document.cookie = "passowrd= ";
                displayProfileButton(false);
            }, false);
    }else {
        Profile_Button.appendChild(document.createTextNode("Sign-In"));
        Profile_Button.addEventListener('click', 
            function() {
                document.cookie = "username= 111";
                displayProfileButton(true);
            }, false);
    }
    profile_div.innerHTML = '';
    profile_div.appendChild(Profile_Button);
}

//Goes in Cookie and gets User Information
//with inputs username, password, and highest score
function getdata(input) {
    let name = input + "=";
    //Converts Cookie to List and Loops through it
    let list_of_infos = document.cookie.split(';');
    for(let i = 0; i < list_of_infos.length; i++) {
    let c = list_of_infos[i];
    //Goes Until finds name
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    //if exist returns the data of input
    if (c.indexOf(name) == 0) {
      return c.substring(name.length);
    }
  }
  return "";
}

function showProfile() {
   alert(getdata("password"));
   alert(getdata("username"));
}

window.onload = getUserInfo();