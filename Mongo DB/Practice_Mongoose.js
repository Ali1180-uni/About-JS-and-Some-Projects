let mongoose = require('mongoose');

main().then(()=> {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

const NewUser = mongoose.Schema({
    Name: String,
    Age: Number,
    Bio: String
});

const User = mongoose.model("User",NewUser);

// let user1 = new User({
//     Name: "Ali",
//     Age: 12,
//     Bio: "Good Boy"
// });


// user1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.insertMany([ // We can Pass an Arrays of Data for All the Data Feilds
//     {Name: "Shahid", Age: 34, Bio: "Jira"},
//     {Name: "Sayyam", Age: 44, Bio: "Butt"},
//     {Name: "Hashir", Age: 54, Bio: "Rana"}
// ]).then((res)=>{ // It can Insert All the Data into the collection
//     console.log(res);
// });

// User.find({}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.findOne({Age: {$lt:40}}).then((res)=>{ // Returns only one Matching Condition
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.findById("6887b58b248866dc8c7cb27a").then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });


// User.updateOne(
//     {Name: "Ali"},
//     {Name: "Ali Rehmani"}
// ).then((res)=>{
//     console.log(res)
// });


// User.updateMany(
//     {Age: {$gt: 12}},
//     {Bio: "Non Filer Persons"}
// ).then((res)=>{
//     console.log(res)
// });

// User.findOneAndUpdate(
//     {Name: "Sayyam"},
//     {Bio: "Hire me as Soon as Possible"},
//     {new: true} ).then((res)=>{  // New is True is an Option Show the Updated Value In terminal First
//     console.log(res);
// });

// User.deleteOne({Age: 12}).then((res)=>{
//     console.log(res);
// });

// User.deleteMany({}).then((res)=>{console.log(res);});
