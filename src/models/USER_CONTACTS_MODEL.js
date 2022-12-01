const { Schema, model } = require('mongoose');

const contacts_schema = new Schema({
    nickname: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    profile_img: {
        type: String,
        required: true
    }
});

module.exports = model('contacts_schema', contacts_schema);