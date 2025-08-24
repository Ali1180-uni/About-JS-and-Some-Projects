const Express = require('express');
// const Review = require('../model/Review.js');
// const list = require('../model/list.js');
const wrapAsync = require('../utils/WrapAsync.js');
const CusErrHandle = require('../utils/CustomErrorHandler.js');
const { ReviewSchema } = require('../joiSchema.js');
const { isLoggedIn, isAuther } = require('../Middleware/isAuthenticate.js');
const {NewReview, Delete} = require('../Controller/ReviewController.js');

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

// New Review
route.post("/", isLoggedIn, validateReview, wrapAsync(NewReview));

// Delete Review
route.delete("/:reviewId", isLoggedIn, isAuther, wrapAsync(Delete));

module.exports = route;




// ok gpt i am facing an issue in my project basically have created a project in ejs, node & express also add mongoose and pass post so the working flow is that to add the review on a post we must be logged in so i created a delete route to delete the comment and only the autherized user can delete its comment and review and without logged in we just see the comment never delete it and only comment admin can delete it ok when i want to delete it it redirect me to login to login and then i logged in as the admin of same that comment which i want to delete previously now iam the admin but when i logged in it show me that unable to GET the specifc route