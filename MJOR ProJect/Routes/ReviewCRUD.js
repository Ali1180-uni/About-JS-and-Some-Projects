const Express = require('express');
const Review = require('../model/Review.js');
const list = require('../model/list.js');
const wrapAsync = require('../utils/WrapAsync.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const { ReviewSchema } = require('../joiSchema.js');
const { isLoggedIn, isAuther } = require('../Middleware/isAuthenticate.js');

const route = Express.Router({ mergeParams: true }); //mergeParams is used to merge and Connect the Routes From parent to Child
// >> It means its check the child route with the reference if parent route eg: /listing/:id/review/:id
// >> ab ye /review/:id is part ko bhi id hi consider krta hn is wajah se ham mergePramas use krte hn

const validateReview = (req, res, next) => { // Same as listing to Validate the Reviews
    const { error } = ReviewSchema.validate(req.body);
    if (error) {
        let errMsg = error.details.map((el) => el.message).join(","); // Join the error messages into a single string
        throw new CusErrHandle(400, errMsg);
    } else {
        next();
    }
}

route.post("/", isLoggedIn, validateReview, wrapAsync(async (req, res, next) => {
    let listing = await list.findById(req.params.id);
    let newReview = new Review(req.body.Review);
    newReview.author = req.user._id; // Assign the auther of the review to the currently logged-in user (schema uses 'auther')
    listing.Reviews.push(newReview);
    await newReview.populate('author');
    await newReview.save();
    await listing.save();
    req.flash("Success", "Review Submitted");
    res.redirect(`/listing/${listing._id}`);

}));

route.delete("/:reviewId", isLoggedIn, isAuther, wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;
    await list.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } }); // Delete the Specific Review From Listing
    await Review.findByIdAndDelete(reviewId);
    req.flash("Success", "Review Deleted");
    res.redirect(`/listing/${id}`);
}));

module.exports = route;


