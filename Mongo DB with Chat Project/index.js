const Chat = require('./model/chat.js');
const Express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const CustomErr = require('./ErrorHandle.js');
const { name } = require('ejs');

let app = Express();
let port = 3000;
app.listen(port, () => {
    console.log(`Server is at : ${port}`);
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Chat");
}

app.get("/", (req, res) => {
    res.send("Connected");
});

function asyncWrap(fn) {
    return function(req,res,next) {
        fn(req,res,next).catch((err)=>{
           next(err); 
        });
    }    
}


const HandleValidationError = (err)=> {
    console.log("Please Follow the Rules of Database");
}

app.get("/chats",asyncWrap( async (req, res, next) => {
        let chats = await Chat.find();
        res.render("index.ejs", { chats });
}));

app.get("/chats/new", (req, res, next) => {
    // throw new CustomErr(404,"Page not Found");
    res.render("new.ejs");
});

app.post("/chats", asyncWrap( async (req, res, next) => {
        let { From, To, Msg } = req.body;
        let chats = await Chat.insertOne({ From: From, To: To, Msg: Msg, Created: new Date() });
        res.redirect("/chats");
}));

app.get("/chats/:id/edit", asyncWrap(async (req, res, next) => {
        let { id } = req.params;
        let Chats = await Chat.findById(id);
        if (!Chats) {
            next(new CustomErr(404, "Not Found"));
        }
        res.render("edit.ejs", { Chats });
}));

app.patch("/chats/:id", asyncWrap(async (req, res, next) => {
        let { id } = req.params;
        let { Msg } = req.body;
        let Chats = await Chat.findByIdAndUpdate(id, { Msg: Msg }, { runValidators: true, new: true });
        res.redirect("/chats");
}));

app.delete("/chats/:id", asyncWrap(async (req, res, next) => {
        let { id } = req.params;
        let Chats = await Chat.findByIdAndDelete(id);
        console.log(Chats);
        res.redirect("/chats");
}));

app.use((err, req, res, next) => {
    let { status = 500, message = "Something went Wrong" } = err;
    res.status(status).send(message);
    if(err.name === "ValidationError"){
        HandleValidationError(err);
    }
});