const mongoose = require('mongoose');

const NewList = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            default: "Must Visit this Location"
        },
        image: {
            type: String,
            default: "https://unsplash.com/photos/red-canoes-are-stacked-near-a-mountain-lake-yHc2gPFqJek",
            set: (v) => v === ""
            ? "https://unsplash.com/photos/red-canoes-are-stacked-near-a-mountain-lake-yHc2gPFqJek"
            : v
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
        }
    }
);

const List = mongoose.model("List",NewList);

module.exports = List;