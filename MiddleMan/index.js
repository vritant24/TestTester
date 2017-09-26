var express = require('express');
var app = express();
var engines = require('consolidate');
var request = require('request');
//var db = require('../HWdb/db.js');
var utils = require('./utils.js')
var obj = {}

//Dev values
var CLIENT_ID     = '2a48dc27e13bf25eca10';
var CLIENT_SECRET = 'a3340700567cad703e00952f4b740d065c1b297d';

//Serve react and static files
app.use(express.static(__dirname + '/../client/build'));
app.set('views', __dirname + '/../client/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//for parsing JSON requests and responses
app.use(require('body-parser').urlencoded({ extended: true }));



//=========== Routes for API ============
var accessCode;
app.get('/authenticate/:access_code/:session_id', function(req, res) {
  console.log(req.params.access_code) //access code for doing GitHub OAuth
  console.log(req.params.session_id)  //session id to keep track of user
  acessCode = req.params.access_code

  var postUrl = 'https://github.com/login/oauth/access_token?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET+ '&code=' + accessCode;
  request.post(
    postUrl,
    { json: { key: 'value' } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
        console.log(body)
        //console.log(response) 
    }
  );

  res.send(JSON.stringify("Hola")) // temporary response


}); 









app.listen(8080);

