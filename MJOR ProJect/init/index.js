const Model = require('../model/list.js');
const mongoose = require('mongoose');
const listing = require('./init.js');

main().then(()=> {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Hotels");
}

async function dbMode() {
    await Model.deleteMany({});
    listing.Sample = listing.Sample.map((obj)=> (
        {
            ...obj,
            owner:'68a804c3c9f9cc6745163f3a'
        }
    ));
    await Model.insertMany(listing.Sample);
    console.log("Data inserted successfully");
}

dbMode().then(() => {
    console.log("Database initialized with sample data");
}).catch((err) => {
    console.error("Error initializing database:", err);
});