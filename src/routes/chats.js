const express = require('express');
const router = express.Router();
const multer = require('../libs/multer_config');

router.post('/test', multer.single('file'), (req, res)=>{
    console.log(req.file);
    res.json({m:'m'});
});

module.exports = router;