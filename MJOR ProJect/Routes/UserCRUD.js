const express = require('express');
const path = require('path');
const wrapAsync = require('../utils/WrapAsync.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const User = require('../model/user.js');

const Routes = express.Router();

const passportUse = require('passport');

Routes.get("/signup", (req, res) => {
    res.render("./Users/signup.ejs");
});

Routes.get("/login",(req,res)=>{
    res.render("./Users/login.ejs");
});


Routes.post("/signup", wrapAsync(async (req, res, next) => {
    try{
        let { username, email, Password } = req.body;
        let NewUser = new User({email,username});
        await User.register(NewUser,Password);
        req.flash("Success","User Registered Successful");
        res.redirect("/listing");
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

Routes.post("/login",
    passportUse.authenticate("local", {
        failureRedirect: "/login", failureFlash: true
    }),
    async(req,res)=>{
        req.flash("Success","Welcome Back to Hi Tour");
        res.redirect("/listing");
    }
);

module.exports = Routes;