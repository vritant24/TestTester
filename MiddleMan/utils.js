var firstOpenPort = require('first-open-port');
var exec = require('child_process').exec;
var child;

exports.pullUserData = data => {
  var userDataInputs = [];
  userDataInputs.push(parseInt(data.profile.id));
  userDataInputs.push(data.profile.username);
  userDataInputs.push(data.profile.displayName);
  userDataInputs.push(data.profile._json.avatar_url);
  userDataInputs.push(parseInt(data.profile.id));
  userDataInputs.push(data.accessToken);
  return userDataInputs;
}

exports.packageUserRepoData = (repo_data, gitHubId) => {
  var parsed_repos_data = JSON.parse(repo_data);
  var db_repos_data = [];

  parsed_repos_data.forEach(function (repo) {
    var db_repo_data = [];

    db_repo_data.push(repo.id);
    db_repo_data.push(gitHubId);
    db_repo_data.push(false);

    db_repos_data.push(db_repo_data);

  });
  return db_repos_data;
};

exports.removeDownloadedRepo = (github_id, repo_id) => {
  var removeCommand = 'cd UserRepositories; cd ' + github_id + '; ' + 'rm -r ' + repo_id;

  child = exec(removeCommand, function (error, stdout, stderr) {
    if (error !== null) {
      //Todo: THIS SHOULD BE REALLY CAUGHT AND REPORTED!
      console.log('exec error: ' + error);
    }
  });
}

//Remove the check for !failures
exports.deployAlpha = (github_id, repo_id, report) => {
  return new Promise((resolve, reject) => {
    var deployed_ports = [];
    firstOpenPort(10000, 65000)
      .then(port => {
        if (!report.alpha.stats.failures) {
          var deployAlpha = 'cd UserRepositories; cd ' + github_id + '; cd ' + repo_id + '; npm install; PORT=' + port + ' npm start';
          child = exec(deployAlpha, (error, stdout, stderr) => {
            //Todo: THIS SHOULD BE REALLY CAUGHT AND REPORTED!
            console.log('exec error: ' + error);
            reject(error);
          });
        }
        resolve(port)
      })
      .catch(error => {
        reject(error);
      })
  });
}

exports.deployBeta = (github_id, repo_id, report) => {
  return new Promise((resolve, reject) => {
    var deployed_ports = [];
    firstOpenPort(10000, 65000)
      .then(port => {
        if (!report.beta.stats.failures) {
          var deployBeta = 'cd UserRepositories; cd ' + github_id + '; cd ' + repo_id + '; PORT=' + port + ' npm start';
          child = exec(deployBeta, function (error, stdout, stderr) {
            //Todo: THIS SHOULD BE REALLY CAUGHT AND REPORTED!
            console.log('exec error: ' + error);
            reject(error);
          });
        }
        resolve(port);
      })
      .catch(error => {
        reject(error);
      })
  });
}

exports.deployProd = (github_id, repo_id, report) => {
  return new Promise((resolve, reject) => {
    var deployed_ports = [];
    firstOpenPort(10000, 65000)
      .then(port => {
        if (!report.prod.stats.failures) {
          var deployProd = 'cd UserRepositories; cd ' + github_id + '; cd ' + repo_id + '; PORT=' + port + ' npm start';
          child = exec(deployProd, function (error, stdout, stderr) {
            //Todo: THIS SHOULD BE REALLY CAUGHT AND REPORTED!
            console.log('exec error: ' + error);
            reject(error);
          });
        }
        resolve(port);
      })
      .catch(error => {
        reject(error);
      })
  });
}

exports.killProcessOnPort = (port) => {
  return new Promise((resolve, reject) => {
    var killProcess = 'kill $(lsof -t -i:' + port + ')';
    child = exec(killProcess, function (error, stdout, stderr) {
      //Todo: THIS SHOULD BE REALLY CAUGHT AND REPORTED!
      console.log('exec error: ' + error);
      reject(error);
    });
  });
};

exports.packageRepoData = (repo_data) => {
  var parsed_repos_data = JSON.parse(repo_data);
  var db_repos_data = [];

  parsed_repos_data.forEach(function (repo) {
    var db_repo_data = [];

    db_repo_data.push(repo.id);
    db_repo_data.push(repo.name);
    db_repo_data.push(repo.html_url);
    db_repo_data.push(repo.private);

    db_repos_data.push(db_repo_data);

  });
  return db_repos_data;
};

exports.deployNoLog = (github_id, repo_id, port) => {
  return new Promise((resolve, reject) => {
    var deployAlpha = 'cd UserRepositories; cd ' + github_id + '; cd ' + repo_id + '; npm install; PORT=' + port + ' npm start';
    child = exec(deployAlpha, (error, stdout, stderr) => {
      //Todo: THIS SHOULD BE REALLY CAUGHT AND REPORTED!
      console.log('exec error: ' + error);
      reject(error);
    });

    resolve(port)
  });
}

exports.statusCodes = {
  ok                : 200,
  bad_request       : 400,
  unauthorised      : 401,
  forbidden         : 403,
  notFound          : 404,
  server_error      : 500,
  test_run_failure  : 700,
  repo_error        : 701,
}