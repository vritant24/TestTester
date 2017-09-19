var express = require('express');
var app = express();
var passport = require('passport')
var githubStrategy = require('passport-github')
var engines = require('consolidate');
var db = require('../db/db.js');
var utils = require('./utils.js')
var obj = {}

//Serve react and static files
app.use(express.static(__dirname + '/../client/build'));
app.set('views', __dirname + '/../client/build');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

//stuff for auth
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//For Github Login
passport.use(new githubStrategy({
  clientID: "68bca50fa8ec6e0034e9",
  clientSecret: '527ab44c8bf49732ff5abff6999718283d12a52b',
  callbackURL: "http://localhost:8080/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  obj.profile = profile;
  obj.accessToken = accessToken;
  obj.refreshToken = refreshToken;
  obj.cb = cb;
  cb(null, profile.id)
}
));

//Since there is no database
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});


//=========== Routes ============

//Root route redirects to login with github
app.get('/', passport.authenticate('github'));

//Github login callback where we get the access token
app.get('/auth/github/callback',
  passport.authenticate('github', {failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/dashboard');
  }
);

//Dashboard where the react app is shown
app.get('/dashboard', function(req, res) {
  //access token from `obj` over here
  // eg - obj.accessToken
  var userData = utils.pullUserData(obj);
  console.log(userData);
  db.addUser(userData).then(function(rows) {
    //Ensure no errors occur
  });
  db.getUsers().then(function(rows) {
    console.log('USER ROWS:')
    console.log(rows);
  });
  res.render("index.html");
});
app.listen(8080);
