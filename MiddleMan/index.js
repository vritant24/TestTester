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

//set up webhook middleware
hook.webhook(app);

//=========== Routes for API ============

//authentication route. 
//return object as - 
/**
 * {
 *  status : 200,
 *  user : {
 *      github_id : 123,
 *      username : abc    
 *  }
 * }
 */
app.get('/authenticate/:access_code/:session_id', function(req, res) {
    //Using Access Code, get Access Token from GitHub
    store_user.storeUserData(req.params.access_code, req.params.session_id);
    
    //TODO fill ret with actual data
    var ret = {
        status  : 200,
        user    : {
            github_id   : 123,
            username    : 'abc'
        }
    }

    res.send(JSON.stringify(ret));
});

//return list of repositories
//return object as - 
/**
 * {
 *  status : 200,
 *  github_id : 123,
 *  repo_list : []
 * }
 */
app.get('/repos/:session_id', function(req, res) {
    //TODO fill ret with actual data
    var repo_list = [
        {
            repo_id      : 1,
            repo_name    : 'repo1',
            is_monitored : true
        },
        {
            repo_id      : 2,
            repo_name    : 'repo2',
            is_monitored : true
        },
        {
            repo_id      : 3,
            repo_name    : 'repo3',
            is_monitored : false
        }
    ];

    var ret = {
        status      : 200,
        github_id   : 123,
        repo_list   : repo_list
    }

    res.send(JSON.stringify(ret));
});


//monitor a repo 
//return object as 
/**
 * {
 *  status : 200,
 *  repo_id : 123,
 *  repo_list : []
 * }
 */
app.get('/monitor/:session_id/:repo_id', function(req, res) {
    //TODO fill ret with actual data
    console.log("here")
    var repo_list = [
        {
            repo_id      : 1,
            repo_name    : 'repo1',
            is_monitored : true
        },
        {
            repo_id      : 2,
            repo_name    : 'repo2',
            is_monitored : true
        },
        {
            repo_id      : 3,
            repo_name    : 'repo3',
            is_monitored : true
        }
    ];
    
    var ret = {
        status      : 200,
        repo_id     : req.params.repo_id,
        repo_list   : repo_list
    }
    res.send(JSON.stringify(ret));
});

//remove monitoring on a repo 
//return object as 
/**
 * {
 *  status : 200,
 *  repo-id : 123,
 *  repo-list : []
 * }
 */
app.get('/dont-monitor/:session_id/:repo_id', function(req, res) {
    //TODO fill ret with actual data
    var repo_list = [
        {
            repo_id      : 1,
            repo_name    : 'repo1',
            is_monitored : false
        },
        {
            repo_id      : 2,
            repo_name    : 'repo2',
            is_monitored : true
        },
        {
            repo_id      : 3,
            repo_name    : 'repo3',
            is_monitored : false
        }
    ];
    
    var ret = {
        status      : 200,
        repo_id     : req.params.repo_id,
        repo_list   : repo_list
    }
    res.send(JSON.stringify(ret));
});


// return list of test logs
//return object as 
/**
 * {
 *  status : 200,
 *  repo-id : 123,
 *  repo_name : abc
 *  server-endpoints : []
 *  test-logs : []
 * }
 */
app.get('/repo/:session_id/:repo_id', function(req, res) {
    //need to run the first get() function to make sure the user exist
    //TODO fill ret with actual data
    var test_logs = ["test1","test2","test3","test4"];
    server_endpoints = ["123", "456", "789"]
    var ret = {
        status              : 200,
        repo_id             : req.params.repo_id,
        repo_name           : 'abc',
        server_endpoints    : server_endpoints,
        test_logs           : test_logs   
    }
    res.send(JSON.stringify(ret));
});


//Receive notification from GitHub that commit to master has been made
app.post('/webhooks', function (req, res) {
    //create a new function that determines if the push was made by master call it here
    //determineMaster(url for master)
    res.send(JSON.stringify("POST request made"));
});

app.listen(8080);
