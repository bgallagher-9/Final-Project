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

function favoriteParse(favorites) {
  return {
    id: favorites._id,
    nameMedia: favorites.nameMedia,
    idMedia: favorites.idMedia,
    artMedia: favorites.artMedia
  }
}

app.post('/api/favorite', (req, res) => {
  console.log('posting', req.body);
  const favorite = new Favorites();
  favorite.nameMedia = req.body.name;
  favorite.idMedia = req.body.id;
  favorite.artMedia = req.body.art;
  favorite.userId = req.user._id;
  favorite.save((err, data) => {
    res.send(data);
    console.log(data);
    // res.send(favoriteParse(data));
  })

});

app.get('/api/favorites', (req, res) => {
  Favorites.find({userId: req.user._id})
    .exec(function(err, data) {
      res.send(data);
    });
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../final-project-client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Howdy ho from port ${PORT}`);
});
