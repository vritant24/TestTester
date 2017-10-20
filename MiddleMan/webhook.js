var githubWebhook = require('express-github-webhook');
var github = require('./github_com');
var db = require('../db/db.js');

var webhook = function(app) {
  //set up middleware
  var webhookHandler = githubWebhook( { path: '/webhooks'} );
  app.use(webhookHandler);

  webhookHandler.on('push', function(repo, data) {
    console.log('Push');
      var jsonObj = JSON.parse(data.payload);
      var path = jsonObj.ref;
      var masterPath = "refs/heads/master";
      console.log(jsonObj.sender);
      var comp = path.localeCompare(masterPath);
      if (comp == 0) {
        //master branch

        //get repo ID
        //owner -> ID

        db.getUserAccessFromSession(req.params.session_id).then(function(user_access_row) {
          var user_access = user_access_row[0];
          db.getRepoURL(req.params.repo_id).then(function(repo_rows) {
              var repo = repo_rows[0];
              github.getRepoDownload(user_access.gitHubId, repo.repoURL, req.params.repo_id, user_access.accessToken).then(function() {
                  run_tests.unzipAndStore(user_access.gitHubId, req.params.repo_id).then(function() {
                      run_tests.runTestScript(user_access.gitHubId, req.params.repo_id).then(function() {
                          run_tests.parseScripts(user_access.gitHubId, req.params.repo_id);
                      })
                  })
              });
          });
      });
        //find master, call brandon's function
        //brandonFunction(data)
      }
  });

  webhookHandler.on('pull_request', function(repo, data) {
      console.log('Pull Request');
      var jsonObj = JSON.parse(data.payload);
      var path = jsonObj.ref;
      var masterPath = "refs/heads/master";
      //console.log(jsonObj.ref);
      var comp = path.localeCompare(masterPath);
      console.log(comp);
      if (comp == 0) {
        //master branch
      }
  });
}

module.exports = {
  webhook
}
