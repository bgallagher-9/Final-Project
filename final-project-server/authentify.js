const cookieParser = require('cookie-parser');
const User = require('./models/users.js');
const session = require('express-session');
const passport = require('passport');

function auth(app) {
  app.use(cookieParser());
  app.use(session({
    secret: 'Unls*32nlsJLks)j++klJD8732NbdV^?lj',
    resave: true,
    saveUnitialized: true,
    cookie: { httpOnly: false }
  }));
  app.use(passport.initialize());
  app.use(session());

  passport.serializeUser(function(err, done) {
    done(null, user._id);
  });
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    });
  });

  const LocalStrategy = require("passport-local").Strategy;

  passport.use("login", new LocalStrategy(function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Username does not exist." })
      }
      user.checkPassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        else {
          return done(null, false, { message: "Invalid password." })
        };
      });
    })
  }
  ));

}

module.exports = auth;
