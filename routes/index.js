var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/help', function(req, res, next) {
  res.render('help', { title: 'ajuda...' });
});

module.exports = router;
