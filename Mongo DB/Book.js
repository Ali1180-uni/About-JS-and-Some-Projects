let mongoose = require('mongoose');

main().then(()=> {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/book"); // Setting Database Name at here.
}

let NewBook = mongoose.Schema({
    Title: {
        type: String,
        required: true,
        max: 20, // Restrict its Title to 20 words only
    },
    Discount:{
        type: Number,
        default: 1,  // To Avoid non-Negative Value.
        min: 1, // Restricts it minimum discount length is only one Word
        max: 3,
    },
    Price: {
        type: Number,
        min: [1, "Price is too Low"],
    },
    Auther: {
        type: String,
        required: true,
    },
    genere: [String], // We can Pass it to the String of Data
    Catagory: {
        type: String,
        enum: ["Friction","Non-Friction"], // Data Must be only Friction or Non-Friction otherwise Error Occur
    }
});

let Book = mongoose.model("Book",NewBook);

// let B1 = new Book({
//     Title: "OOP",
//     Auther: "AQ Bilal",
//     Price: 123,
//     Catagory: "Non-Friction",
//     genere: ["Amazing","Funny","Action"]
// });

// B1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });


Book.findByIdAndUpdate(
    "6888b4172ab6c4a02ae01e07",
    {Price: -5},
    {runValidators: true},
).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err.errors.Price.properties.message);
});