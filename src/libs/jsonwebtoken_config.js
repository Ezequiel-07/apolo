const libs = {};
const jwt = require('jsonwebtoken');

libs.sing = (_id)=>{
    try {
        const token = jwt.sign({_id:_id}, process.env.JWT_SECRET, {
            expiresIn: (2*24*60*60)
        });
        return token;
    } catch (error) {
        console.error(error);
        return 'error unexpected';
    }
}
libs.verify = (token)=>{
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        return 'error unexpected';
    }
}

module.exports = libs;