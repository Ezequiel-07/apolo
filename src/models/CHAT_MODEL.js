const { Schema, model } = require('mongoose');

const chat_schema = new Schema({
    users:[{
        type: Schema.Types.ObjectId,
        required:true
    }],
    messages:[{
        type: Schema.Types.ObjectId,
        ref: 'messages_schema'
    }],
    files:[{
        type: Schema.Types.ObjectId,
        ref: 'messages_files_schema'
    }],
    date:{
        type: Date,
        default: Date.now()
    }
});

module.exports = model('chat_model', chat_schema);