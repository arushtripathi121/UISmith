const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    response: {
        type: String,
        required: true,
    },
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Session',
        required: true,
    }
})

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;