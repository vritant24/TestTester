var request = require('request');

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

module.exports = {
    getToken,
    getUserData
}
