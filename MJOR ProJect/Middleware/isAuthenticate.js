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

