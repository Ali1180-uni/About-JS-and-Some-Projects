const express = require('express');
const ExpressSession = require('express-session');
// const cookieParser = require('cookie-parser');
const flash = require('connect-flash'); // For Flash Messages
const path = require('path');

let app = express();

let options = {
    secret: "strong one",
    resave: false, // to avoid Warnings
    saveUninitialized: true
};

app.use(ExpressSession(options));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.SucMsg =  req.flash("Success"); // This can create a variable and no need to pass it -> SucMsg
    res.locals.ErrMsg =  req.flash("Error"); // This can create a variable and no need to pass it -> ErrMsg
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));


app.get("/req",(req,res)=>{
    let {name = "non"} = req.query;
    req.session.name = name;
    if(req.session.name === "non"){
        req.flash("Error","User Registered Failed");
    }else{
        req.flash("Success","User Registered Successful");
    }
    res.redirect("/done");
});

app.get("/done",(req,res)=>{
    res.render("practice.ejs",{name: req.session.name}) // Access with Key to show Specifc Msg
});

// app.get("/reqCount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`Count of Request to Same SessionID ${req.session.count} Times`);
// });



// app.get("/test",(req,res)=>{
//     console.log(req.signedCookies); // This can print the Signed Cookies
//     // req.session is an Object which contains the Session Data
//     console.log(req.session);
//     console.log(req.sessionID); // This is the Session ID which is sent as a Cookie to the Browser
//     console.log(req.session.cookie); // This is the Cookie Object which contains the Session ID and other properties
//     // req.session is an Object which contains the Session Data
//     // req.sessionID is the Session ID which is sent as a Cookie to the Browser
//     // req.session.cookie is the Cookie Object which contains the Session ID and other properties
//     // req.session.cookie.expires is the Expiration Date of the Cookie
//     res.send("Tested");
// });

// app.use(cookieParser("Code"));

// app.get("/",(req,res)=>{
//     res.send("This is Root");
// });

// app.get("/Signed",(req,res)=>{
//     res.cookie("Situation","Not Good",{signed: true});
//     res.send("Signed Cookies Send");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies); // This can print the Signed Cookies
//     res.send("Verfied");
// });

// app.get("/about",(req,res)=>{
//     let {Name = "Fellow", Area = "LHR"} = req.cookies; // Setting Default
//     res.send(`Hi this is: ${Name} & Area is: ${Area}`); // Extracting Name Value From Cookies otherwise Show Default
//     // Extracting Area Value From Cookies otherwise Show Default

// });

// app.get("/cookies",(req,res)=>{
//     res.cookie("Name","Ali");
//     res.cookie("Area","FSD");
//     res.send("Got Cookies");
// })

app.listen(8080, (req,res)=>{
    console.log("Connected with Practice")
});
