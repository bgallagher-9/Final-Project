const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = Schema({
  nameMedia: { type: String },
  idMedia: { type: Number },
  artMedia: { type: String },
  typeMedia: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
