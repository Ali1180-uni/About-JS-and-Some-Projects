const Express = require('express');
const Review = require('../model/Review.js');
const list = require('../model/list.js');
const wrapAsync = require('../utils/WrapAsync.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const {ReviewSchema} = require('../joiSchema.js');

const route = Express.Router({mergeParams: true});

const validateReview = (req, res, next) => { // Same as listing to Validate the Reviews
    const {error} = ReviewSchema.validate(req.body);
    if (error) { 
        let errMsg = error.details.map((el) => el.message).join(","); // Join the error messages into a single string
        throw new CusErrHandle(400, errMsg);
    }else {
        next(); 
    }
}

route.post("/", validateReview, wrapAsync(async (req,res,next)=>{
    let listing = await list.findById(req.params.id);
    let newReview = new Review(req.body.Review);

    await listing.Reviews.push(newReview);

    await newReview.save();
    await listing.save();

    res.redirect(`/listing/${listing._id}`);

}));

route.delete("/:reviewId",wrapAsync(async(req,res)=>{
    let {id, reviewId}= req.params;
    await list.findByIdAndUpdate(id, {$pull: {Reviews: reviewId}}); // Delete the Specific Review From Listing
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
}));

module.exports = route;
