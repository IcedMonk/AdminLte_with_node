var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    lastname: String,
    username: String,
    firstname: String,
    password: String,
    email: String
});

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema);