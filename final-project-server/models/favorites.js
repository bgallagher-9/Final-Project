const mongoose = require('mongoose');
const Schmea = mongoose.Schema;
const User = require('./models/users.js');

const favoriteSchema = Schema({
  nameMedia: { type: String },
  id: { type: Number },
  art: { type: String }
  favoriteBy: { type: Schema.type.Objectid, ref: 'User' }
});

const Favorites = mongoos.model("Favorites", favoriteSchema);

module.exports = Favorites;
