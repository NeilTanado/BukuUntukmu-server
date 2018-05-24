const mongoose = require('mongoose');
const Schema = mongoose.Schema


let commentBookSchema = mongoose.Schema({
  ownerComment:{type:Schema.Types.ObjectId,ref:'user'},
  bookName:{type:Schema.Types.ObjectId,ref:'book'},
  comment: String
})

let CommentBook = mongoose.model('comment',commentBookSchema);


module.exports = CommentBook;
