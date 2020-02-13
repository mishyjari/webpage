var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('blog', { title: 'mishyJari Blog || Michelle Frattaroli' });
});

module.exports = router;
