const { Schema, model } = require('mongoose');

const data_schema = new Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

module.exports = model('user_data_schema', data_schema);