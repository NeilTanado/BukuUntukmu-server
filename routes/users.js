var express = require('express');
var router = express.Router();
const Controller = require('../controller/userController');


router.post('/createuser',Controller.createUser);
router.post('/login',Controller.signin);


module.exports = router;
