const list = require('../model/list.js');
const Review = require('../model/Review.js');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl; // Store the original URL to redirect after login
        req.flash("error", "Please Login First");
        return res.redirect("/login");
    }
    next();
}


module.exports.orignalURL = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl; // Make the redirect URL available in the response locals
    }
    next();
}


module.exports.isAdmin = async (req, res, next) => {
    let { id } = req.params;
    let List = await list.findById(id);
    if (!List) {
        req.flash("error", "Listing not found");
        return res.redirect("/listing");
    }
    const ownerId = String(List.owner);
    const currUserId = String(req.user && req.user._id);
    if (ownerId !== currUserId) { // Check if the logged-in user is the owner of the listing
        req.flash("error", "You do not have permission to perform this action");
        return res.redirect(`/listing/${id}`); // return is important so next() is not executed
    }
    next();
}

module.exports.isAuther = async (req, res, next) => {
    let {id, reviewId}= req.params;
    let currReview = await Review.findById(reviewId);
    if (!currReview) {
        req.flash("error", "Review not found");
        return res.redirect(`/listing/${id}`);
    }
    const reviewAuthorId = String(currReview.author);
    const currUserId2 = String(req.user && req.user._id);
    if (reviewAuthorId !== currUserId2) { // Check if the logged-in user is the author of the review
        req.flash("error", "You do not have permission to perform this action");
        return res.redirect(`/listing/${id}`); // return is important so next() is not executed
    }
    next();
}
