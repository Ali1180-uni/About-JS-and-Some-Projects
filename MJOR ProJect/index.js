const Express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const MethodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const CusErrHandle = require('./utils/CustomErrorHandler.js');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportLocal = require('passport-local');
const userNew = require('./model/user.js');

const ListingCRUD = require('./Routes/ListingCRUD.js');
const ReviewCRUD = require("./Routes/ReviewCRUD.js");
const UserCRUD = require("./Routes/UserCRUD.js");


let app = Express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(MethodOverride("_method"));
app.engine('ejs', ejsMate);

const SessionOptions = {
    secret: "strong one",
    resave: false, // to avoid Warnings
    saveUninitialized: true,
    cookie:
        {
            expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // It is the Time of Expire the Cookies
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true, // Security Purpose
        }

};

app.use(session(SessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(userNew.authenticate()));

passport.serializeUser(userNew.serializeUser());
passport.deserializeUser(userNew.deserializeUser());

app.use((req,res,next)=>{
    res.locals.Success = req.flash("Success");
    res.locals.error = req.flash("error");
    next();
});

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Hotels");
}





app.use("/listing", ListingCRUD); // Jese Isme /listing sabme use ho raha tha
app.use("/listing/:id/Review", ReviewCRUD); // Jo Path Common Hoga isko Yaha likhna hn
app.use("/", UserCRUD); // Same for Users


app.all("/:any",(req,res,next)=>{  // This is the Route which Access if All other were deny and also be written at the end of the Code.
    next(new CusErrHandle(404,"Not Found !"));
});

app.use((err,req,res,next)=>{
    let {statusCode = 500, message = "Somthing went Wrong"} = err;
    res.status(statusCode).render("./Lists/error.ejs",{statusCode,message});
});

app.listen(3000, () => {
    console.log("You are Connected to Port 3000");
});



// app.get("/register",async (req,res)=>{
//     let fakeUser = new userNew({
//         email: "ali@gmail",
//         username: "Rahat",
//     });
//     let RegisterdUser = await userNew.register(fakeUser, "Ali123");
//     res.send(RegisterdUser);

//     // let RegisterdUser = await userNew.register(fakeUser, "Ali123", (err, user) => {
//         // This is the Callback Function which will be called after the User is Registered
//         // if (err) {
//             //     console.log(err);
//         //     throw new CusErrHandle(500, "Somthing Went Wrong ! Please Try Again Later");
//         // }
//         // passport.authenticate("local")(req, res, () => {
//         //     res.send("User Registered Successfully");
//         // });
//     // });
// });