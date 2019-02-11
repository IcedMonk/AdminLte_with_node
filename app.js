var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStartegy = require("passport-local");
var user = require("./models/user");
var methodOverride = require("method-override");



mongoose.connect("mongodb://localhost/work");
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


app.use(require("express-session")({
  secret: "A@a#B$b%C^c&D*d(E)e_E+f=1,2<9>/}?\|",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});



app.use(indexRouter);
app.use(usersRouter);

app.listen(process.env.PORT, function(){
  console.log("The Server Is listening at: "+ process.env.PORT);
});