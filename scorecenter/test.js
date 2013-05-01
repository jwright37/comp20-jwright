//trying mongoose
//A5: ScoreCenter
//by: John Wright
//on: 4/15/2013

var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'nodeapp');

// Mongo initialization
var mongojs = require('mongojs');
var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost:27017/scorecenter';
var db = mongojs(mongoUri, ['highscores']);
var output;

//root page of web app, shows all scores
app.get('/', function(request, response) {
	response.set('text/html');
	var output = '<h1>TABLE OF HIGHSCORES</h1><table border="1">';
	var coll;
	db.highscores.find(function(err, docs) {
		coll = docs;
		console.log(docs.length);
		console.log(output);
		for(i=0;i<docs.length;i++){
			output += '<tr><td>'+docs[i].game_title+'</td><td>'+docs[i].username+'</td><td>'+docs[i].score+'</td><td>'+docs[i].created_at+'</td></tr>';
			console.log(output);
		}
		output += '</table>';
	});
	console.log(output);
	response.send(coll);
});

//test insert
app.get('/insert', function(request, response) {
	var date = new Date();
	var testdoc = {"game_title":"testing","username":"admin","score":"666","created_at":date};	
	db.highscores.insert(testdoc);
	response.set('text/html');
	response.send('posted test data');
});

//usersearch, search collections for username
app.get('/usersearch', function(request, response) {
	var doclist = new Array();
	var baseoutput = '<h1>Search for a specific user&#39s scores</h1><form name="search" action="search" method="post">Username: <input type="text" name="username"><input type="submit" value="Submit"></form>';
	response.set('text/html');
	response.send(baseoutput);
});

//the response when a usersearch is made
app.post('/search', function(request, response) {
	var searchname = request.body.username;
	var doclist = new Array();
	var output = '<h1>'+searchname+'&#39s Scores</h1>';
	db.collection('highscores', function(err, collection){
		collection.find({username:searchname},function(newdoc) {
			console.log("found a score");
			doclist.push(newdoc);
		});
		for(i=0; i<doclist.length; i++){
			output += '<tr><td>'+doclist[i].game_title+'</td><td>'+doclist[i].username+'</td><td>'+doclist[i].score+'</td><td>'+doclist[i].created_at+'</td></tr>';
		}
	});
	response.set('text/html');
	response.send(output);
});

//get API, top ten for a game
app.get('/highscores.json', function(request, response){
	var searchtitle = request.query.game_title;

	//search for a specific game title and return the top ten

});

//post API, add to highscores collection
app.post('/submit.json', function(request, response) {
	var game_title;
	var username;
	var score;
	var created_at;
	var object = request.body;
	if(object.game_title){
		game_title = object.game_title;
	}	
	if(object.username){
		username = object.username;
	}	
	if(object.score){
		score = object.score;
	}	
	if(object.game_title){
		created_at = object.created_at;
	}	
 	db.collection('highscores', function(err, collection){
 		if(!err){
 			collection.insert({"game_title":gametitle,"username":username,"score":score,"created_at":created_at});
 		}
 	});
});

//send these things somewhere
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});