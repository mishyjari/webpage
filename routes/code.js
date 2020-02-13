var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('code', { title: 'mishyJari Code || Michelle Frattaroli' });
});

module.exports = router;
