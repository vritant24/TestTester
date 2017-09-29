var githubhook = require('githubhook');

var webhookSecret = "1234567890987654321"

var listen = function() {
  var hook = githubhook ({
    host: "localhost", //  default is 0.0.0.0
    port: "8080", //8080 if changed back
    //path: "/repos", //   default is /github/callback
    secret: webhookSecret
  });

  hook.on('push', function (repo, ref, data) {
    var branchName = _s.strRightBack(ref, "/");
    var fullNameRepository = data.repository.full_name;
    var removedFilesArray = data["head_commit"]["removed"];
    var addedFilesArray = data["head_commit"]["added"];
    var modifiedFilesArray = data["head_commit"]["modified"];
  });

  hook.on('pull request', function (repo, ref, data) {
    var branchName = _s.strRightBack(ref, "/");
    var fullNameRepository = data.repository.full_name;
    var removedFilesArray = data["head_commit"]["removed"];
    var addedFilesArray = data["head_commit"]["added"];
    var modifiedFilesArray = data["head_commit"]["modified"];
  });

}
module.exports = {
  listen
}