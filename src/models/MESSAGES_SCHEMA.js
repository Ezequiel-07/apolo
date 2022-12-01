const { Schema, model } = require('mongoose');

const messages_schema = new Schema({
    user:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = model('messages_schema', messages_schema);