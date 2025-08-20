const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passport = require('passport-local-mongoose');

const User = new Schema({
    email:{
        type: String,
        required: true
    },
});
// As we know for Authentication of User the Username and Password is also required 
// But the Passport is very powerful which automatically
//  add the Username & password Feild with Salting & Hashing

User.plugin(passport);

module.exports = mongoose.model("User", User);