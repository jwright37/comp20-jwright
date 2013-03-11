// Assignment 2 : Frogger
// John Wright
// 2.11.2012

function start_game(){
	iitialize();
	draw_stationary();
	draw_moving();
	gameloop();
}

function initialize(){
	//set le vars
	score = 0;
	lives = 3;
	gameover = false;
	frogx = 200;
	frogy = 493;
	level = "Level 1";
	clocktime = 60; //s
	car1x = 300;
	car1y = 400;
	car2x = 100;
	car2y = 450;
	log1x = 150;
	log1y = 200;
	car1speed = 2;
	car2speed = 4;
	log1speed = 1;
	//get image
	img = new Image(); //make it global!
	img.src = "assets/frogger_sprites.png";
}

function draw_stationary(){
	c = document.getElementById("game")
	ctxt = c.getContext("2d");
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

function draw_moving(){
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
	ctxt.drawImage(img,10,265,30,30,300,400,30,30);
	ctxt.drawImage(img,48,265,30,30,100,450,30,30);
	//logs
	ctxt.drawImage(img,10,156,200,30,150,200,200,30);
}


function GameLoop(){
	while(gameover == false){
		//check user input
		update();
		redraw();

	}

}

//draws a lives sprite for each life
function DrawLives(){
	for(i=0;i<lives;i++){
		ctxt.drawImage(img,10,330,30,30,(0+15i),527,20,20);
	}
}

//checks if the player has scored 10,000 points
//if true, give the player another life and reset point counter
function BonusLife(){
	if(pointcounter >= 10000){
		lives++;
		pointtcounter = (pointcounter - 1000);
	}
}

