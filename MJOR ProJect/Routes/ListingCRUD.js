const Express = require('express');
const list = require('../model/list.js');
const wrapAsync = require('../utils/WrapAsync.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const {listingSchema} = require('../joiSchema.js');
const {isLoggedIn} = require('../Middleware/isAuthenticate.js');

const route = Express.Router();

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


// Index Route
route.get("/", wrapAsync(async (req, res, next) => {
    let List = await list.find({});
    res.render("./Lists/index.ejs", { List });
}));

// Create Route
route.get("/new",isLoggedIn, (req, res) => {
    res.render("./Lists/new.ejs");
});

// Add Route
route.post("/", validateListing, wrapAsync(async (req, res, next) => { // This is the Route to Add New Listing with validation
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
    req.flash("Success","New Location Added");
    res.redirect("/listing");
}));

// Edit Route
route.get("/:id/edit", isLoggedIn , wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let List = await list.findById(id);
    if (!List) {
        req.flash("error","Listing Not Found!");
        return res.redirect("/listing");
    }
    res.render("./Lists/edit.ejs", { List });
}));

// Update Route
route.patch("/:id", isLoggedIn ,validateListing, wrapAsync(async (req, res, next) => { // Paasing this Function to Validate the Data Before Updating
    if(!req.body.listing){ // This Can Check that the Listing Consists Data or not ..
        throw new CusErrHandle(400, "Please Enter the valid info")
    }
    let { id } = req.params;
    await list.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true, new: true });
// ✅ The spread operator (...) in { ...req.body.listing } is like an:
// 🔄 Object unpacker or object expander, not exactly a parser — but yes,
//  it helps convert or expand an object into individual key-value pairs inside a new object.
    req.flash("Success","Updated Successful");
    res.redirect(`/listing/${id}`);
}));

route.delete("/:id",isLoggedIn, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    await list.findByIdAndDelete(id);
    req.flash("Success","Location Deleted!");
    res.redirect("/listing");
}));

// Show Route
route.get("/:id",isLoggedIn, wrapAsync(async (req, res, next) => {
    let { id } = req.params;
    let List = await list.findById(id).populate("Reviews");
    if (!List) {
        req.flash("error","Listing Not Found!");
        return res.redirect("/listing");
    }
    res.render("./Lists/show.ejs", { List });
}));


module.exports = route;