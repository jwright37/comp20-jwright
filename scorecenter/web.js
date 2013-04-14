var express = require('express');

var app = express.createServer(express.logger());

//index of web app
//lists all scores for all games
app.get('/', function(req, res) {
  res.sendfile('index.html');	//send a full page
});

//username search
//searches for all the scores for a specific username
app.get('/usersearch'), function(req, res) {
	res.sendfile('usersearch.html')  //stuff
});

//get API
//returns the top ten highscores
//has game_title as parameter
app.get('/highscores.json', function(req, res) {
  res.send('highscore is over 9000!');
});

//post API
//adds a score to the database
//cross origin resourse sharing?
app.post('/submit.json', function(req, res) {
  res.send('highscore is over 9000!');
});

//listen
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});