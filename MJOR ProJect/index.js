const list = require('./model/list.js');
const Express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const MethodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/WrapAsync.js');
const CusErrHandle = require('./utils/CustomErrorHandler.js');
const {listingSchema} = require('./joiSchema.js');


let app = Express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "view"));

app.use(Express.static(path.join(__dirname, "public")));
app.use(Express.urlencoded({ extended: true }));
app.use(MethodOverride("_method"));
app.engine('ejs', ejsMate);


main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Hotels");
}

const validateListing = (req, res, next) => {
    // 📦 { error } is called object destructuring.
    // It’s just a short way of writing:
    
    // let result = listingSchema.validate(req.body);
    // let error = result.error;
    // So you're extracting only the error part from the result object.
    const {error} = listingSchema.validate(req.body);
    if (error) { // Check the Body Consists Data or not ..
        // If the error is present, throw a custom error with status code 400 and the error message
        let errMsg = error.details.map((el) => el.message).join(","); // Join the error messages into a single string
        throw new CusErrHandle(400, errMsg);
    }else {
        next(); // If no error, proceed to the next middleware or route handler
    }
}

app.get("/", (req, res) => {
    res.send("Connected");
});

// Index Route
app.get("/listing", wrapAsync(async (req, res, next) => {
    let List = await list.find({});
    res.render("./Lists/index.ejs", { List });
}));

// Create Route
app.get("/listing/new", (req, res) => {
    res.render("./Lists/new.ejs");
});

// Edit Route
app.get("/listing/:id/edit", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let List = await list.findById(id);
    res.render("./Lists/edit.ejs", { List });
}));

// Update Route
app.patch("/listing/:id",validateListing, wrapAsync(async (req, res, next) => { // Paasing this Function to Validate the Data Before Updating
    if(!req.body.listing){ // This Can Check that the Listing Consists Data or not ..
        throw new CusErrHandle(400, "Please Enter the valid info")
    }
    let { id } = req.params;
    await list.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true });
// ✅ The spread operator (...) in { ...req.body.listing } is like an:
// 🔄 Object unpacker or object expander, not exactly a parser — but yes,
//  it helps convert or expand an object into individual key-value pairs inside a new object.
    res.redirect(`/listing/${id}`);
}));

app.delete("/listing/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await list.findByIdAndDelete(id);
    res.redirect("/listing");
}));

// Show Route
app.get("/listing/:id", wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let List = await list.findById(id);
    res.render("./Lists/show.ejs", { List });
}));

// Add Route
app.post("/listing", validateListing, wrapAsync(async (req, res, next) => { // This is the Route to Add New Listing with validation
    // let {title,description,image,price,location,country} = req.body;
    // let List = await list.insertOne({title: title,description: description,image: image,price: price,location: location,country: country});
    // Also An Alternative method to Add Data First Make EJS File name -> listing[name/Object Key];
    // if(!req.body.listing){ // This Can Check that the Listing Consists Data or not ..
    //     throw new CusErrHandle(400, "Please Enter the valid info")
    // }
    let result = listingSchema.validate(req.body); // Validate the incoming data against the Joi schema
    if (result.error) {
        throw new CusErrHandle(400,result.error);
    }
    let newList = new list(req.body.listing); //  Affective way to Avoid The Bulky Code
    await newList.save();
    res.redirect("/listing");
}));

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