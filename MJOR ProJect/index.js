const list = require('./model/list.js');
const Express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const MethodOverride = require('method-override');
const ejsMate = require('ejs-mate');

let app = Express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(MethodOverride("_method"));
app.engine('ejs', ejsMate);

app.listen(3000, () => {
    console.log("You are Connected to Port 3000");
});

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Hotels");
}

app.get("/", (req, res) => {
    res.send("Connected");
});

// Index Route
app.get("/listing", async (req, res) => {
    let List = await list.find({});
    res.render("./Lists/index.ejs", { List });
});

// Create Route
app.get("/listing/new", (req, res) => {
    res.render("./Lists/new.ejs");
});

// Edit Route
app.get("/listing/:id/edit", async (req, res) => {
    let { id } = req.params;
    let List = await list.findById(id);
    res.render("./Lists/edit.ejs", { List });
});

// Update Route
app.patch("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await list.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true });
    res.redirect(`/listing/${id}`);
});

app.delete("/listing/:id", async (req, res) => {
    let { id } = req.params;
    await list.findByIdAndDelete(id);
    res.redirect("/listing");
});

// Show Route
app.get("/listing/:id", async (req, res) => {
    let { id } = req.params;
    let List = await list.findById(id);
    res.render("./Lists/show.ejs", { List });
});

// Add Route
app.post("/listing", async (req, res) => {
    // let {title,description,image,price,location,country} = req.body;
    // let List = await list.insertOne({title: title,description: description,image: image,price: price,location: location,country: country});
    // Also An Alternative method to Add Data First Make EJS File name -> listing[name];
    let newList = new list(req.body.listing); //  Affective way to Avoid The Bulky Code
    await newList.save();
    res.redirect("/listing");
});


