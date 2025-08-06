const Chat = require('./model/chat.js');
const Express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

let app = Express();
let port = 3000;
app.listen(port , ()=>{
    console.log(`Server is at : ${port}`);
});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));

app.use(Express.static(path.join(__dirname,"public")));
app.use(Express.urlencoded({extended: true}));
app.use(methodOverride("_method"));

main().then(()=> {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Chat");
}

app.get("/",(req,res)=>{
    res.send("Connected");
});

app.get("/chats",async (req,res)=>{
    let chats = await Chat.find();
    res.render("index.ejs",{chats});
});

app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

app.post("/chats", async (req,res) => {
    let { From, To, Msg } = req.body;
    let chats = await Chat.insertOne({From: From,To: To,Msg: Msg,Created: new Date()});
    res.redirect("/chats");
});

app.get("/chats/:id/edit", async(req,res)=>{
    let {id} = req.params;
    let Chats = await Chat.findById(id);
    res.render("edit.ejs",{Chats});
});

app.patch("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let {Msg} = req.body;
    let Chats = await Chat.findByIdAndUpdate(id,{Msg: Msg},{runValidators: true, new: true});
    res.redirect("/chats");
});

app.delete("/chats/:id", async(req,res)=>{
    let {id} = req.params;
    let Chats = await Chat.findByIdAndDelete(id);
    console.log(Chats);
    res.redirect("/chats");
})