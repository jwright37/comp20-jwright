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
	DrawStationary();
	DrawMoving();
	Jump();
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

	//set le vars
	score = 0;
	lives = 5;
	gameover = false;
	frogx = 200;
	frogy = 493;
	level = "Level 1";
	clocktime = 60; //s
	CarPositions();
}

//make car objects
function CarPositions(){
//cars are in order from bottom of canvas to top
	car1 = new Object();
	car1.x = 0;
	car1.y = 460;
	car1.speed = -4;

	car2 = new Object();
	car2.x = 20;
	car2.y = 430;
	car2.speed = 4;

	car3 = new Object();
	car3.x = 30;
	car3.y = 400;
	car3.speed = -4;

	car4 = new Object();
	car4.x = 40;
	car4.y = 370;
	car4.speed = 4;

	car5 = new Object();
	car5.x = 50;
	car5.y = 340;
	car5.speed = -4;
}

function LogPositions () {
//in order from bottom to top
	log1 = new Object();
	log1.x = 0;
	log1.y = 500;
	log1.speed = 3;

	log2 = new Object();
	log2.x = 0;
	log2.y = 550;
	log2.speed = 3;

	log3 = new Object();
	log3.x = 0;
	log3.y = 580;
	log3.speed = 3;
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
		if(j.keyCode == 37){	//left
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
	setInterval(GameLoop, 30);
}

//main game loop
//takes user input, makes updates to coordinates, and redraws game
function GameLoop(){
		//check user input
		//Jump(); //changes players coordinates
		Update(); //moves things
		//collisions
		Draw(); //redraws canvas

}

//
function Update(){
	//first is to move all the logs and cars
	car1.x += car1.speed;
	car2.x += car2.speed;
	car3.x += car3.speed;
	car4.x += car4.speed;
	car5.x += car5.speed;
	//then move the player
	//count score

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
	//ctxt.drawImage(img,10,156,200,30,log1.x,log1.y,200,30);
}

function DrawCars(){
	//3 car1s
	ctxt.drawImage(img,84,264,24,26,car1.x,car1.y,24,26);
	ctxt.drawImage(img,84,264,24,26,car1.x+100,car1.y,24,26);
	ctxt.drawImage(img,84,264,24,26,car1.x+200,car1.y,24,26);
	//3 car2s
	ctxt.drawImage(img,10,300,26,24,car2.x,car2.y,26,24);
	ctxt.drawImage(img,10,300,26,24,car2.x+100,car2.y,26,24);
	ctxt.drawImage(img,10,300,26,24,car2.x+200,car2.y,26,24);
	//3 car3s
	ctxt.drawImage(img,8,265,31,21,car3.x,car3.y,31,21);
	ctxt.drawImage(img,8,265,31,21,car3.x+100,car3.y,31,21);
	ctxt.drawImage(img,8,265,31,21,car3.x+200,car3.y,31,21);
	//3 car4s
	ctxt.drawImage(img,46,264,35,26,car4.x,car4.y,35,26);
	ctxt.drawImage(img,46,264,35,26,car4.x+100,car4.y,35,26);
	ctxt.drawImage(img,46,264,35,26,car4.x+200,car4.y,35,26);
	//3 car5s
	ctxt.drawImage(img,105,301,50,20,car5.x,car5.y,50,20);
	ctxt.drawImage(img,105,301,50,20,car5.x+100,car5.y,50,20);
	ctxt.drawImage(img,105,301,50,20,car5.x+200,car5.y,50,20);	
}

function DrawLogs(){
	//get cars first

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

