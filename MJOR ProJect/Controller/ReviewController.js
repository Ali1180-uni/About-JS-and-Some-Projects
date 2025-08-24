const Review = require('../model/Review.js');
const list = require('../model/list.js');
const { ReviewSchema } = require('../joiSchema.js');

// Create Review
module.exports.NewReview = async (req, res, next) => {
    let listing = await list.findById(req.params.id);
    let newReview = new Review(req.body.Review);
    newReview.author = req.user._id; // Assign the auther of the review to the currently logged-in user (schema uses 'auther')
    listing.Reviews.push(newReview);
    await newReview.populate('author');
    await newReview.save();
    await listing.save();
    req.flash("Success", "Review Submitted");
    res.redirect(`/listing/${listing._id}`);
}

// Delete Review
module.exports.Delete = async (req, res) => {
    try{
        let { id, reviewId } = req.params;
        await list.findByIdAndUpdate(id, { $pull: { Reviews: reviewId } }); // Delete the Specific Review From Listing
        await Review.findByIdAndDelete(reviewId);
        req.flash("Success", "Review Deleted");
        res.redirect(`/listing/${id}`);
    }catch(err){
        req.flash("error",err.message);
        res.redirect(`/listing/${id}`);
    }
}