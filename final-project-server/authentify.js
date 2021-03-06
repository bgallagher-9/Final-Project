const cookieParser = require('cookie-parser');
const session = require('express-session');
const User = require('./models/users.js');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

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
    //If the user attempts to login and *is successful*, this code will be reached.
    res.sendStatus(200);

    //However, if the login fails, passport will return a 401: Unauthorized
  });

  app.post('/api/logout', (req, res) => {
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
      // res.send('abcdefg')
        res.sendFile(path.resolve(__dirname, '../final-project-client/build', 'index.html'));
    }
  });

  app.get('/api/auth', (req, res) => {
    //If the user ia authenticated, express will add the user to the request object. Convenient!
    res.send(req.user);
  });
}

module.exports = auth;
