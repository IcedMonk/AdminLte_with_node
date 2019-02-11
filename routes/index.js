var express = require('express');
var router = express.Router();
var middleware = require("../middleware");


/* GET home page. */
router.get('/',middleware.isLoggedIn, function(req, res) {
  res.render('dashboard');
});


router.get('/profile',middleware.isLoggedIn, function (req, res) {
  res.render("profile");
});

module.exports = router;
