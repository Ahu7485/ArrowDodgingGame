var map = document.getElementById('display');
var startpage =  document.getElementById('startpage');
var startbutton = document.getElementById('startbutton');
var firstattempt = true;

function collapsestartpage() {
    startpage.animate([
        // keyframes
        { opacity: '100%' },
        { opacity: '0%' }
      ], {
        // timing options
        duration: 1000,
        fill: "forwards"
      });
      setTimeout(() => {
        startpage.style.display= "hidden";
        startbutton.disabled = true;
        if(!firstattempt) return {};
        startbutton.innerHTML = "Retry";
        firstattempt = false;
      }, 1000);
}

function reshowstartpage() {
    startpage.animate([
        // keyframes
        { opacity: '0%' },
        { opacity: '100%' }
      ], {
        // timing options
        duration: 1000,
        fill: "forwards"
      });
      setTimeout(() => { 
        startpage.style.display= "visible";
        startbutton.disabled = false;
      }, 1000)
}

function start() {
  collapsestartpage();
  begingame();
  //setTimeout( reshowstartpage, 2000);
}



