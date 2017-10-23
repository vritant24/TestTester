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

exports.getRepos = (sessionToken) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM UserRepo NATURAL JOIN Repo WHERE gitHubId = (SELECT gitHubId FROM UserSession WHERE sessionToken = ? LIMIT 1 );', sessionToken, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.getUserAccessFromSession = (sessionToken) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM UserAccess WHERE gitHubId = (SELECT gitHubId FROM UserSession WHERE sessionToken = ? LIMIT 1 );', sessionToken, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.getUserAccessFromUserId = (userId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM UserAccess WHERE gitHubId = ? LIMIT 1;', userId, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.getRepoURL = (repoId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT repoURL FROM Repo WHERE repoId = ?;', repoId, function(error, results) {
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
    connection.query('INSERT IGNORE INTO User SET gitHubId = ?, username = ?', userData, function(error, results) {
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
    connection.query('REPLACE INTO UserAccess SET gitHubId = ?, accessToken = ?', userData, function(error, results) {
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
    connection.query('REPLACE INTO UserSession SET gitHubId = ?, sessionToken = ?', userData, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.addUserRepo = (userRepoData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT IGNORE INTO UserRepo SET repoId = ?, gitHubId = ?, isMonitored = ?', userRepoData, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.addRepo = (repoData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT IGNORE INTO Repo SET RepoId = ?, RepoName = ?, RepoUrl = ?, IsPublic = ?', repoData, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.monitorUserRepo = (repoId) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE UserRepo SET isMonitored = 1 WHERE repoId = ?', repoId, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.unmonitorUserRepo = (repoId) => {
  return new Promise((resolve, reject) => {
    connection.query('UPDATE UserRepo SET isMonitored = 0 WHERE repoId = ?', repoId, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.addRepoDeployment = (deploymentData) => {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO RepoDeployments VALUES(?, ?)', deploymentData, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.releaseRepoDeployment = (repoId) => {
  return new Promise((resolve, reject) => {
    connection.query('DELETE FROM RepoDeployments WHERE repoId = ?', repoId, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

exports.getRepoDeployment = (repoId) => {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM RepoDeployments WHERE repoId = ?', repoId, function(error, results) {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}