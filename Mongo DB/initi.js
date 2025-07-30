const mongoose = require('mongoose');
const Chat = require('./model/chat.js');


main().then(()=> {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Connection error:', err);
});

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/Chat");
}

let NewChat = [
    {
        To: "Hashir",
        Msg: "Kidr ho Bhai",
        Created: new Date(),
        From: "Sayyam",
    },
    {
        To: "Khan",
        Msg: "Yes???",
        Created: new Date(),
        From: "Olive",
    },
    {
        To: "Pene",
        Msg: "Kilo bites are Delivered",
        Created: new Date(),
        From: "Liver",
    },
    {
        To: "Qadir",
        Msg: "Lahore Jana hn kal phr?",
        Created: new Date(),
        From: "Khan",
    },
    {
        To: "Assam",
        Msg: "Bhai ana hn aj ke fer topi krwani?",
        Created: new Date(),
        From: "Talha",
    },
    {
        To: "Talha",
        Msg: "Ki Hal a Gay",
        Created: new Date(),
        From: "Ali",
    }
];


Chat.insertMany(NewChat).then((res)=>{ // Valid Way to Insert Data With Array
    console.log(res);
}).catch((err)=>{
    console.log(err);
});


// let chat1 = new Chat(NewChat); // Invalid Way to Insert Data with the Help of Array

// chat1.save().then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });