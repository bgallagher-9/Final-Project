// const cookieParser = require('cookie-parser');
// const User = require('./models/users.js');
// const session = require('express-session');
// const passport = require('passport');
// const express = require('express');
// const app = express();
// const bodyParser = require ('body-parser');
// const mongoose = require('mongoose');
// app.use(bodyParser.urlencoded({ extended: false }));
//
// function auth(app) {
//   app.use(cookieParser());
//   app.use(session({
//     secret: 'Unls*32nlsJLks)j++klJD8732NbdV^?lj',
//     resave: true,
//     saveUnitialized: true,
//     cookie: { httpOnly: false }
//   }));
//   app.use(passport.initialize());
//   app.use(session());
//
//   passport.serializeUser(function(user, done) {
//     done(null, user._id);
//   });
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user)
//     });
//   });
//   app.use(bodyParser.urlencoded({ extended: false }));
//   mongoose.Promise = global.Promise;
//   const LocalStrategy = require("passport-local").Strategy;
//
//   passport.use("login", new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false, { message: 'Username does not exist.' });
//       }
//       user.checkPassword(password, function(err, isMatch) {
//         if (err) {
//           return done(err);
//         }
//         if (isMatch) {
//           return done(null, user);
//         }
//         else {
//           return done(null, false, { message: 'Invalid password.' });
//           }
//         });
//       });
//     }
//   ));
//
//   app.post('/api/signup', (req, res, next) => {
//     // console.log('req.body', req.body);
//     const username = req.body.username;
//     const password = req.body.password;
//     if (username === '') {
//         res.status(400);
//         return res.send('Please enter a username.');
//       }
//       else if (password === '') {
//         res.status(400);
//         return res.send('Please enter a password.');
//       }
//       // console.log('User', User);
//       // console.log('newUser', newUser);
//       console.log('signup attempt, by', username, 'pw:', password);
//     User.findOne({ username: username }, (err, user) => {
//       if (err) { return next(err); }
//       if (user) {
//         return res.send('Username is already in use, please be more creative.');
//       }
//       const newUser = new User({
//         username: username,
//         password: password
//       });
//       console.log('newUser', newUser)
//       newUser.save(next);
//     });
//   }, passport.authenticate('login'), (req, res) => {
//       res.sendStatus(200);
//     })
//
//     app.get('/api/authy', function(req, res) {
//       //If the user ia authenticated, express will add the user to the request object. Convenient!
//       // console.log('authy', req.user);
//
//       res.send(req.user);
//     });
// }
//
// module.exports = auth;
//
//
//
// // passport.authenticate('login', {
// //     successRedirect:
// //                       '/api/'
// //                       // , res.send('Thank you for signing up.')
// //                     ,
// //     failureRedirect: '/api/signup'
//     // failureFlash: true
//
//     //alternative?


const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/users.js');
const passport = require('passport');

function auth(app) {

  app.use(cookieParser());
  app.use(session({
    secret: 'Unls*32nlsJLks)j++klJD8732NbdV^?lj',
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false }
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  const LocalStrategy = require('passport-local').Strategy;

  passport.use('login', new LocalStrategy(
    (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'unknown username' });
        }
        user.checkPassword(password, (err, isMatch) => {
          if (err) { return done(err); }
          if (isMatch) {
            return done(null, user);
          }
          else {
            return done(null, false, { message: 'invalid password' });
          }
        });
      });
    }
  ));


  app.get('/api/users',  (req, res, next) => {
    User.find()
      .exec((err, users) => {
        if (err) { return next(err); }
        res.send(users);
      });
  });

  app.post('/api/signup', (req, res, next) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    if (username === '') {
      res.status(400);
      return res.send('Please enter a username');
    }
    else if (password === '') {
      res.status(400);
      return res.send('Please enter a password.');
    }
    User.findOne({ username: username }, (err, user) => {
      if (err) { return next(err); }
      if (user) {
        res.status(400);
        return res.send('Username already in use. Please be more creative.');
      }
      const newUser = new User({
        username: username,
        password: password
      });
      newUser.save(next);
    });
  }
  , passport.authenticate('login'), (req, res) => {
    res.sendStatus(200);
  }
);

  app.post('/api/login', passport.authenticate('login'), (req, res) => {
    console.log('successful login!');
    //If the user attempts to login and *is successful*, this code will be reached.
    res.sendStatus(200);

    //However, if the login fails, passport will return a 401: Unauthorized
  });

  app.post('/api/logout', (req, res) => {
    console.log('logging out');
    req.logout();
    res.sendStatus(204);
  });

  //This middleware enforces authentication.
  //If the user is not authenticated, 401.
  //If the user is, the request continues on.
  app.use((req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
    else {
      res.send('abcdefg')
      // res.sendStatus(401);
    }
  });

  app.get('/api/auth', (req, res) => {
    //If the user ia authenticated, express will add the user to the request object. Convenient!
    console.log('auth', req.user);
    res.send(req.user);
  });
}

module.exports = auth;
