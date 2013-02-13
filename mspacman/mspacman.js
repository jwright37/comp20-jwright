//javascript file for lab 6

function draw(){
c = document.getElementById("board");
ctxt = c.getContext("2d");

img = new Image();
img.src = "pacman10-hp-sprite.png";
//background
ctxt.drawImage(img,320,0,465,138,0,0,465,138);
//ms pacman
ctxt.drawImage(img,80,0,20,20,280,76,20,20);
//ghost (pinky)
ctxt.drawImage(img,80,100,20,20,280,50,20,20);
}
