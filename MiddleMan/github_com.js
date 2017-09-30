var request     = require('request');
var utils       = require('./utils.js')

//Dev values
var CLIENT_ID     = '2a48dc27e13bf25eca10';
var CLIENT_SECRET = 'a3340700567cad703e00952f4b740d065c1b297d';

var options = {
  headers: {
    'User-Agent': 'MiddleManServer'
  }
};

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

var getTokenAndUserData = (access_code) => {
  github_com.getToken(access_code).then(function(response) {
    
    //Using Access Token, get User Data from GitHub
    github_com.getUserData(response.access_token).then(function(user_data) {

      var parsed_user_data = JSON.parse(user_data);
      var gitHubId = parsed_user_data.id;

      //Add User Information to database
      var user_db_data = [];
      user_db_data.push(gitHubId);
      user_db_data.push(parsed_user_data.login);
      db.addUser(user_db_data);

      //Add User access code to database
      var user_access_db_data = [];
      user_access_db_data.push(gitHubId);
      user_access_db_data.push(response.access_token);
      db.addUserAccess(user_access_db_data);

      //Add User session ID to database
      var user_session_db_data = [];
      user_session_db_data.push(gitHubId);
      user_session_db_data.push(req.params.session_id);
      db.addUserSession(user_session_db_data);

      github_com.getUserRepoData(response.access_token).then(function(user_repo_data) {

        user_repos = utils.packageUserRepoData(user_repo_data, gitHubId);

        user_repos.forEach(function(user_repo) {
          db.addUserRepo(user_repo);
        });

        repos = utils.packageRepoData(user_repo_data);

        repos.forEach(function(repo) {
          db.addRepo(repo);
        });

      });
    });
  });
}



module.exports = {
    getUserRepoData,
    getTokenAndUserData,
}
