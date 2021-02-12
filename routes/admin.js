var express = require('express');
var router = express.Router();

var cors = require ( 'cors' ) ;
var admin_controller = require('../controllers/admin');


router.options('/publish', cors() );
router.post('/publish', admin_controller.publish);

router.options('/refresh', cors() );
router.post('/refresh', admin_controller.refresh);

module.exports = router;