const mongoose = require('mongoose');
const Schema = mongoose.Schema


let bookScema = mongoose.Schema({
  owner:{type:Schema.Types.ObjectId,ref:'user'},
  comment:[{type:Schema.Types.ObjectId,ref:'answer'}],
  judul: String,
  penerbit: String,
  penulis:String,
  image:String,
  description:String
})

let Book = mongoose.model('book',bookScema);



module.exports = Book
