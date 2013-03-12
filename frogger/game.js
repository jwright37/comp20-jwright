// Assignment 2 : Frogger
// John Wright
// 2.11.2012



function StartGame(){
	Initialize();
	DrawStationary();
	DrawMoving();
	//GameLoop();
}

function Initialize(){
	//set le vars
	score = 0;
	lives = 5;
	gameover = false;
	frogx = 200;
	frogy = 493;
	level = "Level 1";
	clocktime = 60; //s
	car1x = 100;
	car1y = 400;
	car2x = 100;
	car2y = 450;
	log1x = 150;
	log1y = 200;
	car1speed = 2;
	car2speed = 4;
	log1speed = 1;
}

function move_log(){
	var int = self.setInterval(function(){shift()})
}

function DrawStationary(){
	//get canvas and context
	c = document.getElementById("game")
	ctxt = c.getContext("2d");
	//get image
	img = new Image(); //make it global!
	img.src = "assets/frogger_sprites.png";
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

function DrawMoving(){
	//get canvas and context
	c = document.getElementById("game")
	ctxt = c.getContext("2d");
	//get image
	img = new Image(); //make it global!
	img.src = "assets/frogger_sprites.png";
	//bottom banner text
	ctxt.font="20px Arial";
	ctxt.fillStyle = "00FF00";
	ctxt.fillText("Level 1",70,547);
	ctxt.font="13px Arial";
	ctxt.fillText("Score: 00         Highscore: 00",0,562);

	//frog lives
	DrawLives();

	//player frog
	ctxt.drawImage(img,10,360,30,30,200,493,30,30);
	
	//cars
	ctxt.drawImage(img,10,265,30,30,car1x,car1y,30,30);
	ctxt.drawImage(img,48,265,30,30,100,450,30,30);
	//logs
	ctxt.drawImage(img,10,156,200,30,150,200,200,30);
}

//main game loop
//takes user input, makes updates to coordinates, and redraws game
function GameLoop(){
	while(gameover == false){
		//check user input
		Update();
		DrawMoving();

	}

}

//
function Update(){
	//first is to move all the logs and cars
	log1x = Shift(log1x,log1speed,left);
	log2x = Shift(log2x,log2speed,left);
	//then move the player

	//count score

}

//changes the x coord according to direction and speed
function Shift(x,speed,dir){
	if (dir == "left"){
		x = x + speed;
	}
	if ( dir == "right"){
		x = x - speed;
	}
	return x;
}

//draws a lives sprite for each life
function DrawLives(){
	//get canvas and context
	c = document.getElementById("game")
	ctxt = c.getContext("2d");
	//get image
	img = new Image(); //make it global!
	img.src = "assets/frogger_sprites.png";

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

