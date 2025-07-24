let Express = require('express');
let app = Express();
let path = require("path");
let {v4 : uuid} = require("uuid");
let override = require("method-override");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(override("_method"));
app.use(Express.urlencoded({ extended: true }));
app.use(Express.static(path.join(__dirname, "public")));

let port = 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

let posts = [
    {
        id: uuid(),
        username: "Ali",
        content: "Iam working with web dev"
    },
    {
        id: uuid(),
        username: "Aliza",
        content: "Iam not Working"
    },
    {
        id: uuid(),
        username: "Adil",
        content: "Happy Working"
    },
];


app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});


app.post("/posts",(req,res)=>{
    let id = uuid();
    let {username,content} = req.body;
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    let post =posts.find((p)=> p.id === id);
    if(!post){
        return res.status(404).send("Post not found");
    }
    else{
        res.render("show.ejs",{post});
    }
});

app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let NewContent = req.body.content;
    let post = posts.find((p) => p.id === id);
    if (post) {
        post.content = NewContent;
        console.log(post);
        res.redirect("/posts");
    } else {
        res.status(404).send("Post not found");
    }
});

app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p) => p.id != id);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> p.id === id);
    res.render("edit.ejs",{post});
});