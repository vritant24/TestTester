var express     = require('express');
var engines     = require('consolidate');
var db          = require('../db/db.js');
var utils       = require('./utils.js')

var github_com  = require('./github_com')

var obj = {}
var app         = express();

var app         = express();

//dummy variables for now:

var repoList = ["x","y","z","a","b","c"];
var testLogList = ["test1","test2","test3","test4"];

//Serve react and static files
app.use(express.static(__dirname + '/../client/build'));
app.set('views', __dirname + '/../client/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//for parsing JSON requests and responses
app.use(require('body-parser').urlencoded({ extended: true }));


//=========== Routes for API ============

app.get('/authenticate/:access_code/:session_id', function(req, res) {

    //Using Access Code, get Access Token from GitHub  
    github_com.getToken(req.params.access_code).then(function(response) {

        //Using Access Token, get User Data from GitHub
        github_com.getUserData(response.access_token).then(function(user_data) {
        
            parsed_user_data = JSON.parse(user_data);
            
            //Add User Information to database
            var user_db_data = [];
            user_db_data.push(parsed_user_data.id);
            user_db_data.push(parsed_user_data.login);
            db.addUser(user_db_data);

            //Add User access code to database
            var user_access_db_data = []; 
            user_access_db_data.push(parsed_user_data.id);
            user_access_db_data.push(response.access_token);
            db.addUserAccess(user_access_db_data);

            //Add User session ID to database
            var user_session_db_data = [];
            user_session_db_data.push(parsed_user_data.id);
            user_session_db_data.push(req.params.session_id);
            db.addUserSession(user_session_db_data);
            
        });

  });

  //Status Code to Client
  res.send(JSON.stringify(200));
});

// /repository/:USessionId
// return list of repositories

app.get('/repository/:session_id', function(req, res) {
    var repoList = ["x","y","z","a","b","c"];
    var emptyList = [];

    console.log(req.params.session_id);

    if (obj[req.params.session_id]){
        res.send(JSON.stringify(repoList));
    }
    else {
        console.log()
        res.send(JSON.stringify(emptyList));
    }
});



// /repository/new/:USessionId/:name
// create a new repo and return success / failure

app.get('/repository/new/:session_id/:name', function(req, res) {

  repoList.push(req.params.name);
  console.log(repoList);

  if (repoList.includes(req.params.name)){
      res.send(JSON.stringify("Success"));

  }
  else {
      res.send(JSON.stringify("Failure"));
  }

});

// /testlogs/:USessionId/:RepoName
// return list of test logs
app.get('/testlogs/:session_id/:repo_name', function(req, res) {
  //need to run the first get() function to make sure the user exist
  var testLogList = ["test1","test2","test3","test4"];
  if (obj[req.params.session_id]){
        if (repoList.includes(req.params.repo_name)){
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

app.listen(8080);

