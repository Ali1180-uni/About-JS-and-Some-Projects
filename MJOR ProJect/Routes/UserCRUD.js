const express = require('express');
const path = require('path');
const wrapAsync = require('../utils/WrapAsync.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const User = require('../model/user.js');

const Routes = express.Router();

const passportUse = require('passport');
const { orignalURL } = require('../Middleware/isAuthenticate.js');

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
        const registered = await User.register(NewUser,Password);
        req.login(registered, (err) => {
        if (err) {
            return next(err);
        }
            req.flash("Success","User Registered Successful");
            res.redirect("/listing");
        });
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}));

Routes.post("/login",
    orignalURL,
    passportUse.authenticate("local", {
        failureRedirect: "/login", failureFlash: true
    }),
    async(req,res)=>{
        req.flash("Success","Welcome Back to Hi Tour");
        let urlOrg = res.locals.redirectUrl || "/listing"; // Redirect to original URL or default
        res.redirect(urlOrg); // Redirect to the original URL or listing page
    }
);


Routes.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("Success","Logged Out Successful");
        return res.redirect("/listing");
    });
});

module.exports = Routes;