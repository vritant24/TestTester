var express     = require('express');
var engines     = require('consolidate');
//var db          = require('../db/db.js');
var utils       = require('./utils.js')
var github_com  = require('./github_com')

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
var accessCode;
app.get('/authenticate/:access_code/:session_id', function(req, res) {
//   console.log(req.params.access_code) //access code for doing GitHub OAuth
//   console.log(req.params.session_id)  //session id to keep track of user
  obj[req.params.session_id] = {}
  obj[req.params.session_id].github = req.params.access_code
  
  console.log(req.params.session_id)
  //get access_code
  github_com.getToken(req.params.access_code);

  res.send(JSON.stringify("Hola")) // temporary response
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
        res.send(JSON.stringify(emptyList));
    }
}); 



/*
NEED TO CREATE A SERVER WHICH WILL ACCEPT A POST REQUEST FROM GITHUB

if (req.method == 'POST') {         ???????
  ...
}
*/

//example
//router.post('test/submit', function (req, res) {
//  var id = req.bddy.id; (from router.get);
//  res.redirect('/test/' + id);
//});
//thus if you submit the number 10 with the post request, it will redirect the id from the post, as
//a parameter to the get request

//creating the webhook
//POST to https://api.github.com/repos/:username/:repo/hooks
/*{
  "name": "web",
  "active": true,
  "events": ["pull_request", "push"],
  "config": {
    "url": "http://example.com/url/path"  //admin section of your repo
    //"content_type": "json"
  }
}*/
//GET to https://api.github.com/repos/:username/:repo/hooks to chech proper webhook
// to run a post request
// /webhook/repository (MASTER) ??
app.post('/webhooks', function (req, res) {
  "//var id = req.body.id;
    //res.redirect('/webhook/...')"
  console.log(req.body);
  res.send(JSON.stringify("POST request made"));
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


