const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const User = require('./models/users.js');

const favoriteSchema = Schema({
  nameMedia: { type: String },
  idMedia: { type: Number },
  artMedia: { type: String },
  // favoriteBy: { type: Schema.type.Objectid, ref: 'User' }
  userId: { type: Schema.Types.ObjectId, ref: 'User' }
});


//stack overflow example
// var comments = new Schema({
//     user_id:  { type: Schema.Types.ObjectId, ref: 'users',required: [true,'No user id found']},
//     post: { type: Schema.Types.ObjectId, ref: 'posts',required: [true,'No post id found']}
// });

const Favorites = mongoose.model("Favorites", favoriteSchema);

module.exports = Favorites;
