const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./models/users.js');

const favoriteSchema = Schema({
  nameMedia: { type: String },
  id: { type: Number },
  art: { type: String }
  // favoriteBy: { type: Schema.type.Objectid, ref: 'User' }
});

const Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
