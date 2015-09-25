var router = require('express').Router();

router.get('/', function(req, res, next) {
  res.render('test');
});

module.exports = router;
