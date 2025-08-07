const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    From: {
        type: String,
        required: true
    },
    To: {
        type: String,
        required: true
    },
    Msg: {
        type: String,
        required: true,
        max: 50
    },
    Created: {
        type: Date,
        required: true,
    }
});


const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;