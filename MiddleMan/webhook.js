var githubWebhook = require('express-github-webhook');

var webhook = function(app) {
  //set up middleware
  var webhookHandler = githubWebhook( { path: '/webhooks'} );
  app.use(webhookHandler);

  webhookHandler.on('push', function(repo, data) {
      var jsonObj = JSON.parse(data.payload);
      var path = jsonObj.ref;
      var masterPath = "refs/heads/master";
      console.log(data.payload.sender.id);
      var comp = path.localeCompare(masterPath);
      console.log(comp);
      if (comp == 0) {
        console.log("This is the master branch");

        db.getUserAccessUserId(jsonObj.sender.id).then(function(user_access_row) {
          var user_access = user_access_row[0];
          db.getRepoURL(jsonObj.repository.id).then(function(repo_rows) {
              var repo = repo_rows[0];
              github.getRepoDownload(user_access.gitHubId, repo.repoURL, jsonObj.repository.id, user_access.accessToken).then(function() {
                  run_tests.unzipAndStore(user_access.gitHubId, jsonObj.repository.id).then(function() {
                      run_tests.runTestScript(user_access.gitHubId, jsonObj.repository.id).then(function() {
                          run_tests.parseScripts(user_access.gitHubId, rjsonObj.repository.id);
                      })
                  })
              });
          });
        });
        //find master, call brandon's function
        //brandonFunction(data)
      }
  });

  webhookHandler.on('pull request', function(repo, data) {
      //pull request
  });

  webhookHandler.on('commit_comment', function(repo, data) {
      //for commits also
  });
}

/*function brandonFunction(data) {
  //do somethung with data
}*/

module.exports = {
  webhook
}
