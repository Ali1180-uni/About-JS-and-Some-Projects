const joi = require('joi');

module.exports.listingSchema = joi.object({ // Joi schema for validating listing data -> listingSchema is a joi object
    listing: joi.object({ // Having this another object inside the listingSchema
        title: joi.string().required(), // title is a string and required
        description: joi.string().required(), // description is a string and required
        price: joi.number().required().min(0), // price is a number, required, and must be at least 0
        location: joi.string().required(),
        country: joi.string().required(),
        image: joi.string().allow("",null), // image is a string, can be empty or null
    }).required() // The listing object itself is required
});

module.exports.ReviewSchema = joi.object({
    Review: joi.object({
        comment: joi.string().required(),
        rating: joi.number().required().min(1).max(5),
    }).required()
});