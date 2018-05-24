var express = require('express');
var router = express.Router();
const Controller = require('../controller/commentController');


router.post('/createcomment', Controller.createCommentBook);

router.get('/readcomment', Controller.readCommentBook);

router.delete('/deletecomment/:id', Controller.deleteCommentBook);

module.exports = router;
