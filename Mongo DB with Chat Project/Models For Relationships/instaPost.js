// --> One to Squillion Relationships

const mongoose = require("mongoose");

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ReltionPractice");
}

let CreatorSchema = new mongoose.Schema({
    Name: String,
    Age: Number
});

let Creator = mongoose.model("Creator", CreatorSchema);

let InstaPostSchema = new mongoose.Schema({
    caption: String,
    likes: Number,
    Creator:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Creator"
    }
});

let InstaPost = mongoose.model("InstaPost", InstaPostSchema);

const AddCreator = async () => {
    let creator1 = new Creator({
        Name: "Alice",
        Age: 30
    });

    let creator2 = new Creator({
        Name: "Bob",
        Age: 25
    });

    let result = await Creator.insertMany([creator1, creator2]);
    console.log(result);
}

// AddCreator();


const AddInstaPost = async () => {
    let post1 = new InstaPost({
        caption: "Beautiful sunset!",
        likes: 150
    });

    let post2 = new InstaPost({
        caption: "Delicious food!",
        likes: 200
    });

    let creator1 = await Creator.findOne({Name: "Alice"});
    let creator2 = await Creator.findOne({Name: "Bob"});

    post1.Creator = creator1;
    post2.Creator = creator1;

    let result = await InstaPost.insertMany([post1, post2]);
    console.log(result);
}

AddInstaPost();