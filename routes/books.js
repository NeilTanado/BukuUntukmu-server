var express = require('express');
var router = express.Router();
const Controller = require('../controller/bookController');
const { multer, upload } = require('../middleware/upload');


router.post('/createbook', multer.single('image'), upload, Controller.createBook);

router.get('/readbook', Controller.readBook);

router.delete('/deletebook/:id', Controller.deleteBook);

router.post('/onebook',Controller.readOneBook)

module.exports = router;
