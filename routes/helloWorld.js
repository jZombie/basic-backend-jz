var express = require('express');
var helloWorldCtrl = require('../controllers/helloWorldController');
var router = express.Router();

/* GET home page. */
/*router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/hello-world', helloWorldCtrl.foo);

module.exports = router;