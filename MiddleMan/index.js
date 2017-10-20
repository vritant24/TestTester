var express     = require('express');
var engines     = require('consolidate');
var githubhook  = require('githubhook');
var github      = require('./github_com');
var runtest     = require('./run_tests.js')
var db          = require('../db/db.js');
var store_user  = require('./store_user')
var hook        = require('./webhook.js')
var utils       = require('./utils.js');
var run_tests   = require('./run_tests.js');


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
    store_user.storeUserData(req.params.access_code, req.params.session_id).then(function(obj) {
        var ret = {
            status  : 200,
            user    : {
                github_id  : obj.id,
                username   : obj.login
            }
        }
        res.send(JSON.stringify(ret))
    }).catch((err) => console.log("storeUserData failed"));
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
    var ret;
    db.getRepos(req.params.session_id)
        .then(function(repo_rows) {
            ret = {
                status      : 200,
                github_id   : repo_rows[0].gitHubId,
                repo_list   : repo_rows
            }
            res.json(ret);
        })
        .catch(function(error) {
            ret = {
                status      : 500,
                error       : error
            }
            res.json(ret);
        })
});


//monitor a repo
//return object as
/**
 * {
 *  status : 200,
 * }
 */
app.get('/monitor/:session_id/:repo_id', function(req, res) {
    //TODO catch error and send status code

    db.monitorUserRepo(req.params.repo_id);
    var ret = {
        status: 200,
    }
    res.send(JSON.stringify(ret));
});

//remove monitoring on a repo
//return object as
/**
 * {
 *  status : 200,
 * }
 */
app.get('/dont-monitor/:session_id/:repo_id', function(req, res) {
    //TODO catch error and send status code
    db.unmonitorUserRepo(req.params.repo_id);
    db.getUserAccessFromSession(req.params.session_id).then(function(user_access_row) {
        user_access = user_access_row[0];
        utils.removeDownloadedRepo(user_access.gitHubId, req.params.repo_id);
    });

    var ret = {
        status: 200,
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

//github.getPublicRepoDownload("BMARX123", "https://github.com/BMARX123/SMSplash", "SMSplash")

// github.getRepoDownload("vritant24", "https://github.com/vritant24/Adwyse-Challenge", "Adwyse-Challenge").then(() => {
//     runtest.unzipAndStore("vritant24", "Adwyse-Challenge").then(() => {
//         runtest.runTestScript("vritant24", "Adwyse-Challenge").then(() => {
//             runtest.parseScripts("vritant24", "Adwyse-Challenge").then((logs) => console.log(logs))
//         }).catch(err => console.log(err))
//     }).catch(err => console.log(err))
// }).catch(err => console.log(err))
//runtest.unzipAndStore("BMARX123", "HelpM
// runtest.parseScripts("vritant24", "Adwyse-Challenge").then((logs) => console.log(logs))
//runtest.unzipAndStore("BMARX123", "SMSplash")
//runtest.runTestScript("BMARX123", "HelpMe")
//runtest.runTestScript("BMARX123", "SMSplash")

//Receive notification from GitHub that commit to master has been made
app.post('/webhooks', function (req, res) {
    //create a new function that determines if the push was made by master call it here
    //determineMaster(url for master)
    res.send(JSON.stringify("POST request made"));
});

app.listen(8080);

module.exports = app;