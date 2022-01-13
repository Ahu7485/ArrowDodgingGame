const mapwidth = 800;
const mapheight = 500;
var up = false;
var down = false;
var left = false;
var right = false;
const playerspeed = 2.5;
const playerradius = 25;
var alive = true;
var triangle = [];

const ctx = document.getElementById('display').getContext('2d');

var player = {
    x: 400,
    y: 250,

    show: function() {
        ctx.beginPath();
        ctx.arc(player.x, player.y, 25, 0, 2*Math.PI, false);
        ctx.linewidth = 3;
        ctx.strokeStyle = 'black';
        ctx.stroke();
    },

    bordercheck: function() {
        if(player.x + playerradius >= mapwidth)     right = false;
        else    right = true;
        if(player.x - playerradius <= 0)            left = false;
        else    left = true;
        if(player.y + playerradius >= mapheight)    up = false;
        else    up = true;
        if(player.y - playerradius <= 0)            down = false;
        else    down = true;
    },

    move: function() {
        if (keyIsDown(UP_ARROW) & up == true) {
            player.y += -playerspeed
      }
      
      if (keyIsDown(DOWN_ARROW) & down == true) {
            player.y += playerspeed
      }
      
      if (keyIsDown(RIGHT_ARROW) & right == true) {
            player.x += playerspeed
      }
      
      if (keyIsDown(LEFT_ARROW) & left == true) {
            player.x += -playerspeed
      }
    }
}

var triangle = {
}


function begingame() {
    alive = true;
    player.x = 400;
    player.y = 250;
    while(alive){
        player.show();
        player.bordercheck();
        player.move();
        wait(1/30);
        ctx.clearRect(0, 0, mapwidth, mapheight);
    }
}