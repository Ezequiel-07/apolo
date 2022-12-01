const config = {};
const libs_jwt = require('../libs/jsonwebtoken_config');
const user_model = require('../models/USER_MODEL');

config.in_connection = async (token, id) => {
    try {
        const decoded = await libs_jwt.verify(token);
        if(decoded == 'error unexpected'){
            return false;
        }
        const user = await user_model.findByIdAndUpdate(decoded._id, {socketId:id});
        return user;
    } catch (error) {
        return false
    }
}

config.users = async (data)=>{
    const user = await user_model.find({socketId:data});
    return user;
}

module.exports = config;