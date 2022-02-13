var map = document.getElementById('display');
var startpage =  document.getElementById('startpage');
var startbutton = document.getElementById('startbutton');
var firstattempt = true;

function collapsestartpage() {
  startpage.animate([
      { opacity: '100%' },
      { opacity: '0%' }
    ], {
      duration: 1000,
      fill: "forwards"
    });
    startbutton.disabled = true;
    setTimeout(() => {
      startpage.style.display= "hidden";
      if(!firstattempt) return {};
      startbutton.innerHTML = "Retry";
      firstattempt = false;
    }, 1000);
}

function reshowstartpage() {
  startpage.animate([
      { opacity: '0%' },
      { opacity: '100%' }
    ], {
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
}



