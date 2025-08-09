const mongoose = require("mongoose");

main().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/ReltionPractice");
}

let userSchema = new mongoose.Schema({
    username:  String,
    Address: [
        {
            _id: false,
            location: String,
            city: String,
        }
    ]
});

let User = mongoose.model("User", userSchema);

const addUser = async () =>{
    let User1 = new User({
        username: "John Doe",
        Address: [
            {
                location: "123 Main St",
                city: "New York"
            },
        ]
    });
    User1.Address.push({location: "456 Elm St",city: "Los Angeles"})
    let newUser = await User1.save();
    console.log(newUser);
}

addUser();