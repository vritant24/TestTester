var express = require('express');
var app = express();
var passport = require('passport')
var githubStrategy = require('passport-github')
var obj = {}

app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new githubStrategy({
  clientID: "68bca50fa8ec6e0034e9",
  clientSecret: '527ab44c8bf49732ff5abff6999718283d12a52b',
  callbackURL: "http://localhost:8080/auth/github/callback"
},
function(accessToken, refreshToken, profile, cb) {
  obj.profile = profile;
  obj.accessToken = accessToken;
  obj.refreshToken = refreshToken;
  cb(null, profile.id)
}
))

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', 
  passport.authenticate('github', {failureRedirect: '/'}), 
    function(req, res) {
      console.log(obj)
      res.redirect('/success');
    }
  );

app.listen(8080);
