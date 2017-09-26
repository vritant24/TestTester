var request = require('request');

//Dev values
var CLIENT_ID     = '2a48dc27e13bf25eca10';
var CLIENT_SECRET = 'a3340700567cad703e00952f4b740d065c1b297d';

var getToken = (accessCode) => {
    var postUrl = 'https://github.com/login/oauth/access_token?client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET+ '&code=' + accessCode;
    request.post(
      postUrl,
      { json: { key: 'value' } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)
          }
          console.log(body)
      }
    );
}

module.exports = {
    getToken
}