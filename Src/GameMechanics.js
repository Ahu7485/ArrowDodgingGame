// Map Dimensions
const map_width = document.getElementById('display').width;
const map_height = document.getElementById('display').height;

// Track whether we can up/down/left/right
var allow_up = true;
var allow_down = true;
var allow_left = true;
var allow_right = true;
// Signifies whether the up/down/left/right arrow was pressed.
// We save these into a variables that can be checked later so 
// we can check multiple inputs at once (so we can go in 8 directions, 
// not just 4)
var up_pressed = false;
var down_pressed = false;
var left_pressed = false;
var right_pressed = false;

// Game Rules
const player_speed = 10;
const player_radius = 25;
var alive = true;
var score = 0;
var max_obstacles = 1;
var score_to_increase_obstacles = 100;
var obstacle_speed = 10;
var current_level = 1;

//Constant Frame Rate to make difficulty same for players
//across all different kinds of hardware
const Frames_per_second = 60;

// Store the state of all obstacles. 
var obstacles = [];

const ctx = document.getElementById('display').getContext('2d');
const score_html = document.getElementById('score');
const level_html = document.getElementById('level');

var player = {
    // Start the player in the middle of the map. 
    x: map_width / 2,
    y: map_height / 2,

    // Check whether the player is on the border
    // of the playable bounds. 
    borderCheck: function() {
        allow_right = (player.x + player_radius < map_width);
        allow_left = (player.x - player_radius > 0);
        allow_down = (player.y + player_radius < map_height);
        allow_up = (player.y - player_radius > 0);
    },

    move: function() {
        if (allow_left && left_pressed) {
            player.x -= player_speed;
        }
        if (allow_right && right_pressed) {
            player.x += player_speed;
        }
        if (allow_up && up_pressed) {
            player.y -= player_speed;
        }
        if (allow_down && down_pressed) {
            player.y += player_speed;
        }
    }
}


function makeObstable() {
    // We randomly generate a number, either 0 or 1. Depending on the value, we
    // determine whether the arrow is right-to-left/left-to-right, and top-to-bottom
    // or bottom-to-top.  
    const randnum1 = Math.floor(Math.random() * 2);
    if (randnum1 == 1) {
        var width = Math.floor(Math.random() * map_width);
        var height = Math.floor(Math.random() * 2) === 1 ? 0 : map_height;
    } else {
        var width = Math.floor(Math.random() * 2) === 1 ? 0 : map_width;
        var height = Math.floor(Math.random() * map_height);
    }

    // Save this to our obstacles list.
    obstacles[obstacles.length] = {
        x: width,
        y: height,
        dx: (player.x - width) / (map_width / obstacle_speed),
        dy: (player.y - height) / (map_height / obstacle_speed),
    }
}
// Given a single obstacle, returns true if the player's hitbox has 
// collided with the obstacle.
function collisionCheck(obstacle) {
    return (Math.abs(player.x - obstacle.x) <= player_radius &&
        Math.abs(player.y - obstacle.y) <= player_radius);
}

// Checks whether an obstacle is at a border.
function obstacleBorderCheck(obstacle) {
    if (obstacle.x >= map_width || obstacle.x <= 0 ||
        obstacle.y >= map_height || obstacle.y <= 0) {
        return false;
    } else {
        return true;
    }
}

function moveObstacle(obstacle) {
    obstacle.y += obstacle.dy;
    obstacle.x += obstacle.dx * 1.5;
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
    ctx.arc(player.x, player.y, 25, 0, 2 * Math.PI, false);
    ctx.fillStyle = "#2098D1";
    ctx.fill();
    ctx.linewidth = 3;
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

//-----------------------//
//-----Loop Function-----//
//-----------------------//
function displayframes() {
    // Clear the old board.
    ctx.clearRect(0, 0, map_width, map_height);

    score+=2;
    // Update the score and level counters on the 
    // page.
    score_html.innerHTML = score;
    level_html.innerHTML = current_level;

    var newobstacles = [];
    drawplayer(player);
    player.borderCheck();
    
    //In loop deletes obstacle if it exceeds border,
    //Ends game if obstacle hits circle
    for (let obstacle of obstacles) {
        moveObstacle(obstacle);
        if (collisionCheck(obstacle)) {
            alive = false;
        }
        if (obstacleBorderCheck(obstacle)) {
            newobstacles.push(obstacle);
        }
        drawobstacle(obstacle);
    }
    obstacles = [...newobstacles];
    if (obstacles.length < max_obstacles) {
        makeObstable();
    }

    //Ingame Level System
    //Time to increase Level increases exponentially
    if (score > score_to_increase_obstacles) {
        current_level += 1;
        max_obstacles += 1;
        score_to_increase_obstacles *= 1.75;
    }

    player.move();
    setTimeout ( async () => {
        if (alive) {
            window.requestAnimationFrame(displayframes);
        } else {
            obstacles = [];
            let highestscore = getdata("highestscore");
            if( highestscore < score){
                document.cookie = "highestscore=" + score;
                document.getElementById("highestScore").innerHTML = score;
                let username = getdata("username");
                if(username != ""){
                    let pass = getdata("passowrd"); 
                    console.log(username);
                    console.log(pass);
                    let website = 'https://arrowgamebackend.azurewebsites.net/api/login/' + username;
                    const result = await axios({
                        method: 'post',
                        url: website,
                        data: {
                            Username: username,
                            Userpass: pass,
                            HighestScore: score
                        }
                    });
                    refreshleaderboard();
                }
            }
            setTimeout(reshowstartpage(), 2000);
        }
    }, 1000 / Frames_per_second );
}

//-----------------------//
//-----Main Function-----//
//-----------------------//
function begingame() {
    alive = true;
    player.x = map_width / 2;
    player.y = map_height / 2;
    score = 0;
    current_level = 1;
    max_obstacles = 1;
    time_to_increase_obstacles = 1;
    score_to_increase_obstacles = 100;
    window.requestAnimationFrame(displayframes);
}


//Arrow Key Listener
window.addEventListener('keydown', (Event) => {
    switch (Event.key) {
        case "a":
        case "ArrowLeft":
            left_pressed = true;
            break;
        case "d":
        case "ArrowRight":
            right_pressed = true;
            break;
        case "w":
        case "ArrowUp":
            up_pressed = true;
            break;
        case "s":
        case "ArrowDown":
            down_pressed = true;
            break;
    }
})

window.addEventListener('keyup', (Event) => {
    switch (Event.key) {
        case "a":
        case "ArrowLeft":
            left_pressed = false;
            break;
        case "d":
        case "ArrowRight":
            right_pressed = false;
            break;
        case "w":
        case "ArrowUp":
            up_pressed = false;
            break;
        case "s":
        case "ArrowDown":
            down_pressed = false;
            break;
    }
})