var request = require('request');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

//Dev values
var CLIENT_ID     = '2a48dc27e13bf25eca10';
var CLIENT_SECRET = 'a3340700567cad703e00952f4b740d065c1b297d';

var options = {
  headers: {
    'User-Agent': 'MiddleManServer'
  }
};

//Gets access token for user from github
var getToken = (accessCode) => {
  return new Promise((resolve, reject) => {
    var postUrl = 'https://github.com/login/oauth/access_token?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET+ '&code=' + accessCode;
    request.post(
      postUrl,
      { json: { key: 'value' } },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(body);
        }
        reject(error);
      }
    );
  });
}

//gets user data for user from github
var getUserData = (access_token) => {
  const options = {
      url: 'https://api.github.com/user?access_token=' + access_token,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'MiddleManServer'
      }
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            resolve(body);
        }
        reject(error)
      }
    );
  });
}

//gets user's repo data from github
var getUserRepoData = (access_token) => {
  const options = {
      url: 'https://api.github.com/user/repos?access_token=' + access_token,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'MiddleManServer'
      }
  };

  return new Promise((resolve, reject) => {
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body);
        }
        reject(error)
      }
    );
  });
}

var getPrivateRepoDownload = (github_id, repo_url, access_token) => {

  var dl_command = ('cd UserRepositories; mkdir -p ' + github_id +
                   '; cd ' + github_id + '; ' + 'curl -H "Authorization: token '
                   + access_token + "\"" + ' -L ' + "\"" + repo_url + 'tarball' + "\";");

  console.log(dl_command);

  child = exec(dl_command, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  });

  /*child = exec("cd " + github_id, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
  });

  child = exec("pwd " + github_id, function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});*/

}





module.exports = {
    getUserRepoData,
    getToken,
    getUserData,
    getPrivateRepoDownload
}
