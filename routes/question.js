var express = require('express');
var router = express.Router();

var cors = require ( 'cors' ) ;
var question_controller = require('../controllers/question');

/* GET users listing. */
router.options('/add', cors() );
router.post('/add', question_controller.execute);
module.exports = router;