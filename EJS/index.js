const Express = require('express');
const path = require("path");
const app = Express();

let port = 3000;

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views")); // __dirname for Folder & __Filename for Files Access from anywhere

app.get("/Home",(req,res)=>{
    res.render("home.ejs");
});

app.get("/Dice",(req,res)=>{
    res.render("Dice.ejs",{DiceVal: Math.floor(Math.random() * 6) + 1});
});

let followers = ["Ali","Adil","Talha"];

app.get("/ig/:username",(req,res)=>{
    let {username} = req.params;
    res.render("ig.ejs",{username,followers});
});


app.get("/n",(req,res)=>{
    res.send("Situation is out of Control");
});

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});