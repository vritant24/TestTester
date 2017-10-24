var express = require('express');
var engines = require('consolidate');
var githubhook = require('githubhook');
var github = require('./github_com');
var runtest = require('./run_tests.js')
var db = require('../db/db.js');
var store_user = require('./store_user')
var hook = require('./webhook.js')
var utils = require('./utils.js');
var run_tests = require('./run_tests.js');

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


// db.getAllReposDeployed().then(function (reposToDeploy) {
//     var count = 1;
//     console.log(reposToDeploy)
//     for (var i in reposToDeploy) {
//         console.log(reposToDeploy[i])
//         prom(reposToDeploy[i])
//     }
// })

// var prom = (toDeploy) => {
//     db.getUserFromRepoId(toDeploy.repoId).then(function (userId_rows) {
//         console.log("----------------------------------")
//         console.log(userId_rows);
//         console.log(toDeploy.port);
//         console.log("----------------------------------")
//         var userId = userId_rows[0].gitHubId
//         //console.log(toDeploy)
//         utils.deployNoLog(userId, toDeploy.repoId, toDeploy.port).then(port => {
//             console.log("--------------SOMETHING--------------------")
//             console.log(port);
//             console.log("----------------------------------")
//         })
//         .catch(err => console.log(err))            
//     })
//     .catch(err => console.log(err))
// }

app.get('/authenticate/:access_code/:session_id', function (req, res) {
    //Using Access Code, get Access Token from GitHub
    store_user.storeUserData(req.params.access_code, req.params.session_id)
    .then((obj) => {
        var ret = {
            status: utils.statusCodes.ok,
            user: {
                github_id: obj.id,
                username: obj.login
            }
        }
        res.json(ret);
    })
    .catch((err) => {
        var ret = {
            status: utils.statusCodes.server_error,
            user: null,
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
app.get('/repos/:session_id', function (req, res) {
    var ret;
    db.getRepos(req.params.session_id)
    .then((repo_rows) => {
        ret = {
            status      : utils.statusCodes.ok,
            github_id   : repo_rows[0].gitHubId,
            repo_list   : repo_rows
        }
        res.json(ret);
    })
    .catch((error) => {
        ret = {
            status      : utils.statusCodes.unauthorised,
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
    db.getUserAccessFromSession(req.params.session_id)
    .then((user_access_row, resolve, reject) => {
        var user_access = user_access_row[0];
        var id = user_access.gitHubId;
        var access_token = user_access.accessToken;
        var repo_id = req.params.repo_id;
        db.getRepoURL(req.params.repo_id)
        .then((repo_rows) => {
            var repo = repo_rows[0];
            github.getRepoDownload(id, repo.repoURL, repo_id, access_token)
            .then((resolve, reject) => {
                run_tests.unzipAndStore(id, repo_id)
                .then(() => {
                    run_tests.runTestScript(id, repo_id)
                    .then(() => {
                        run_tests.parseScripts(id, repo_id)
                        .then((report) => {
                            db.monitorUserRepo(repo_id);
                            Promise.all([utils.deployAlpha(id, repo_id, report), 
                                         utils.deployBeta(id, repo_id, report), 
                                         utils.deployProd(id, repo_id, report)])
                            // Promise.all([utils.deployAlpha(user_access.gitHubId, req.params.repo_id, report)])    
                            .then(values => {
                                console.log(values);
                                values.forEach(function(port) {
                                    db.addRepoDeployment([repo_id, port])
                                    .catch(err => console.log(err));
                                })
                                res.json({status: utils.statusCodes.ok})
                            })
                            .catch(err => {
                                console.log(err);
                                res.json({status: utils.statusCodes.server_error})
                            })
                        })
                        .catch(err => {
                            console.log(err);
                            res.json({status: utils.statusCodes.server_error})
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({status: utils.statusCodes.server_error})
                    })
                })
                .catch(err => {
                    console.log(err);
                    res.json({status: utils.statusCodes.server_error})
                })
            })
            .catch(err => {
                console.log(err);
                res.json({status: utils.statusCodes.server_error})
            })
        })
        .catch(err => {
            console.log(err);
            res.json({status: utils.statusCodes.server_error})
        })
    })
    .catch(err => {
        console.log(err);
        res.json({status: utils.statusCodes.unauthorised})
    })
    // res.json({status: utils.statusCodes.server_error})
}); 

//remove monitoring on a repo
//return object as
/**
 * {
 *  status : 200,
 * }
 */
app.get('/dont-monitor/:session_id/:repo_id', function (req, res) {
    //TODO catch error and send status code
    db.getUserAccessFromSession(req.params.session_id)
    .then((user_access_row) => {
        var user_access = user_access_row[0];
        var id = user_access.gitHubId;
        var repo_id = req.params.repo_id;
        db.unmonitorUserRepo(repo_id)
        .then((resolve, reject) => {
            db.getRepoDeployment(repo_id)
            .then((deploymentData) => {
                db.releaseRepoDeployment(repo_id);
                deploymentData.forEach((deployment) => {
                    utils.killProcessOnPort(deployment.port);
                });
            });
            utils.removeDownloadedRepo(id, repo_id);
        })
        .then(() => {
            var ret = {
                status: utils.statusCodes.ok,
            }
            res.json(ret);
        })
        .catch((err) => reject(err));
    })
    .catch(err => {
        var ret = {
            status: utils.statusCodes.unauthorised,
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
app.get('/repo/:session_id/:repo_id', function (req, res) {
    //need to run the first get() function to make sure the user exist
    //TODO fill ret with actual data
    db.getUserAccessFromSession(req.params.session_id)
    .then((user_access_row) => {
        var user_access = user_access_row[0];
        var id = user_access.gitHubId;
        var repo_id = req.params.repo_id;
        db.getRepoDeployment(req.params.repo_id)
        .then((server_endpoints) => {
            run_tests.parseScripts(id, repo_id)
            .then((logs) => {
                res.json({
                    status              : utils.statusCodes.ok,
                    repo_id             : req.params.repo_id,
                    server_endpoints    : server_endpoints,
                    test_logs           : logs
                });
            })
            .catch(err => {
                res.json({
                    status              : utils.statusCodes.server_error,
                    repo_id             : null,
                    server_endpoints    : null,
                    test_logs           : null
                });
            })
        })
        .catch(err => {
            res.json({
                status: utils.statusCodes.server_error,
                repo_id: null,
                server_endpoints: null,
                test_logs: null
            });
            console.log(err);
        });
    })
    .catch(err => {
        res.json({
            status              : utils.statusCodes.unauthorised,
            repo_id             : null,
            server_endpoints    : null,
            test_logs           : null
        });
        console.log(err);
    });
});

//Receive notification from GitHub that commit to master has been made
app.post('/webhooks', function (req, res) {
    //create a new function that determines if the push was made by master call it here
    //determineMaster(url for master)
    res.send(JSON.stringify("POST request made"));
});

app.listen(8080);

module.exports = app;
