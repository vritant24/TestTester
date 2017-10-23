var githubWebhook = require('express-github-webhook');

var webhook = function (app) {
    //set up middleware
    var webhookHandler = githubWebhook({ path: '/webhooks' });
    app.use(webhookHandler);

    webhookHandler.on('push', function (repo, data) {
        var jsonObj = JSON.parse(data.payload);
        var path = jsonObj.ref;
        var masterPath = "refs/heads/master";
        //console.log(jsonObj.ref);
        var comp = path.localeCompare(masterPath);
        console.log(comp);
        if (comp == 0) {
            console.log("This is the master branch");

            db.getUserAccessFromSession(req.params.session_id).then(function (user_access_row) {
                var user_access = user_access_row[0];
                db.getRepoURL(req.params.repo_id).then(function (repo_rows) {
                    var repo = repo_rows[0];
                    github.getRepoDownload(user_access.gitHubId, repo.repoURL, req.params.repo_id, user_access.accessToken).then(function () {
                        run_tests.unzipAndStore(user_access.gitHubId, req.params.repo_id).then(function () {
                            run_tests.runTestScript(user_access.gitHubId, req.params.repo_id).then(function () {
                                run_tests.parseScripts(user_access.gitHubId, req.params.repo_id).catch((err) => {
                                    //parsescripts
                                    return 1;
                                });
                            }).catch((err) => {
                                //runTestScript
                                return 2;
                            });
                        }).catch((err) => {
                            //unzipandstore
                            return 3;
                        });
                    }).catch((err) => {
                        //getRepoDownload 
                        return 4;   
                    });
                }).catch((err) => {
                    //getRepoURL
                    return 5;    
                });
            }).catch((err) => {
                //getUserAceessFromSession
                return 6;
            });

        }
    });

    webhookHandler.on('pull request', function (repo, data) {
        //pull request
    });

    webhookHandler.on('commit_comment', function (repo, data) {
        //for commits also
    });
}

/*function brandonFunction(data) {
  //do somethung with data
}*/

module.exports = {
    webhook
}
