//A5: ScoreCenter
//by: John Wright
//on: 4/15/2013

var express = require('express');
var app = express(express.logger());
app.use(express.bodyParser());
app.set('title', 'ScoreCenter');

// Mongo initialization
var mongoUri = process.env.MONGOLAB_URI || 
  process.env.MONGOHQ_URL || 
  'mongodb://localhost:27017/scorecenter';
var mongo = require('mongodb');
var db = mongo.Db.connect(mongoUri, function (error, databaseConnection) {
	db = databaseConnection;
});

//Cross Side Scripting
app.all('/', function(request, response, next){
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-control-Allow-Headers", "X-Requested-With");
	next();
});

//root page of web app, shows all scores
app.get('/', function(request, response) {
	var output = '<h1>TABLE OF HIGHSCORES</h1><table border="1"><tr><td>Game</td><td>Username</td><td>Score</td><td>Created At</td></tr>';
	db.collection('highscores', function(err, scores){
		scores.find().sort({created_at:0}, function(err, doc){
			doc.each(function(err, entry){
				if(entry != null){
					output += '<tr><td>'+entry.game_title+'</td><td>'+entry.username+'</td><td>'+entry.score+'</td><td>'+entry.created_at+'</td></tr>';
				}
				else {
					db.close();
					response.set('Content-Type', 'text/html');
					response.send(output+'</table>');
				}
			});
		});
	});
});

//usersearch, search collections for username
app.get('/usersearch', function(request, response) {
	var doclist = new Array();
	var output = '<h1>Search for a specific user&#39s scores</h1><form name="search" action="search" method="post">Username: <input type="text" name="username"><input type="submit" value="Submit"></form>';
	response.set('text/html');
	response.send(output);
});

//the response when a usersearch is made
app.post('/search', function(request, response) {
	var searchname = request.body.username;
	var output = '<h1>'+searchname+'&#39s Scores</h1><table border="1"><tr><td>Game</td><td>Username</td><td>Score</td><td>Created At</td></tr>';
	db.collection('highscores', function(err, scores){
		scores.find({username:searchname}).sort({score:1}, function(err, doc){
			doc.each(function(err, entry){
				if(entry != null){
					output += '<tr><td>'+entry.game_title+'</td><td>'+entry.username+'</td><td>'+entry.score+'</td><td>'+entry.created_at+'</td></tr>';
				}
				else {
					db.close();
					response.set('Content-Type', 'text/html');
					response.send(output+'</table>');
				}
			});
		});
	});
});

//get API, top ten for a specific game
app.get('/highscores.json', function(request, response){
	var game = request.query.game_title;
	var output = '';
	db.collection('highscores', function(err, scores){
	 	if(game){
			scores.find({"game_title":game}).sort({score:1}).limit(10, function(err, doc){
				doc.each(function(err, entry){
					if(entry != null){
						output += JSON.stringify(entry);
					}
					else {
						db.close();
						response.set('Content-Type', 'text/json');
						response.send(output);
					}
				});
			});
		}
	});
});

//post API, add to highscores collection
app.post('/submit.json', function(request, response) {
	var game_title = request.body.game_title;
	var username = request.body.username;
	var score = parseInt(request.body.score);
	var created_at = new Date();
	var insertion = {"game_title":game_title,"username":username,"score":score,"created_at":created_at};
 	db.collection('highscores', function(err, collection){
 		if(!err){
 			collection.insert(insertion);
			response.send('Added submission to database');
 		}
 		db.close();
 	});
});

//send these things somewhere
var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});