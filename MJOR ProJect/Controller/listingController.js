const list = require('../model/list.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const {listingSchema} = require('../joiSchema.js');

// Index Route
module.exports.index = async (req, res, next) => {
    let List = await list.find({});
    res.render("./Lists/index.ejs", { List });
}

// New Listing Route
module.exports.newList = (req, res) => {
    res.render("./Lists/new.ejs");
}

// Add New Route (POST)
module.exports.add = async (req, res, next) => { // This is the Route to Add New Listing with validation
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
    newList.owner = req.user._id; // Assign the owner of the listing to the currently logged-in user
    // The req.user._id is the ID of the user who is currently logged in,
    await newList.save();
    req.flash("Success","New Location Added");
    res.redirect("/listing");
}

// Edit Route
module.exports.Edit = async (req, res, next) => {
    let { id } = req.params;
    let List = await list.findById(id);
    if (!List) {
        req.flash("error","Listing Not Found!");
        return res.redirect("/listing");
    }
    res.render("./Lists/edit.ejs", { List });
}

// Update Route
module.exports.Update = async (req, res, next) => { // Paasing this Function to Validate the Data Before Updating
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
}

// Delete Route
module.exports.Delete = async (req, res, next) => {
    let { id } = req.params;
    await list.findByIdAndDelete(id);
    req.flash("Success","Location Deleted!");
    res.redirect("/listing");
}

// Show Route
module.exports.Show = async (req, res, next) => {
    let { id } = req.params;
    let List = await list.findById(id).populate({ path: 'Reviews', populate: { path: 'author' } }).populate("owner");
    if (!List) {
        req.flash("error","Listing Not Found!");
        return res.redirect("/listing");
    }
    res.render("./Lists/show.ejs", { List });
}