const ctrl = {};
const authHelpers = require('../helpers/auth');
const libs_body = require('../libs/verify_req_body_libs');
const libs_jwt = require('../libs/jsonwebtoken_config');

ctrl.signup = async (req, res) => {
    const { description, first_name, last_name, email, password } = req.body;
    const verify_body = await libs_body.index([description, first_name, last_name, email, password]);
    if(verify_body == false){
        return res.status(400).json({error:'error somethings field of the body is empty'});
    }
    
    const result = await authHelpers.signup(description, first_name, last_name, email, password, req.file);
    if(result[1] != true){
        return res.status(400).json(result[0]);
    }

    const token = await libs_jwt.sing(result[0]);
    res.status(200).json({token: token});
}

ctrl.signin = async (req, res) => {
    const { email, password } = req.body;
    const verify_body = await libs_body.index([email, password]);
    if(verify_body == false){
        return res.status(400).json({error:'error somethings field of the body is empty'});
    }

    const result = await authHelpers.signin(email, password);
    if(result[1] != true){
        return res.status(400).json(result[0]);
    }

    const token = await libs_jwt.sing(result[0]);
    res.status(200).json({token:token});
}

ctrl.auth_validation = async (req, res) => {
    const { token } = req.body;
    const result = await libs_jwt.verify(token);
    if(result == 'error unexpected'){
        return res.status(401).json({error:'token invalid'});
    }
    res.status(200).json(true);
}

module.exports = ctrl;