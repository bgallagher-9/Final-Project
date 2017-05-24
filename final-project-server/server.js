const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Favorites = require('./models/favorites.js')

const app = express();
const PORT = process.env.PORT || 5000;
mongoose.Promise = global.Promise;

const mongoURL = process.env.MONGODB_URI || 'mongodb://localhost:28028/Final-Project';
mongoose.connect(mongoURL);

app.use(express.static(path.resolve(__dirname, '../final-project-client/build')));
app.use(bodyParser.urlencoded({ extended: false}));

require('./authentify.js')(app);

app.post('/api/favorite', (req, res) => {
  console.log('posting', req.body);
  let favorite = new Favorites();
  favorite.nameMedia = req.body.name;
  favorite.idMedia = req.body.id;
  favorite.artMedia = req.body.art;
  favorite.userId = req.user._id;
  favorite.save(() => {})
  res.send('congrats?');
});

// router.post('/api/book', (req, res) => {
//
//   const book = new Book();
//   book.title = req.body.title;
//   book.author = req.body.author;
//   book.pubYear = req.body.pubYear;
//   book.description = req.body.description;
//   book.userId = req.user._id;
//
//   book.save((err, data) => {
//     res.send(formatBook(data));
//   });
// });

app.get('/api/favorites', (req, res) => {
  Favorites.find({userId: req.user._id})
    .exec(function(err, data) {
    //  console.log(arguments);
      res.send(data);
    });
});

// app.get('/api/savedrecipes', function(req, res) {
//   Recipe.find({})
//     .exec(function(err, data) {
//     //  console.log(arguments);
//       res.send(data);
//     });
// });


// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../final-project-client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Howdy ho from port ${PORT}`);
});
