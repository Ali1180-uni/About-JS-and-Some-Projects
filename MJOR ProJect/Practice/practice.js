const express = require('express');
const cookieParser = require('cookie-parser');
let app = express();

app.use(cookieParser("Code"));

app.get("/",(req,res)=>{
    res.send("This is Root");
});

app.get("/Signed",(req,res)=>{
    res.cookie("Situation","Not Good",{signed: true});
    res.send("Signed Cookies Send");
});

app.get("/verify",(req,res)=>{
    console.log(req.signedCookies); // This can print the Signed Cookies
    res.send("Verfied");
});

app.get("/about",(req,res)=>{
    let {Name = "Fellow", Area = "LHR"} = req.cookies; // Setting Default
    res.send(`Hi this is: ${Name} & Area is: ${Area}`); // Extracting Name Value From Cookies otherwise Show Default
    // Extracting Area Value From Cookies otherwise Show Default

});

app.get("/cookies",(req,res)=>{
    res.cookie("Name","Ali");
    res.cookie("Area","FSD");
    res.send("Got Cookies");
})

app.listen(8080, (req,res)=>{
    console.log("Connected with Practice")
});