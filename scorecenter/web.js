var express = require('express');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.sendfile('/index.html');	//send a full page
});

app.get('/scores', function(request, response) {
  response.send('highscore is over 9000!');
});

/* add /sumbit.json to mondo
app.post('/scores', function(request, response) {
  response.send('highscore is over 9000!');
});
*/

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});