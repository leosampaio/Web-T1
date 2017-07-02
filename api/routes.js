var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({
    foo: "bar",
    baz: "quux"
  });
});

module.exports = router;