const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = './models/users.js';

const commentSchema = Schema({
  title: { type: String },
  commentedBy: { type: Schema.type.ObjectId, ref: 'User' },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now}
});

const Comments = mongoose.model("Comments", commentSchema);

module.exports = Comments;
