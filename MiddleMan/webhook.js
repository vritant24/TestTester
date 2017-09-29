var githubhook = require('githubhook');

var CLIENT_SECRET = 'a3340700567cad703e00952f4b740d065c1b297d';

var listen = function() {
  var hook = githubhook ({
    host: "localhost", //  default is 0.0.0.0
    port: "8080", //8080 if changed back
    path: "/repos", //   default is /github/callback
    secret: CLIENT_SECRET
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