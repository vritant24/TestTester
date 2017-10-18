var utils       = require('./utils.js')
var db          = require('../db/db.js');
var github_com  = require('./github_com.js');

var storeUserData = (access_code, session_id) => {
  return new Promise((resolve, reject) => {
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
        user_session_db_data.push(session_id);
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
        resolve(response.access_token);
      });
    });
  });
}

module.exports = {
    storeUserData
}