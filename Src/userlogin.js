var stored_user_info = document.cookie;
const profile_div = document.getElementById("profile");

//  Goes into Website Cookie to look for user login info
//  Displays "Profile" Button if login exist
//  Else will show "Sign-In" and "Sign-Out" Button

async function signIn(event) {
    event.preventDefault();
    let username = document.getElementById("loginUser").value;
    let pass = document.getElementById("loginPassword").value;
    let highestscore = getdata("highestscore");
    let website = 'https://arrowgamebackend.azurewebsites.net/api/login/' + username;
    const result = await axios({
        method: 'post',
        url: website,
        data: {
            Username: username,
            Userpass: pass,
            HighestScore: highestscore
        }
    });
    if(result.data.length == 0){
        alert("Wrong Information");
    }else {
        highestscore = result.data.HighestScore.toString();
        document.cookie = "username= " + username;
        document.cookie = "passowrd= " + pass;
        document.cookie = "highestscore= " + highestscore;
        closeSignIn();
        displayProfileButton(true);
    }
}

async function signUp(event) {
    event.preventDefault();
    let username = document.getElementById("signinUser").value;
    let pass = document.getElementById("signinPassword").value;
    let highestscore = getdata("highestscore");
    let website =  'https://arrowgamebackend.azurewebsites.net/api/signup/' + username;
    const result = await axios({
        method: 'post',
        url: website,
        data: {
            Username: username,
            Userpass: pass,
            HighestScore: highestscore
        }
    });
    if((result.data) == 'False'){
        alert("Username Used");
    }else {
        document.cookie = "username= " + username;
        document.cookie = "passowrd= " + pass;
        document.getElementById('closesignupbtn').click();
        closeSignIn();
        displayProfileButton(true);
        let y = document.getElementById("usernameDisplay");
        let z = document.createTextNode(username);
        y.appendChild(z);
    }
}

function getUserInfo() {
    getdata("username") == "" ? displayProfileButton(false) : displayProfileButton(true);
}

//Displays users highest score from cookie
function display_highest_score() {
    setTimeout( () => {
        var highestscore = getdata("highestscore");
        //Set Score to 0 for First Time Users
        if(highestscore == "" || highestscore =="null") {
            document.cookie = "highestscore=0";
        }
        document.getElementById("highestScore").innerHTML = highestscore;
    }, 1000);
}

function displayProfileButton(hasinfo) {
    var Profile_Button = document.createElement("li");
    Profile_Button.classList.add("user-info-button");
    //Creates Signin and Signout Button with different onclick functions
    if(hasinfo){
        Profile_Button.appendChild(document.createTextNode("Sign-Out"));
        Profile_Button.addEventListener('click', 
            function() {
                document.cookie = "username= ";
                document.cookie = "passowrd= ";
                displayProfileButton(false);
                setTimeout(display_highest_score(), 1000);
                document.getElementById("usernameDisplay").innerHTML = '';
                document.cookie = "highestscore= 0"
            }, false);
    }else {
        Profile_Button.appendChild(document.createTextNode("Sign-In"));
        Profile_Button.addEventListener('click', 
            function() {
                let login = document.getElementById("login-wrapper");
                login.animate([
                    { opacity: '0%', visibility: 'collapse' },
                    { opacity: '100%', visibility: 'visible'}
                  ], {
                    duration: 600,
                    fill: "forwards"
                  });
            }, false);
    }
    profile_div.innerHTML = '';
    profile_div.appendChild(Profile_Button);
}

//Closes Signin Popup if pressed
function closeSignIn() {
    let login = document.getElementById("login-wrapper");
    login.animate([
        { opacity: '100%', visibility: 'visible' },
        { opacity: '0%', visibility: 'collapse' }
      ], {
        duration: 600,
        fill: "forwards"
      });
}

function showSignIn() {
    let login = document.getElementById("login-wrapper");
    login.style.visibility = "visible";
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

window.onload = () => {
    getUserInfo();
    setTimeout(display_highest_score(), 1000);
    refreshleaderboard();
    let y = document.getElementById("usernameDisplay");
    let z = document.createTextNode(getdata("username"));
    y.appendChild(z);
    let username = getdata("username");
    console.log(username);
}