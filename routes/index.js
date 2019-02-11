var express = require('express');
var router = express.Router();
var middleware = require("../middleware");
var user = require("../models/user");



/* GET home page. */
router.get('/',middleware.isLoggedIn, function(req, res) {
  res.render('dashboard');
});


router.get('/profile',middleware.isLoggedIn, function (req, res) {
  res.render("profile");
});

router.get('/usercrud', middleware.isLoggedIn,function (req, res) {
  user.find({}, (err, data) => {
    if (err) {
      console.log("error at finding users");
      res.redirect("/usercrud");
    } else {
      res.render('usercrud', {data: data});
    }
  });
});




module.exports = router;
