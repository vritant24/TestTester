var express     = require('express');
var engines     = require('consolidate');
var db          = require('../db/db.js');
var utils       = require('./utils.js')

var obj = {}
var app         = express();

//Serve react and static files
app.use(express.static(__dirname + '/../client/build'));
app.set('views', __dirname + '/../client/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//for parsing JSON requests and responses
app.use(require('body-parser').urlencoded({ extended: true }));



//=========== Routes for API ============

app.get('/authenticate/:access_code/:session_id', function(req, res) {
  console.log(req.params.access_code) //access code for doing GitHub OAuth
  console.log(req.params.session_id)  //session id to keep track of user

  res.send(JSON.stringify("Hola")) // temporary response
}); 

app.listen(8080);

