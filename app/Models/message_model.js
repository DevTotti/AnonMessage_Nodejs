const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    }

}, {timestamps:true});

const MessageModel = mongoose.model('message', messageSchema);
module.exports = MessageModel;