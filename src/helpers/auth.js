const helpers = {};
const cloudinary = require('cloudinary');
const user_model = require('../models/USER_MODEL');
const user_data_encrypt = require('../models/USER_DATA_ENCRYPT');

helpers.signup = async ( description, first_name, last_name, email, password, file )=>{
    try {
        const errors = [];
        const verify_email = await user_data_encrypt.findOne({email:email}) || null;
        if(verify_email != null){
            errors.push({
                error: 'the email already in use'
            });
        }
        if(errors.length != 0){
            return errors;
        }
        if(password.length < 7){
            errors.push({
                error: 'password length must be greater than seven'
            });
        }
        if(errors.length != 0){
            return errors;
        }
        let result;
        if(file != undefined){
            const Imgresult = await cloudinary.v2.uploader.upload(file.path, {
                public_id:file.filename,
                folder:`apolo/${email}`,
                async: false,
                eager:[
                    { width: 400, height: 300, crop: "pad" }, 
                    { width: 260, height: 200, crop: "crop", gravity: "north"}
                ],
                eager_async: true
            });
            result = Imgresult;
        }
        const user_data = new user_data_encrypt({
            email:email,
            password:password
        });
        await user_data.save();

        const user = new user_model({
            first_name:first_name,
            last_name:last_name,
            user:user_data._id,
            description:description,
            profile_img:result.secure_url
        });
        await user.save();
        return [user._id, true];
    } catch (error) {
        console.error(error);
        return [{error: 'error unexpected'}];
    }
}

helpers.signin = async (email, password)=>{
    try {
        const error = [];
        const userFound = await user_data_encrypt.findOne({email:email, password:password});
        if(!userFound){
            error.push({error: 'User not found, try typing another email or password'});
            return error;
        }
        
        const getDataOfUser = await user_model.findOne(userFound._id);
        return [getDataOfUser._id, true];
    } catch (error) {
        console.error(error);
        return [{error: 'error unexpected'}];
    }
}

module.exports = helpers;