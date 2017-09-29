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

