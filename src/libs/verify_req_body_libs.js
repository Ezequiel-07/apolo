const libs = {};

libs.index = (body)=>{
    try {
        if(body == {} || body.length == 0){
            return false;
        }
        const errors = [];
        for (let x = 0; x < body.length; x++) {
            if(body[x] == '' || body[x] == undefined || body[x] == null){
                errors.push({error:'error'});
            }
        }
        if(errors.length == 0){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        console.error('error unexpected');
        return false;
    }
}
module.exports = libs;