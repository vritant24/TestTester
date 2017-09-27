var mysql = require('mysql');

var con = mysql.createConnection({
  host: "52.200.13.118",
  user: "ye113",
  password: "einB98(rec^",
  database: "api_testing2"
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
   //var sql = "CREATE TABLE users (userID VARCHAR(255), repoList VARCHAR(255), password VARCHAR(255), testlog VARCHAR(255))";
  /*
  var sql = "INSERT INTO users (userID, repoList, password, testlog) VALUES ('user2', 'Repo2', '654321', 'testlog2')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
  */
  });

/*
con.connect(function(err) {
  //if (err) throw err;
  con.query("SELECT * FROM users", function (err, result, fields) {
    if (err) throw err;
    console.log(result[0].repoList);
  });
});

con.connect(function(err) {
  //if (err) throw err;
  con.query("SELECT userID FROM users", function (err, res, fields) {
    if (err) throw err;
    console.log(fields);
  });
});
*/
con.connect(function(err) {
  //if (err) throw err;
  con.query("SELECT * FROM users WHERE userID = 'user2'", function (err, result) {
    if (err) throw err;
    //console.log(result);
  });
});

con.connect(function(err) {
  //if (err) throw err;
  con.query("SELECT * FROM users ORDER BY userID", function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

con.connect(function(err) {
  //if (err) throw err;
  var sql = "DELETE FROM users WHERE userID = 'yeshulin516'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Number of records deleted: " + result.affectedRows);
  });
});

con.connect(function(err) {
  //if (err) throw err;
  var sql = "UPDATE users SET password = 'new123456' WHERE password = '654321'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});


