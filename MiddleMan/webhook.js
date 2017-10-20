var githubWebhook = require('express-github-webhook');

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
      console.log(comp);
      if (comp == 0) {
        console.log("This is the master branch");
        //find master, call brandon's function
        //brandonFunction(data)
      }
  });

  webhookHandler.on('pull request', function(repo, data) {
      //pull request
  });

module.exports = {
  webhook
}
