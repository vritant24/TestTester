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
            status  : utils.statusCodes.ok,
            user    : {
                github_id  : obj.id,
                username   : obj.login
            }
        }
        res.json(ret);
    }).catch((err) => {
        var ret = {
            status  : utils.statusCodes.server_error,
            user    : null,
        }
        console.log(err);
        res.json(ret);
    });
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
                status      : utils.statusCodes.ok,
                github_id   : repo_rows[0].gitHubId,
                repo_list   : repo_rows
            }
            res.json(ret);
        })
        .catch(function(error) {
            ret = {
                status      : utils.statusCodes.server_error,
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
    //console.log(req);
    //console.log('----------------------------------');
    //console.log(res);
    //console.log(req.params.session_id);
    var session_id = req.params.session_id;
    var repo_id = req.params.repo_id;
    //repo ID
    //user ID
    

    db.monitorUserRepo(req.params.repo_id).then(() => {
        var ret = {
            status: utils.statusCodes.ok,
        }
        res.json(ret);
    }).catch((err) => {
        var ret = {
            status: utils.statusCodes.server_error,
        }
        res.json(ret);
    });

    db.getUserAccessFromSession(session_id).then(function(user_access_row) {
        var user_access = user_access_row[0];
        db.getRepoURL(repo_id).then(function(repo_rows) {
            var repo = repo_rows[0];
            //console.log(repo_id);
            github.getRepoDownload(user_access.gitHubId, repo.repoURL, repo_id, user_access.accessToken).then(function() {
                run_tests.unzipAndStore(user_access.gitHubId, repo_id).then(function() {
                    run_tests.runTestScript(user_access.gitHubId, repo_id).then(function() {
                        run_tests.parseScripts(user_access.gitHubId, repo_id);
                    })
                })
            });
        });
    });
    
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
    db.unmonitorUserRepo(req.params.repo_id).then((resolve, reject) => {
        db.getUserAccessFromSession(req.params.session_id).then(function(user_access_row) {
            user_access = user_access_row[0];
            utils.removeDownloadedRepo(user_access.gitHubId, req.params.repo_id);
        }).then(() => {
            var ret = {
                status: utils.statusCodes.ok,
            }
            res.json(ret);
        }).catch((err) => reject(err));
    }).catch(err => {
        var ret = {
            status: utils.statusCodes.server_error,
        }
        res.json(ret);
    });
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

module.exports = app;