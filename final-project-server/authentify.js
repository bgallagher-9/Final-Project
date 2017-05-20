const cookieParser = require('cookie-parser');
const User = require('./models/users.js');
const session = require('express-session');
const passport = require('passport');
const express = require('express');
const app = express();

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

  passport.serializeUser(function(user, done) {
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
        return done(null, false, { message: 'Username does not exist.' });
      }
      user.checkPassword(password, function(err, isMatch) {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        else {
          return done(null, false, { message: 'Invalid password.' });
          }
        });
      });
    }
  ));

  app.post('/api/signup', (req, res, next) => {
    console.log('req.body', req.body);
    const username = req.body.username;
    const password = req.body.password;
    if (username === '') {
        res.status(400);
        return res.send('Please enter a username.');
      }
      else if (password === '') {
        res.status(400);
        return res.send('Please enter a password.');
      }
    User.findOne({ username: username }, (err, user) => {
      if (err) { return next(err); }
      if (user) {
        return res.send('Username is already in use, please be more creative.');
      }
      const newUser = new User({
        username: username,
        password: password
      });
      newUser.save(next);
    });
  },
  // passport.authenticate('login', {
  //     successRedirect:
  //                       '/api/'
  //                       // , res.send('Thank you for signing up.')
  //                     ,
  //     failureRedirect: '/api/signup'
      // failureFlash: true

      //alternative?
      passport.authenticate('login'), (req, res) => {
      res.sendStatus(200);
    })

    // app.get('/api/authy', function(req, res) {
    //   //If the user ia authenticated, express will add the user to the request object. Convenient!
    //   console.log('authy', req.user);
    //
    //   res.send(req.user);
    // });
}

module.exports = auth;
