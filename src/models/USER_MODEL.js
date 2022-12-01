const { Schema, model } = require('mongoose');

const user_schema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user_data_schema'
    },
    description: {
        type: String,
        default: 'hi, i`m new in apolo'
    },
    profile_img: {
        type: String,
        default: 'https://res.cloudinary.com/dz53t4yrm/image/upload/v1664423675/apolo/user-img_cs5sns.png'
    },
    contacts: {
        type: Schema.Types.ObjectId,
        ref: 'contacts_schema'
    },
    status:{
        type: String,
        default: 'UNVERIFIED'
    },
    socketId:{
        type:String,
        default:'0000'
    }
});

module.exports = model('user_model', user_schema);