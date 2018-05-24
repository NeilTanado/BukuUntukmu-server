/*jshint esversion:6*/

const Book = require('../models/book');
const User = require('../models/user');
const CommentBook = require('../models/comment');
const jwt = require('jsonwebtoken');

module.exports ={

  createBook:(req,res)=>{
    var decoded = jwt.verify(req.headers.token, 'secret');
    var newBook = new Book({
      judul:req.body.judul,
      penulis: req.body.penulis,
      penerbit: req.body.penerbit,
      description:req.body.description,
      owner:decoded.id,
      image : req.file.imageURL,
    });
    newBook.save()
      .then(dataBook=>{
        User.findOneAndUpdate({_id:decoded.id},{
          $push:{
            listUlasanBuku:dataBook._id
          }
        })
        .then((value) => {
          res.status(200).json({
            message:'berhasil create question',
            value
          })
        })
        .catch((err) => {
          res.status(500).json({
            message:'gagal create ada yang salah'
          });
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'gagal create ada yang salah'
        })
      })
  },

  readBook:(req,res)=>{
    Book.find()
    .populate('owner')
    .then(data=>{
      res.status(200).json({
        message: 'data dikirim',
        data
      })
    })
    .catch((err) => {
      res.status(400).json({
        message: 'anda tidak ada authorized'
      })
    })
  },

  readOneBook:(req,res)=>{
    Book.findOne({_id : req.body.id})
    .populate('user')
    .then((value) => {
      res.status(200).json({
        message:'data dikirim',
        value
      })
    })
    .catch((err) => {
      res.status(400).json({
        message: 'anda tidak ada authorized'
      })
    })
  },

  deleteBook:(req,res)=>{
    Book.findByIdAndRemove({
      _id:req.params.id
    })
    .then(data=>{
      res.status(200).json({
        message: 'data didelete',
        data
      })
    })
    .catch((err) => {
      res.status(400).json({
        message: 'anda tidak ada authorized'
      })
    })
  }
}
