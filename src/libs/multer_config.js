const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(__dirname + '/public'),
    filename: (req, file, cb)=>{
        cb(null, new Date().getTime()/1000 + path.extname(file.originalname));
    }
})

const upload = multer({
    storage:storage
});

module.exports = upload;