<<<<<<< HEAD
var express = require('express');
var app = express();
var engines = require('consolidate');
var request = require('request');
//var db = require('../db/db.js');
var utils = require('./utils.js')
var obj = {}

//Dev values
var CLIENT_ID     = '2a48dc27e13bf25eca10';
var CLIENT_SECRET = 'a3340700567cad703e00952f4b740d065c1b297d';
=======
var express     = require('express');
var engines     = require('consolidate');
//var db          = require('../db/db.js');
var utils       = require('./utils.js')

var obj = {}

var app         = express();

//dummy variables for now:

var repoList = ["x","y","z","a","b","c"];
var testLogList = ["test1","test2","test3","test4"];
>>>>>>> master

//Serve react and static files
app.use(express.static(__dirname + '/../client/build'));
app.set('views', __dirname + '/../client/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//for parsing JSON requests and responses
app.use(require('body-parser').urlencoded({ extended: true }));


<<<<<<< HEAD

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


=======
//=========== Routes for API ============

app.get('/authenticate/:access_code/:session_id', function(req, res) {
  console.log(req.params.access_code) //access code for doing GitHub OAuth
  console.log(req.params.session_id)  //session id to keep track of user
  obj[req.params.session_id] = {}
  obj[req.params.session_id].github = req.params.access_code
  
  
  res.send(JSON.stringify("Hola")) // temporary response
}); 

// /repository/:USessionId
// return list of repositories

app.get('/repository/:USessionId', function(req, res) {

  if (obj[req.params.USessionId]){
        res.send(JSON.stringify(repoList));
    }
  else {
        res.send(JSON.stringify("User ID doesn't exist"));
  }
 
>>>>>>> master
}); 



<<<<<<< HEAD





=======
// /repository/new/:USessionId/:name
// create a new repo and return success / failure

app.get('/repository/new/:USessionId/:name', function(req, res) {

  repoList.push(req.params.name);
  console.log(repoList);

  if (repoList.includes(req.params.name)){
      res.send(JSON.stringify("Success"));
      
  }
  else {
      res.send(JSON.stringify("Failure"));

  }

}); 


// /resetpassword/:USessionId/:oldPass/:newPass
// return success/failure

app.get('/resetpassword/:USessionId/:oldPass/:newPass', function(req, res) {
    obj[req.params.USessionId] = {}
    obj[req.params.USessionId].password = "oldP" //Assume user has a password, a temp variable.
    if (obj[req.params.USessionId].password == req.params.oldPass){
        obj[req.params.USessionId].password = req.params.newPass;
    } 
    console.log(req.params.newPass);
    if (obj[req.params.USessionId].password == req.params.newPass){
        res.send(JSON.stringify("Success"));
      
    }
    else {
        res.send(JSON.stringify("Failure"));

    }

}); 


// /testlogs/:USessionId/:RepoName
// return list of test logs
app.get('/testlogs/:USessionId/:RepoName', function(req, res) {
  //need to run the first get() function to make sure the user exist
  if (obj[req.params.USessionId]){
        if (repoList.includes(req.params.RepoName)){
            res.send(JSON.stringify(testLogList));
        }
        else{
            res.send(JSON.stringify("Repository doesn't exist"));
        }
    }
  else {
        res.send(JSON.stringify("User ID doesn't exist"));
  }
 
}); 
>>>>>>> master

app.listen(8080);

