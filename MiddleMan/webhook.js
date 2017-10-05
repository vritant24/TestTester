var githubWebhook = require('express-github-webhook');
var repo_download = require('./repo_download.js');

var webhook = function(app) {
  //set up middleware
  var webhookHandler = githubWebhook( { path: '/webhooks'} );
  app.use(webhookHandler);

  webhookHandler.on('push', function(repo, data) {
      var jsonObj = JSON.parse(data.payload);
      var path = jsonObj.ref;
      var masterPath = "refs/heads/master";
      //console.log(jsonObj.ref);
      var comp = path.localeCompare(masterPath);
      if (comp == 0) {
        //console.log("This is the master branch");
        repo_download(jsonObj.repository.html_url);
      }
  });

  webhookHandler.on('pull_request', function(repo, data) {
      //pull request (works)
  });
}

module.exports = {
  webhook
}
