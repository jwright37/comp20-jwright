// Assignment 2 : Frogger
// John Wright
// 2.11.2012

//globals
var img;
var c;
var ctxt;

//run when the page loads
function StartGame(){
	Initialize();
	Draw();
	Interval();
}

//set variables and constants
function Initialize(){
	//get canvas and context
	c = document.getElementById("game")
	ctxt = c.getContext("2d");
	//get image
	img = new Image(); 
	img.src = "assets/frogger_sprites.png";

	//add event listener
	document.addEventListener("keyup", Jump);
	//set le vars
	score = 0;
	lives = 5;
	gameover = false;
	frogx = 200;
	frogy = 493;
	level = "Level 1";
	clocktime = 60; //s
	CarPositions();
	LogPositions();
}

//make car objects
function CarPositions(){
//cars are in order from bottom of canvas to top
	car1 = new Object();
	car1.ax = 0;
	car1.bx = 80;
	car1.cx = 160;
	car1.y = 460;
	car1.speed = -2;

	car2 = new Object();
	car2.ax = 50;
	car2.bx = 130;
	car2.cx = 210;
	car2.y = 430;
	car2.speed = 2;

	car3 = new Object();
	car3.ax = 80;
	car3.bx = 170;
	car3.cx = 260;
	car3.y = 400;
	car3.speed = -4;

	car4 = new Object();
	car4.ax = 40;
	car4.bx = 140;
	car4.cx = 240;
	car4.y = 370;
	car4.speed = 3;

	car5 = new Object();
	car5.ax = 50;
	car5.bx = 200;
	car5.cx = 350;
	car5.y = 340;
	car5.speed = -5;
}

function LogPositions () {
//in order from bottom to top
	log1 = new Object();
	log1.ax = 0;
	log1.bx = 150;
	log1.y = 220;
	log1.speed = 3;

	log2 = new Object();
	log2.ax = 0;
	log2.bx = 300;
	log2.y = 190;
	log2.speed = 5;

	log3 = new Object();
	log3.ax = 0;
	log3.bx = 150;
	log3.y = 110;
	log3.speed = 4;
}

//moar objects, this time for turtles
function  TurtlePositions(){
	turtle1 = new Object();
	turtle1.speed = 3;
	turtle1.ax = 0;
	turtle1.bx = 0;
	turtle1.cx = 0;
	turtle1.dx = 0;
	turtle1.ex = 0;
	turtle1.fx = 0;
	turtle1.gx = 0;
	turtle1.hx = 0;
	turtle1.ix = 0;
	turtle1.y = 130;

	turtle2 = new Object();
	turtle2.speed = 3;
	turtle2.ax = 0;
	turtle2.bx = 0;
	turtle2.cx = 0;
	turtle2.dx = 0;
	turtle2.ex = 0;
	turtle2.fx = 0;
	turtle2.gx = 0;
	turtle2.hx = 0;
	turtle2.ix = 0;
	turtle2.y = 130;



}

//draws objects that dont need to be updated
function DrawStationary(){
	//blue background
	ctxt.fillStyle="#191970";
	ctxt.fillRect(0,0,399,565);
	//black background
	ctxt.fillStyle="#000000";
	ctxt.fillRect(0,300,399,300);
	//top banner
	ctxt.drawImage(img,0,0,399,110,0,0,399,110);
	//purple stripes
	ctxt.drawImage(img,0,115,399,50,0,270,399,50);
	ctxt.drawImage(img,0,115,399,50,0,490,399,50);
}

//move the frogger
function Jump(){
	$(document).keydown(function(j){
		if(j.keyCode == 37){
			//alert("jump");	//left
			JumpLeft();
		}
		if(j.keyCode == 38){	//up
			JumpUp();
		}
		if(j.keyCode == 39){	//right
			JumpRight();
		}
		if(j.keyCode == 40){	//down
			JumpDown();
		}
	});
}

//all the jumping
function JumpLeft () {
	//bounds...
	frogx = frogx - 10;
	ctxt.drawImage(img,10,360,30,30,frogx,frogy,30,30);
	frogx = frogx - 10;
	ctxt.drawImage(img,10,360,30,30,frogx,frogy,30,30);
}

//determines frames per second
function Interval() {
	setInterval(GameLoop, 40);
}

//main game loop
//takes user input, makes updates to coordinates, and redraws game
function GameLoop(){
		//check user input
		Jump(); //changes players coordinates
		Update(); //moves things
		//collisions
		Draw(); //redraws canvas

}

function Update() {
	UpdateCars();
	UpdateLog();

}

//resets and moves car coordinates
function UpdateCars(){
	//first is to move all the logs and cars
	car1.ax = ResetCarLeft(car1.ax,car1.speed);
	car1.bx = ResetCarLeft(car1.bx,car1.speed);
	car1.cx = ResetCarLeft(car1.cx,car1.speed);
	car2.ax = ResetCarRight(car2.ax,car2.speed);
	car2.bx = ResetCarRight(car2.bx,car2.speed);
	car2.cx = ResetCarRight(car2.cx,car2.speed);
	car3.ax = ResetCarLeft(car3.ax,car3.speed);
	car3.bx = ResetCarLeft(car3.bx,car3.speed);
	car3.cx = ResetCarLeft(car3.cx,car3.speed);
	car4.ax = ResetCarRight(car4.ax,car4.speed);
	car4.bx = ResetCarRight(car4.bx,car4.speed);
	car4.cx = ResetCarRight(car4.cx,car4.speed);
	car5.ax = ResetCarLeft(car5.ax,car5.speed);
	car5.bx = ResetCarLeft(car5.bx,car5.speed);
	car5.cx = ResetCarLeft(car5.cx,car5.speed);
}

//reset x coordinate if it is off screen
function ResetCarLeft(xpos,speed){
	if(xpos < -55){
		xpos += 550;
	}
	return xpos + speed;
}

//same as above but for cars going in the other direction
function ResetCarRight(xpos,speed){
	if(xpos > 500){
		xpos -= 550;
	}
	return xpos + speed;
}

//reset and move logs
function UpdateLog(){
	log1.ax = ResetLog(log1.ax, log1.speed);
	log1.bx = ResetLog(log1.bx, log1.speed);
	log2.ax = ResetLog(log2.ax, log2.speed);
	log2.bx = ResetLog(log2.bx, log2.speed);
	log3.ax = ResetLog(log3.ax, log3.speed);
	log3.bx = ResetLog(log3.bx, log3.speed);
}

//moves and resets logs
function ResetLog(posx, speed){
	if(posx > 500){
		posx -= 800;
	}
	return posx += speed;
}

//redraw everything
function Draw () {
	ctxt.clearRect (0,0,c.width,c.height);
	DrawStationary();
	DrawMoving();
}

function DrawMoving(){
	//bottom banner text
	//put score in here
	ctxt.font="20px Arial";
	ctxt.fillStyle = "00FF00";
	ctxt.fillText("Level 1",70,547);
	ctxt.font="13px Arial";
	ctxt.fillText("Score: 00         Highscore: 00",0,562);

	//frog lives
	DrawLives();

	//player frog
	ctxt.drawImage(img,10,360,30,30,frogx,frogy,30,30);
	
	//cars
	DrawCars();
	//logs
	DrawLogs();
}

function DrawCars(){
	//3 car1s
	ctxt.drawImage(img,84,264,24,26,car1.ax,car1.y,24,26);
	ctxt.drawImage(img,84,264,24,26,car1.bx,car1.y,24,26);
	ctxt.drawImage(img,84,264,24,26,car1.cx,car1.y,24,26);
	//3 car2s
	ctxt.drawImage(img,10,300,26,24,car2.ax,car2.y,26,24);
	ctxt.drawImage(img,10,300,26,24,car2.bx,car2.y,26,24);
	ctxt.drawImage(img,10,300,26,24,car2.cx,car2.y,26,24);
	//3 car3s
	ctxt.drawImage(img,8,265,31,21,car3.ax,car3.y,31,21);
	ctxt.drawImage(img,8,265,31,21,car3.bx,car3.y,31,21);
	ctxt.drawImage(img,8,265,31,21,car3.cx,car3.y,31,21);
	//3 car4s
	ctxt.drawImage(img,46,264,35,26,car4.ax,car4.y,35,26);
	ctxt.drawImage(img,46,264,35,26,car4.bx,car4.y,35,26);
	ctxt.drawImage(img,46,264,35,26,car4.cx,car4.y,35,26);
	//3 car5s
	ctxt.drawImage(img,105,301,50,20,car5.ax,car5.y,50,20);
	ctxt.drawImage(img,105,301,50,20,car5.bx,car5.y,50,20);
	ctxt.drawImage(img,105,301,50,20,car5.cx,car5.y,50,20);	
}

function DrawLogs(){
	//2 bottom logs
	ctxt.drawImage(img,6,229,86,23,log1.ax,log1.y,86,23);
	ctxt.drawImage(img,6,229,86,23,log1.bx,log1.y,86,23);
	//2 middle logs
	ctxt.drawImage(img,6,165,181,23,log2.ax,log2.y,181,23);
	ctxt.drawImage(img,6,165,181,23,log2.bx,log2.y,181,23);
	//2 top logs
	ctxt.drawImage(img,6,197,119,23,log3.ax,log3.y,119,23);
	ctxt.drawImage(img,6,197,119,23,log3.bx,log3.y,119,23);
}

//draws a lives sprite for each life
function DrawLives(){
	for(i=0;i<lives;i++){
		x = 15 * i;
		ctxt.drawImage(img,10,330,30,30,x,527,20,20);
	}
}

//checks if the player has scored 10,000 points
//if true, give the player another life and reset point counter
function BonusLife(){
	if(pointcounter >= 10000 && lives <= 4){
		lives++;
		pointcounter = (pointcounter - 1000);
	}
}

