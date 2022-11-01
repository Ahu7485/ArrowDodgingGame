# Arrow Game

Try Game Yourself :)
[https://ailun-hu.github.io/Arrow-Game/](https://ailun-hu.github.io/Arrow-Game/)

## How To Play

When Pressing the Start Button the Ball will spawn
and Arrows will start spawning comming towards the ball
Use Arrow Keys or W A S D to move the Circle and try to keep
it alive for as long as possible avoiding all Arrows that 
come towards it.

## How it Works
    
The Game is done through a recursive funciton that is called
as long as the there is no collision between player and obstacle.

Frame Rate is limited to 60FPS due to some 
hardware issues from Windows and Mac 
that made he loop run faster for people with better hardware.

However you can change the frames if in /Src/GameMechanics.js if prefered


## Extra Features

Enabled the Use of Javascript Cookies to save user Information
like Username and Highest score reached.
    

## Some Issues
    LeaderBoard may be may be blank due to Backend Servers not being used for a while.
        -   Reason: SQL Servers turn off after an hour of inactivity.
        -   Solution:  Refresh Page after a couple of ~10 seconds of opening the website.
        -   The Backend is hosted using Microsoft Azure and the SQL Database not on 24/7
        -   used when used would require some time to turn SQL back on.


    
