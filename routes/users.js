var express = require("express");
var router = express.Router();
var passport = require("passport");
var user = require("../models/user");

//The Logout Route
router.get("/logout", function(req, res){
  req.logout();
  res.redirect("/login");
});

//The Register Route
router.get("/register", function (req, res , next) {
  res.render("register");  
});


router.post("/register", function (req, res) {
  var newUser = new user({
    email: req.body.email,
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  });
  user.register(newUser, req.body.password, function (err, data) {
  if(err) {
    return res.redirect("/register");
  } else {
    passport.authenticate("local")(req, res, function () {
      res.redirect("/")
    })
  }   
  })
})
//The SignIn route
router.get("/login", (req, res) => {
  res.render("login");
});


router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function(req,res) {
});


router.post('/change-password', (req, res, next)  => {
  user.findOne(req.user._id)
  .exec((err, person) => {
    if (err) {
      console.log(err);
    } else {
      if (req.body.password === req.body.confirm) {
        person.setPassword(req.body.password, () => {
          person.save();
          console.log('password is changed successfully!');
          res.redirect('/');
        })
      } else {
        console.log('No the password is not changed');
        res.redirect('/');
      }
    }
  });
});


module.exports = router;
