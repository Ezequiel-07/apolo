const { Schema, model } = require('mongoose');

const files_schema = new Schema({
    user:{
        type: String,
        required: true
    },
    img_url:{
        type: String,
        required: true
    },
    message:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = model('message_files_schema', files_schema);