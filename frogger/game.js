// Assignment 2 : Frogger
// John Wright
// 2.11.2012

//globals
var img;
var deadimg;
var c;
var ctxt;

//run when the page loads
function StartGame(){
	Initialize();
	Draw();
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
	deadimg = new Image();
	deadimg.src = "assets/dead_frog.png";
	//set le vars
	score = 0;
	dead = false;
	flytime = Math.random();
	flytime = flytime*60 + 15;
	flyloc = 0;
	deadIter = 0;
	scorejumpiter = 490;
	hithome = [];
	for (i=0;i<5;i++){
		hithome[i] = false;
	}
	gameover = false;
	level = 1;
	clocktime = 60; //s
	MakeFrog();
	CarPositions();
	LogPositions();
	TurtlePositions();
}

function MakeFrog(){
	frog = new Object();
	frog.x = 200;
	frog.y = 493;
	frog.speed = 0;
	frog.hop = false;
	frog.hopIter = 0;
	frog.hopDir = "up";
	frog.lives = 5;
}

//make car objects
function CarPositions(){
//cars are in order from bottom of canvas to top
	car1 = new Object();
	car1.ax = 0;
	car1.bx = 130;
	car1.cx = 260;
	car1.y = 455.4545;
	car1.speed = -2;

	car2 = new Object();
	car2.ax = 50;
	car2.bx = 130;
	car2.cx = 210;
	car2.y = 420.9090;
	car2.speed = 2;

	car3 = new Object();
	car3.ax = 80;
	car3.bx = 170;
	car3.cx = 260;
	car3.y = 386.3636;
	car3.speed = -4;

	car4 = new Object();
	car4.ax = 40;
	car4.bx = 140;
	car4.cx = 240;
	car4.y = 351.8182;
	car4.speed = 3;

	car5 = new Object();
	car5.ax = 50;
	car5.bx = 200;
	car5.cx = 350;
	car5.y = 317.2727;
	car5.speed = -4.5;
}

function LogPositions () {
//in order from bottom to top
	log1 = new Object();
	log1.ax = 0;
	log1.bx = 150;
	log1.y = 213.6364;
	log1.speed = 2;

	log2 = new Object();
	log2.ax = 0;
	log2.bx = 300;
	log2.y = 179.09091;
	log2.speed = 3.5;

	log3 = new Object();
	log3.ax = 0;
	log3.bx = 150;
	log3.y = 110;
	log3.speed = 2.5;
}

//moar objects, this time for turtles
function TurtlePositions(){
	turtle1 = new Object();
	turtle1.speed = -3;
	turtle1.y = 248.18182;
	turtle1.ax = 0;
	turtle1.bx = 35;
	turtle1.cx = 70;
	turtle1.dx = 150;
	turtle1.ex = 185;
	turtle1.fx = 220;
	turtle1.gx = 300;
	turtle1.hx = 335;
	turtle1.ix = 370;

	turtle2 = new Object();
	turtle2.speed = -3;
	turtle2.y = 144.545455;
	turtle2.ax = 30;
	turtle2.bx = 65;
	turtle2.cx = 130;
	turtle2.dx = 165;
	turtle2.ex = 230;
	turtle2.fx = 265;
}

//move the frogger
function Jump(){
	document.addEventListener("keyup", function(j){
		//left
		if(j.keyCode == 37){
			frog.hop = true;
			frog.hopIter = 0;
			frog.hopDir = "left";
		}
		//up
		if(j.keyCode == 38){
			frog.hop = true;
			frog.hopIter = 0;
			frog.hopDir = "up";
		}
		//right
		if(j.keyCode == 39){
			frog.hop = true;
			frog.hopIter = 0;	
			frog.hopDir = "right";
		}
		//down
		if(j.keyCode == 40){
			frog.hop = true;
			frog.hopIter = 0;	
			frog.hopDir = "down";
		}
		if(gameover == true){
			if(j.keyCode == 38){
				Initialize();
			}
		}
	});
}

//determines frames per second, runs gameloop over and over
function Interval() {
	setInterval(GameLoop, 50);
}

//main game loop
//takes user input, makes updates to coordinates, and redraws game
function GameLoop(){
		//change coordinates and variables
		Update();
		//check for collisions and events
		Collisions();
		//redraw the canvas
		Draw();
		//handles controls and draws frog
		UpdateFrog();
		Fly();
		//updates score
		Score();
}

//changes all the coordinates
function Update() {
	UpdateCars();
	UpdateLog();
	UpdateTurtle();
}

//jumps the frog
function UpdateFrog(){
	//console.log(frog.hop);
	if(dead == false){
		if(frog.hop == true){
			if(frog.hopDir == "up"){
				if(frog.hopIter < 5){
					if(frog.y > 60){
						frog.y -= 6.909091;
					}
					ctxt.drawImage(img,46,366,23,26,frog.x,frog.y,23,26); //jumping up
				}
				frog.hopIter++;
				if(frog.hopIter >= 5){
					frog.hop = false;
					frog.hopIter = 0;
				}
			}
			if(frog.hopDir == "down"){
				if(frog.hopIter < 5){
					if(frog.y < 490){
						frog.y += 6.909091;
					}
					ctxt.drawImage(img,114,366,22,25,frog.x,frog.y,22,25); //jumping down
				}
				frog.hopIter++;
				if(frog.hopIter >= 5){
					frog.hop = false;
					frog.hopIter = 0;
				}
			}
			if(frog.hopDir == "left"){
				if(frog.hopIter < 5){
					if(frog.x > 0){
						frog.x -= 6.909091;
					}
					ctxt.drawImage(img,112,338,26,23,frog.x,frog.y,26,23); //jumping left
				}
				frog.hopIter++;
				if(frog.hopIter >= 5){
					frog.hop = false;
					frog.hopIter = 0;
				}
			}
			if(frog.hopDir == "right"){
				if(frog.hopIter <= 5){
					if(frog.x < 370){
						frog.x += 6.909091;
					}
					ctxt.drawImage(img,43,335,25,22,frog.x,frog.y,25,23); //jumping right
				}
				frog.hopIter++;
				if(frog.hopIter >= 5){
					frog.hop = false;
					frog.hopIter = 0;
				}	
			}
		}
		else{
			if(frog.hopDir == "up"){
				ctxt.drawImage(img,12,369,23,17,frog.x,frog.y,23,17); //facing up
			}
			if(frog.hopDir == "down"){
				ctxt.drawImage(img,80,369,23,17,frog.x,frog.y,23,17); //facing down
			}
			if(frog.hopDir == "left"){
				ctxt.drawImage(img,82,335,18,23,frog.x,frog.y,18,23); //facing left
			}
			if(frog.hopDir == "right"){
				ctxt.drawImage(img,13,334,17,23,frog.x,frog.y,17,23); //facing right
			}
		}
	}
	if(dead==true){
		hop = false;
		hopIter = 10;
		if(deadIter < 10){
			ctxt.drawImage(deadimg,0,0,30,30,frog.x,frog.y,30,30);
			deadIter++;
		}
		if(deadIter >= 10){
			deadIter = 0;
			dead = false;
			ResetFrog();
		}
	}
}

//resets the frog in the event of death
function ResetFrog () {
	frog.x = 200;
	frog.y = 493;
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

//resets and moves turtles
function UpdateTurtle(){
	turtle1.ax = ResetTurtle(turtle1.ax,turtle1.speed);
	turtle1.bx = ResetTurtle(turtle1.bx,turtle1.speed);
	turtle1.cx = ResetTurtle(turtle1.cx,turtle1.speed);
	turtle1.dx = ResetTurtle(turtle1.dx,turtle1.speed);
	turtle1.ex = ResetTurtle(turtle1.ex,turtle1.speed);
	turtle1.fx = ResetTurtle(turtle1.fx,turtle1.speed);
	turtle1.gx = ResetTurtle(turtle1.gx,turtle1.speed);
	turtle1.hx = ResetTurtle(turtle1.hx,turtle1.speed);
	turtle1.ix = ResetTurtle(turtle1.ix,turtle1.speed);

	turtle2.ax = ResetTurtle(turtle2.ax,turtle2.speed);
	turtle2.bx = ResetTurtle(turtle2.bx,turtle2.speed);
	turtle2.cx = ResetTurtle(turtle2.cx,turtle2.speed);
	turtle2.dx = ResetTurtle(turtle2.dx,turtle2.speed);
	turtle2.ex = ResetTurtle(turtle2.ex,turtle2.speed);
	turtle2.fx = ResetTurtle(turtle2.fx,turtle2.speed);
}

//moves and resets the turtles
function ResetTurtle(posx,speed){
	if(posx < -50){
		posx += 600;
	}
	return posx += speed;
}

//redraw everything
function Draw () {
	ctxt.clearRect (0,0,c.width,c.height); //clears the old canvas
	DrawStationary();
	DrawMoving();
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
	ctxt.drawImage(img,0,50,399,60,0,50,399,60);
	ctxt.drawImage(img,0,0,350,50,25,0,350,50);
	//purple stripes
	ctxt.drawImage(img,0,118,399,36,0,282.7273,399,36);
	ctxt.drawImage(img,0,118,399,36,0,490,399,36);
}

//draws the moving parts of the game
function DrawMoving(){
	//bottom banner text
	//put score in here
	ctxt.font="20px Arial";
	ctxt.fillStyle = "00FF00";
	ctxt.fillText("Level "+level,90,543);
	ctxt.font="13px Arial";
	ctxt.fillText("Score: " + score,0,562);
	//cars
	DrawCars();
	//logs
	DrawLogs();
	//turtles
	DrawTurtles(); //needs animation!
	//frog lives
	DrawLives();
	//hit home markers
	DrawHome();
}

//draws the cars
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

//draws the logs
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

//draws the turtles, with animation
function DrawTurtles(){
	ctxt.drawImage(img,14,406,33,22,turtle1.ax,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.bx,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.cx,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.dx,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.ex,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.fx,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.gx,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.hx,turtle1.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle1.ix,turtle1.y,33,22);

	ctxt.drawImage(img,14,406,33,22,turtle2.ax,turtle2.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle2.bx,turtle2.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle2.cx,turtle2.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle2.dx,turtle2.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle2.ex,turtle2.y,33,22);
	ctxt.drawImage(img,14,406,33,22,turtle2.fx,turtle2.y,33,22);
}

//draws a lives sprite for each life
function DrawLives(){
	for(i=0;i<frog.lives;i++){
		x = 15 * i;
		ctxt.drawImage(img,10,330,30,30,x,527,20,20);
	}
}

//draws blue cirles or frogs on home spaces
function DrawHome () {
//i'd like to loop this but i had to hardcode the coordinates
	if(hithome[0] == true){
		ctxt.drawImage(img,80,369,23,17,14,76,23,17); //facing down
	}
	else{
		ctxt.fillStyle="#00FF00";
		ctxt.fillRect(14,76,25,25);
	}
	if(hithome[1] == true){
		ctxt.drawImage(img,80,369,23,17,99,76,23,17); //facing down
	}
	else{
		ctxt.fillStyle="#00FF00";
		ctxt.fillRect(99,76,25,25);
	}
	if(hithome[2] == true){
		ctxt.drawImage(img,80,369,23,17,184,76,23,17); //facing down
	}
	else{
		ctxt.fillStyle="#00FF00";
		ctxt.fillRect(184,76,25,25);
	}
	if(hithome[3] == true){
		ctxt.drawImage(img,80,369,23,17,267,76,23,17); //facing down
	}
	else{
		ctxt.fillStyle="#00FF00";
		ctxt.fillRect(267,76,25,25);
	}
	if(hithome[4] == true){
		ctxt.drawImage(img,80,369,23,17,354,76,23,17); //facing down
	}
	else{
		ctxt.fillStyle="#00FF00";
		ctxt.fillRect(354,76,25,25);
	}
}

//kill frog if it collides with something
function Collisions(){
	CollisionsCars();
	CollisionsLogs();
	CollisionsTurtles();
	Drown();
}

function CollisionsCars(){
	//check y with cars
	if(frog.y+23 >= car1.y && frog.y <= car1.y+26){
		//check x
		if(frog.x+26 >= car1.ax && frog.x <= car1.ax+23){
			Dead();
		}
		if(frog.x+26 >= car1.bx && frog.x <= car1.bx+23){
			Dead();
		}
		if(frog.x+26 >= car1.cx && frog.x <= car1.cx+23){
			Dead();
		}
	}
	if(frog.y+23 >= car2.y && frog.y <= car2.y+26){
		//alert('y');
		//check x
		if(frog.x+26 >= car2.ax && frog.x <= car2.ax+23){
			Dead();
		}
		if(frog.x+26 >= car2.bx && frog.x <= car2.bx+23){
			Dead();
		}
		if(frog.x+26 >= car2.cx && frog.x <= car2.cx+23){
			Dead();
		}
	}
	if(frog.y+23 >= car3.y && frog.y <= car3.y+26){
		//alert('y');
		//check x
		if(frog.x+26 >= car3.ax && frog.x <= car3.ax+23){
			Dead();
		}
		if(frog.x+26 >= car3.bx && frog.x <= car3.bx+23){
			Dead();
		}
		if(frog.x+26 >= car3.cx && frog.x <= car3.cx+23){
			Dead();
		}
	}
	if(frog.y+23 >= car4.y && frog.y <= car4.y+26){
		//alert('y');
		//check x
		if(frog.x+26 >= car4.ax && frog.x <= car4.ax+23){
			Dead();
		}
		if(frog.x+26 >= car4.bx && frog.x <= car4.bx+23){
			Dead();
		}
		if(frog.x+26 >= car4.cx && frog.x <= car4.cx+23){
			Dead();
		}
	}
	if(frog.y+23 >= car5.y && frog.y <= car5.y+26){
		//alert('y');
		//check x
		if(frog.x+26 >= car5.ax && frog.x <= car5.ax+23){
			Dead();
		}
		if(frog.x+26 >= car5.bx && frog.x <= car5.bx+23){
			Dead();
		}
		if(frog.x+26 >= car5.cx && frog.x <= car5.cx+23){
			Dead();
		}
	}
}

function CollisionsLogs(){
	if(frog.y +23 >= log1.y && frog.y <= log1.y + 23){
		if(frog.x >= log1.ax && frog.x <= log1.ax+86){
			frog.x += log1.speed;
		}
		if(frog.x+86 >= log1.bx && frog.x <= log1.bx+86){
			frog.x += log1.speed;
		}
	}
	if(frog.y+23 >= log2.y && frog.y <= log2.y+23){
		if(frog.x >= log2.ax && frog.x <= log2.ax+181){
			frog.x += log2.speed;
		}
		if(frog.x  >= log2.bx && frog.x <= log2.bx+181){
			frog.x += log2.speed;
		}
	}
	if(frog.y+23 >= log3.y && frog.y <= log3.y+23){
		if(frog.x >= log3.ax && frog.x <= log3.ax+119){
			frog.x += log3.speed;
		}
		if(frog.x >= log3.bx && frog.x <= log3.bx+119){
			frog.x += log3.speed;
		}
	}
}

function CollisionsTurtles(){
	//y coord
	if(frog.y +23 >= turtle1.y && frog.y <= turtle1.y+22){
		if (frog.x > turtle1.ax && frog.x < turtle1.cx + 33) {
			frog.x += turtle1.speed;
		}
		if (frog.x > turtle1.dx && frog.x < turtle1.fx + 33) {
			frog.x += turtle1.speed;
		}
		if (frog.x > turtle1.gx && frog.x < turtle1.ix + 33) {
			frog.x += turtle1.speed;
		}
	}
	if(frog.y +23 >= turtle2.y && frog.y <= turtle2.y+22){
		if (frog.x > turtle2.ax && frog.x < turtle2.bx + 33) {
			frog.x += turtle2.speed;
		}
		if (frog.x > turtle2.cx && frog.x < turtle2.dx + 33) {
			frog.x += turtle2.speed;
		}
		if (frog.x > turtle2.ex && frog.x < turtle2.fx + 33) {
			frog.x += turtle2.speed;
		}
	}
}

//cant frogs swim?
function Drown () {
	if(frog.y +10 >= log1.y && frog.y <= log1.y + 10){
		if(frog.x <= log1.ax){
			Dead();
		}
		if(frog.x >= log1.bx+86){
			Dead();
		}
		if(frog.x >= log1.ax + 86 && frog.x < log1.bx){
			Dead();
		}
	}
	if(frog.y+10 >= log2.y && frog.y <= log2.y+10){
		if(frog.x <= log2.ax && frog.x > log2.bx+181){
			Dead();
		}
		if(frog.x >= log2.bx+181){
			Dead();
		}
		if(frog.x >= log2.ax+181 && frog.x < log2.bx){
			Dead();
		}
	}
	if(frog.y+10 >= log3.y && frog.y <= log3.y+10){
		if(frog.x <= log3.ax){
			Dead();
		}
		if(frog.x >= log3.bx+119){
			Dead();
		}
		if(frog.x >= log3.ax+119 && frog.x < log3.bx){
			Dead();
		}
	}
	if(frog.y+10 >= turtle1.y && frog.y <= turtle1.y+10){
		if (frog.x < turtle1.ax && frog.x > turtle1.ix + 33) {
			Dead();
		}
		if (frog.x < turtle1.dx && frog.x > turtle1.cx + 33) {
			Dead();
		}
		if (frog.x < turtle1.gx && frog.x > turtle1.fx + 33) {
			Dead();
		}
	}
	if(frog.y+10 >= turtle2.y && frog.y <= turtle2.y+10){
		if (frog.x < turtle1.ax && frog.x > turtle1.fx + 33) {
			Dead();
		}
		if (frog.x < turtle1.cx && frog.x > turtle1.bx + 33) {
			Dead();
		}
		if (frog.x < turtle1.ex && frog.x > turtle1.dx + 33) {
			Dead();
		}
	}
}

function Dead(){
	dead = true;
	frog.lives--;
	ResetFrog();
}

//increments the speeds of everything
function LevelUp(){
	level++;
	car1.speed--;
	car2.speed++;
	car3.speed--;
	car4.speed++;
	car5.speed--;
	log1.speed++;
	log2.speed++;
	log3.speed++;
	turtle1.speed--;
	turtle2.speed--;
}

function Score(){
	ScoreJumpUp();
	ScoreHome();
	BonusLife();
	GameOver();
}

//checks if the player has scored 10,000 points
//if true, give the player another life and reset point counter
function BonusLife(){
	if((score % 10000) == 0 && frog.lives < 5){
		frog.lives++;
	}
}

function ScoreJumpUp () {
	if(frog.y < scorejumpiter){
		score += 10;
		scorejumpiter -= 34.545455;
	}
}

function ScoreHome () {
	if(frog.y < 100){
		if(frog.x > 12 && frog.x < 43){
			if(hithome[0] == true){
				Dead();
			}
			if(hithome[0] == false){
				ResetFrog();
				hithome[0] = true;
				if(flyloc == 0){
					score += 200;
				}
				score += 50;
			}
		}
		if(frog.x > 97 && frog.x < 129){
			if(hithome[1] == true){
				Dead();
			}
			if(hithome[1] == false){
				ResetFrog();
				hithome[1] = true;
				if(flyloc == 1){
					score += 200;
				}
				score += 50;
			}
		}
		if(frog.x > 182 && frog.x < 214){
			if(hithome[2] == true){
				Dead();
			}
			if(hithome[2] == false){
				ResetFrog();
				hithome[2] = true;
				if(flyloc == 2){
					score += 200;
				}
				score += 50;
			}
		}
		if(frog.x > 265 && frog.x < 299){
			if(hithome[3] == true){
				Dead();
			}
			if(hithome[3] == false){
				ResetFrog();
				hithome[3] = true;
				if(flyloc == 3){
					score += 200;
				}
				score += 50;
			}
		}
		if(frog.x > 352 && frog.x < 381){
			if(hithome[4] == true){
				Dead();
			}
			if(hithome[4] == false){
				ResetFrog();
				hithome[4] = true;
				if(flyloc == 4){
					score += 200;
				}
				score += 50;
			}
		}
		else {
			Dead();
		}
	}

	var homecount = 0;
	for(i=0;i<5;i++){
		if(hithome[i] == true){
			homecount++;
		}
	}
	if(homecount == 5){
		for(i=0;i<5;i++){
			hithome[i] = false;
		}
		score += 1000;
		LevelUp();
	}
}

function Fly () {
	if(flytime < 0){
		flytime = Math.random()*10 + 100;
		flyswitch = Math.random();
		if(flyswitch <= 0.2){
			flyloc = 0;
		}
		if(flyswitch <= 0.4 && flyswitch > 0.2){
			flyloc = 1;
		}
		if(flyswitch <= 0.6 && flyswitch > 0.4){
			flyloc = 2;
		}
		if(flyswitch <= 0.8 && flyswitch > 0.6){
			flyloc = 3;
		}
		else{
			flyloc = 4;
		}
	}

	if(flytime >= 0){
		if(flyloc == 0 && hithome[0] == false){
			ctxt.drawImage(img,140,236,16,16,14,78,16,16);
		}
		if(flyloc == 1 && hithome[1] == false){
			ctxt.drawImage(img,140,236,16,16,99,78,16,16);
		}
		if(flyloc == 2 && hithome[2] == false){
			ctxt.drawImage(img,140,236,16,16,182,78,16,16);
		}
		if(flyloc == 3 && hithome[3] == false){
			ctxt.drawImage(img,140,236,16,16,267,78,16,16);
		}
		if(flyloc == 4 && hithome[4] == false){
			ctxt.drawImage(img,140,236,16,16,355,78,16,16);
		}
		flytime--;
	}
}

function GameOver () {
	if (frog.lives <= 0){
		ctxt.font="20px Arial";
		ctxt.fillStyle = "00FF00";
		ctxt.fillText("GAME OVER",145,310);
		gameover = true;
	}
}