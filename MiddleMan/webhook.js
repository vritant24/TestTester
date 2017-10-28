var githubWebhook = require('express-github-webhook');
var github = require('./github_com.js');
var db = require('../db/db.js');
var run_tests = require('./run_tests.js');

var webhook = function(app) {
  //set up middleware
  var webhookHandler = githubWebhook( { path: '/webhooks'} );
  app.use(webhookHandler);

  webhookHandler.on('push', function(repo, data) {
    var jsonObj = JSON.parse(data.payload);
    var path = jsonObj.ref;
    var masterPath = "refs/heads/master";
    var comp = path.localeCompare(masterPath);
    //if (comp == 0) {
        db.getUserAccessFromUserId(jsonObj.sender.id)
        .then(function(user_access_row) {
        var user_access = user_access_row[0];
        db.getRepoURL(jsonObj.repository.id)
            .then(function(repo_rows) {
                    var repo = repo_rows[0];
                    console.log(repo.repoURL + "/" + path.substring(10));
                    repo.repoURL = repo.repoURL + path.substring(10);
                    github.getRepoDownload(user_access.gitHubId, repo.repoURL, jsonObj.repository.id, user_access.accessToken)
                    .then(function() {
                        run_tests.unzipAndStore(user_access.gitHubId, jsonObj.repository.id)
                        .then(function() {
                            run_tests.runTestScript(user_access.gitHubId, jsonObj.repository.id)
                            .then(function() {
                                run_tests.parseScripts(user_access.gitHubId, jsonObj.repository.id);
                            })
                            .catch(err => console.log(err))
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    //}
  });

  /*webhookHandler.on('pull request', function(repo, data) {
      //pull request
      var jsonObj = JSON.parse(data.payload);
      var path = jsonObj.ref;
      var masterPath = "refs/heads/master";
  
      console.log(jsonObj.sender.id);
      var comp = path.localeCompare(masterPath);
      if (comp == 0) {
        //console.log("This is the master branch");

        db.getUserAccessFromUserId(jsonObj.sender.id)
        .then(function(user_access_row) {
            var user_access = user_access_row[0];
            db.getRepoURL(jsonObj.repository.id).
            then(function(repo_rows) {
                var repo = repo_rows[0];
                github.getRepoDownload(user_access.gitHubId, repo.repoURL, jsonObj.repository.id, user_access.accessToken)
                .then(function() {
                    run_tests.unzipAndStore(user_access.gitHubId, jsonObj.repository.id)
                    .then(function() {
                        run_tests.runTestScript(user_access.gitHubId, jsonObj.repository.id)
                        .then(function() {
                            run_tests.parseScripts(user_access.gitHubId, jsonObj.repository.id);
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
});*/
}

/*function brandonFunction(data) {
  //do somethung with data
}*/

module.exports = {
  webhook
}
