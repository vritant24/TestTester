var request = require('request');
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

var getRepoDownload = (github_id, repo_url, repo_id, access_token) => {
  return new Promise((resolve, reject) => {
    var api_url = getApiUrl(repo_url);
    var dl_command = ('cd UserRepositories; mkdir -p ' + github_id +
                     '; cd ' + github_id + '; ' + 'curl -H "Authorization: token '
                     + access_token + "\"" + ' -L ' + api_url + '/tarball' + " > " + repo_id + ".tar.gz;");
  
    child = exec(dl_command, function (error, stdout, stderr) {
      if (error !== null) {
        reject(error);
      }
      else {
        resolve();
      }
    });
  });
}

var getApiUrl = (repo_url)=> {
  var url = repo_url.slice(8);
  var slash_pos = url.search('/');
  url = url.slice(slash_pos + 1);
  return "https://api.github.com/repos/" + url;
}

var execDownload = (dl_command) => {
  

}


module.exports = {
    getUserRepoData,
    getToken,
    getUserData,
    getRepoDownload
}
