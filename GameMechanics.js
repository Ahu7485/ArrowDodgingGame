//Map Dimensions
const mapwidth = document.getElementById('display').width;
const mapheight = document.getElementById('display').height;

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
var score = 0;
var maxobstacles = 1;
var timetoincreaseobstacles = 1;

var trianglespeed = 2.5;
var triangles = [];

const ctx = document.getElementById('display').getContext('2d');
const scorehtmml = document.getElementById('score');

var player = {
    x: mapwidth/2,
    y: mapheight/2,

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


function makeobstacle() {
    //randomly selects which side to come out from
    const randnum1 = Math.floor(Math.random()*2);
    if(randnum1 == 1){
        var width = Math.floor(Math.random()*mapwidth);
        var height = Math.floor(Math.random()*2) === 1 ? 0 : mapheight;
    }else{
        var width = Math.floor(Math.random()*2) === 1 ? 0 : mapwidth;
        var height = Math.floor(Math.random()*mapheight);
    }
    triangles[triangles.length] = {
        x: width,
        y: height,
        dx: (player.x - width)/(mapwidth / trianglespeed),
        dy: (player.y - height)/(mapheight / trianglespeed),
    }
}
//Checks if Collision
function collisioncheck(obstacle) {
    if(Math.abs(player.x - obstacle.x) <= playerradius && Math.abs(player.y - obstacle.y) <= playerradius)    return true;
    else return false;
}

function obstaclebordercheck(obstacle){
    if(obstacle.x >= mapwidth || obstacle.x <= 0 || obstacle.y >= mapheight || obstacle.y <= 0) 
        return false;
    else return true;
}

function moveobstacle(obstacle) {
    obstacle.y += obstacle.dy;
    obstacle.x += obstacle.dx*1.5;
}

function drawobstacle(obstacle) {
    var obstacleangle = Math.atan2(obstacle.dy, obstacle.dx);
    ctx.translate(obstacle.x, obstacle.y);
    ctx.rotate(obstacleangle);
    ctx.translate(-obstacle.x, -obstacle.y);
    ctx.fillStyle = "#00000";
    ctx.beginPath();
    ctx.moveTo(obstacle.x, obstacle.y);
    ctx.lineTo(obstacle.x - 15, obstacle.y + 5);
    ctx.lineTo(obstacle.x - 15, obstacle.y - 5);
    ctx.lineTo(obstacle.x, obstacle.y);
    ctx.fill();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}


function drawplayer(player) {
    ctx.beginPath();
    ctx.arc(player.x, player.y, 25, 0, 2*Math.PI, false);
    ctx.linewidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function displayframes() {
    score++; 
    scorehtmml.innerHTML = score;
    var newobstacles = [];
    drawplayer(player);
    player.bordercheck();
    for(let triangle of triangles){
        moveobstacle(triangle);
        if(collisioncheck(triangle)) {alive = false;}
        if(obstaclebordercheck(triangle)) {
            newobstacles.push(triangle);
        }
        drawobstacle(triangle);
    }
    triangles = [...newobstacles];
    if(triangles.length < maxobstacles){
        makeobstacle();
    }
    if(score/timetoincreaseobstacles == 1){
        console.log(score/timetoincreaseobstacles);
        maxobstacles *= 2;
        timetoincreaseobstacles *= 10;
    }
    console.log(triangles.length);
    player.move();
    setTimeout(() => {
        ctx.clearRect(0, 0, mapwidth, mapheight);
    }, 30);
    if(alive){
        window.requestAnimationFrame(displayframes);
    }else{
        triangles = [];
        setTimeout(reshowstartpage(), 2000);
    }
}



function begingame() {
    alive = true;
    player.x = mapwidth/2;
    player.y = mapheight/2;
    score = 0;
    maxobstacles = 1;
    timetoincreaseobstacles = 1;
    window.requestAnimationFrame(displayframes);
}


//Arrow Key Listenter

window.addEventListener('keydown', (Event) => {
    switch (Event.key) {
        case "a":
        case "ArrowLeft":
            leftpressed = true;
            break;
        case "d":
        case "ArrowRight":
            rightpressed = true;
            break;
        case "w":
        case "ArrowUp":
            uppressed = true;
            break;
        case "s":
        case "ArrowDown":
            downpressed = true;
            break;
    }
})

window.addEventListener('keyup', (Event) => {
    switch (Event.key) {
        case "a":
        case "ArrowLeft":
            leftpressed = false;
            break;
        case "d":
        case "ArrowRight":
            rightpressed = false;
            break;
        case "w":
        case "ArrowUp":
            uppressed = false;
            break;
        case "s":
        case "ArrowDown":
            downpressed = false;
            break;
    }
})
