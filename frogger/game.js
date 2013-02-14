// Assignment 2 : Frogger
// John Wright
// 2.11.2012

function start_game(){
	draw();
	iitialize();
}

function draw(){
	c = document.getElementById("game")
	ctxt = c.getContext("2d");
	//blue background
	ctxt.fillStyle="#191970";
	ctxt.fillRect(0,0,399,565);
	//black background
	ctxt.fillStyle="#000000";
	ctxt.fillRect(0,300,399,300);
	//get sprite sheet
	img = new Image();
	img.src = "assets/frogger_sprites.png";
	//top banner
	ctxt.drawImage(img,0,0,399,110,0,0,399,110);
	//purple stripes
	ctxt.drawImage(img,0,115,399,50,0,270,399,50);
	ctxt.drawImage(img,0,115,399,50,0,490,399,50);
	//frog lives
	ctxt.drawImage(img,10,330,30,30,15,527,20,20);
	ctxt.drawImage(img,10,330,30,30,0,527,20,20);
	//text
	ctxt.font="20px Arial";
	ctxt.fillStyle = "00FF00";
	ctxt.fillText("Level 1",70,547);
	ctxt.font="13px Arial";
	ctxt.fillText("Score: 00         Highscore: 00",0,562);
	//player frog
	ctxt.drawImage(img,10,360,30,30,200,493,30,30);
	//cars
	ctxt.drawImage(img,10,265,30,30,300,400,30,30);
	ctxt.drawImage(img,48,265,30,30,100,450,30,30);
	//logs
	ctxt.drawImage(img,10,156,200,30,150,200,200,30);
}

function initialize(){
	//set le vars
}

function cheats(){
//alt music
//missiles
//moar lives
}


