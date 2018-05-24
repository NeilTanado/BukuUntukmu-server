/*jshint esversion:6*/

const CommentBook = require('../models/comment');
const Book = require('../models/book');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports ={
  createCommentBook:(req,res)=>{
    var decoded = jwt.verify(req.headers.token, 'secret');
    var newCommentBook = new CommentBook({comment:req.body.comment,owner:decoded.id,questionRoot:req.body._id});
    newCommentBook.save()
      .then(dataCommentBook=>{
        User.findOneAndUpdate({_id:decoded.id},{
          $push:{
            listTanggapanBuku:dataCommentBook._id
          }
        })
        .then((value) => {
          res.status(200).json({
            message:'berhasil push ke owner',
            value
          })
        })
        .catch((err) => {
          res.status(500).json({
            message:'gagal create di user'
          });
        })
        Book.findOneAndUpdate({_id:req.body._id},{
          $push:{
            comment:dataCommentBook._id
          }
        })
        .then((value) => {
          console.log('masuk mari');
          res.status(200).json({
            message:'berhasil masukin ke QuestionRoot'
          })
        })
        .catch((err) => {
          res.status(500).json({
            message: 'gagal create di questionroot'
          })
        })
      })
      .catch((err) => {
        res.status(500).json({
          message:'gagal create ada yang salah'
        })
      })
  },

  readCommentBook:(req,res)=>{
    CommentBook.find()
    .populate('ownerComment')
    .populate('bookName')
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

  deleteCommentBook:(req,res)=>{
    CommentBook.findByIdAndRemove({
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
