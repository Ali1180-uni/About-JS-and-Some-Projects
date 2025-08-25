const mongoose = require('mongoose');
const Review = require('./Review.js');
const { listingSchema } = require('../joiSchema');
const Schema = mongoose.Schema;

const NewList = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: "Must Visit this Location",
            required: true
        },
        image: {
            url: String,
            filename: String,

            // type: String,
            // default: "https://unsplash.com/photos/red-canoes-are-stacked-near-a-mountain-lake-yHc2gPFqJek",
            // set: (v) => v === ""
            // ? "https://unsplash.com/photos/red-canoes-are-stacked-near-a-mountain-lake-yHc2gPFqJek"
            // : v,
            // required: true
        },
        price: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        Reviews: [
            {
                type: Schema.Types.ObjectId,
                ref: "Review"
            }
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    }
);

NewList.post("findOneAndDelete", async(list)=>{
    if(list.Reviews.length){
        await Review.deleteMany({_id: {$in: list.Reviews}});
    }
});

const List = mongoose.model("List",NewList);

module.exports = List;