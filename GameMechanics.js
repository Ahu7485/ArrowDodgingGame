//Map Dimensions
const mapwidth = 800;
const mapheight = 500;

//ArrowKey Pressed and BorderLimitations
var up = true;
var down = true;
var left = true;
var right = true;
var uppressed = false;
var downpressed = false;
var leftpressed = false;
var rightpressed = false;

//Game Rules
const playerspeed = 5;
const playerradius = 25;
var alive = true;
var triangle = [];

const ctx = document.getElementById('display').getContext('2d');

var player = {
    x: 400,
    y: 250,

    bordercheck: function() {
        if(player.x + playerradius >= mapwidth)     right = false;
        else    right = true;
        if(player.x - playerradius <= 0)            left = false;
        else    left = true;
        if(player.y + playerradius >= mapheight)    down = false;
        else    down = true;
        if(player.y - playerradius <= 0)            up = false;
        else    up = true;
    },

    move: function() {
        if(left && leftpressed) {player.x -= playerspeed;}
        if(right && rightpressed) {player.x += playerspeed;}
        if(up && uppressed) {player.y -= playerspeed;}
        if(down && downpressed) {player.y += playerspeed;}
    }
}

var triangle = {
}


function draw(ctx, player) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 25, 0, 2*Math.PI, false);
    ctx.linewidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function displayframes() {
    draw(ctx, player)
    player.bordercheck();
    player.move();
    setTimeout(() => {
        ctx.clearRect(0, 0, mapwidth, mapheight);
    }, 30);

    if(alive){
        window.requestAnimationFrame(displayframes);
    }
}



function begingame() {
    alive = true;
    player.x = 400;
    player.y = 250;
    window.requestAnimationFrame(displayframes);
}


//Arrow Key Listenter

window.addEventListener('keydown', (Event) => {
    switch (Event.key) {
        case "ArrowLeft":
            leftpressed = true;
            break;
        case "ArrowRight":
            rightpressed = true;
            break;
        case "ArrowUp":
            uppressed = true;
            break;
        case "ArrowDown":
            downpressed = true;
            break;
    }
})

window.addEventListener('keyup', (Event) => {
    switch (Event.key) {
        case "ArrowLeft":
            leftpressed = false;
            break;
        case "ArrowRight":
            rightpressed = false;
            break;
        case "ArrowUp":
            uppressed = false;
            break;
        case "ArrowDown":
            downpressed = false;
            break;
    }
})
