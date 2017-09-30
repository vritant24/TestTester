var express     = require('express');
var engines     = require('consolidate');
var githubhook  = require('githubhook');

var db          = require('../db/db.js');
var store_user  = require('./store_user')
var hook        = require('./webhook.js')


var app = express();

//Serve react and static files
app.use(express.static(__dirname + '/../client/build'));
app.set('views', __dirname + '/../client/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//for parsing JSON requests and responses
app.use(require('body-parser').urlencoded({ extended: true }));


//=========== Routes for API ============

//authentication route. 
//return object as - 
/**
 * {
 *  status : 200,
 *  user : {
 *      github-id : 123,
 *      username : abc    
 *  }
 * }
 */
app.get('/authenticate/:access_code/:session_id', function(req, res) {
    //Using Access Code, get Access Token from GitHub
    store_user.storeUserData(req.params.access_code, req.params.session_id);
    //TODO
    //Status Code to Client
    res.send(JSON.stringify(200));
});

//return list of repositories
//return object as - 
/**
 * {
 *  status : 200,
 *  github-id : 123,
 *  repo-list : []
 * }
 */
app.get('/repos/:session_id', function(req, res) {
    var repoList = ["x","y","z","a","b","c"];
    res.send(JSON.stringify(repoList));
});


//monitor a repo 
//return object as 
/**
 * {
 *  status : 200,
 *  repo-id : 123,
 *  repo-list : []
 * }
 */
app.get('/monitor/:session_id/:repo_id', function(req, res) {
    //TODO
    res.send(JSON.stringify("Success"));
});


// return list of test logs
//return object as 
/**
 * {
 *  status : 200,
 *  repo-id : 123,
 *  server-endpoints : []
 *  test-logs : []
 * }
 */
app.get('/testlogs/:session_id/:repo_id', function(req, res) {
    //need to run the first get() function to make sure the user exist
    //TODO
    var testLogList = ["test1","test2","test3","test4"];
    res.send(JSON.stringify(testLogList));
});


//Receive notification from GitHub that commit to master has been made
app.post('/webhooks', function (req, res) {
    //create a new function that determines if the push was made by master call it here
    //determineMaster(url for master)
    res.send(JSON.stringify("POST request made"));
});
//webhook call
hook.listen();

app.listen(8080);

