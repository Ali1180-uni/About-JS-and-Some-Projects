const Express = require('express');
// const list = require('../model/list.js'); Used in Controller Folder
const wrapAsync = require('../utils/WrapAsync.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const {listingSchema} = require('../joiSchema.js');
const {isLoggedIn , isAdmin} = require('../Middleware/isAuthenticate.js');
const {index, newList, add, Edit, Update, Delete, Show} = require('../Controller/listingController.js'); // For Listing

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' }) // For Image Uploading temporarily in futuire we will use cloudinary or some other service

const router = Express.Router();


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

router
    .route("/")
    .get(wrapAsync(index))  // Index Route ---> router.get("/", wrapAsync(index));
    // .post(validateListing, wrapAsync(add)); // Add Route ----> router.post("/", validateListing, wrapAsync(add));
    .post( upload.single('listing[image]'), (req,res)=>{
        res.send(req.file);
    });



// Create Route
router.get("/new",isLoggedIn, newList);


// Edit Route
router.get("/:id/edit", isLoggedIn, isAdmin , wrapAsync(Edit));


router
    .route("/:id")
    .patch(isLoggedIn, isAdmin ,validateListing, wrapAsync(Update)) // Update Route ---> router.patch("/:id", isLoggedIn, isAdmin ,validateListing, wrapAsync(Update));
    .delete(isLoggedIn, isAdmin, wrapAsync(Delete)) // Delete Route ---> router.delete("/:id",isLoggedIn, isAdmin, wrapAsync(Delete));
    .get(wrapAsync(Show)); // Show Route --> router.get("/:id", wrapAsync(Show));

module.exports = router;
