var mysql = require('mysql');
var nconf = require('nconf');

nconf.file({
  file: 'config/config.json'
});
if (!Object.keys(nconf.get()).length) {
  throw new Error('Unable to load config file. Check to make sure config/config.json exists');
}

var connection = mysql.createConnection(nconf.get('mysql'));

exports.getUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM User', function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.addUser = (userData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT IGNORE INTO User SET gitHubId = ?, username = ?', userData ,function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.addUserAccess = (userData) => {
  return new Promise((resolve, reject) => {
    connection.query('REPLACE INTO UserAccess SET gitHubId = ?, accessToken = ?', userData ,function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.addUserSession = (userData) => {
  return new Promise((resolve, reject) => {
    connection.query('REPLACE INTO UserSession SET gitHubId = ?, sessionToken = ?', userData ,function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//TODO: Add query for getting UserSession, UserAccess, and User data from gitHubId
//      This can be done by selecting UserSession Data from sessionToken
//      Then read up on how joins work in SQL. Use joins on
//      UserSession.gitHubId = UserAccess.accessToken and UserSession.gitHubId = User.gitHubId


exports.postUserSession = (userData) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM User, UserSession, UserAccess WHERE UserSession.sessionToken = ?  AND User.gitHubId = UserSession.gitHubId AND UserAccess.gitHubId =  UserSession.gitHubId', userData ,function(error, results){         
      if (error) {
        reject(error);
      } else {
        resolve(results);
        //console.log(results);
      }
    });
  });
}


exports.addUserRepo = (userRepoData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT IGNORE INTO UserRepo SET repoId = ?, gitHubId = ?, isMonitored = ?', userRepoData ,function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

//TODO: Add query for getting UserRepo and Repo data from gitHubId
//      This can be done by selecting UserRepo Data from gitHubId
//      Then read up on how joins work in SQL. Use a join on
//      UserRepo.repoId = Repo.repoId.


exports.postUserRepo = (userData) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM UserRepo, Repo WHERE UserRepo.gitHubId = ?  AND UserRepo.repoId = Repo.repoId', userData ,function(error, results){         
      if (error) {
        reject(error);
      } else {
        resolve(results);
        console.log(results);
      }
    });
  });
}




exports.addRepo = (repoData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT IGNORE INTO Repo SET RepoId = ?, RepoName = ?, RepoUrl = ?, IsPublic = ?', repoData ,function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
