const express = require('express');
const router = express.Router();
const multer = require('../libs/multer_config');

const authCtrl = require('../controllers/auth');

router.post('/signup', multer.single('file'), authCtrl.signup);
router.post('/signin', authCtrl.signin);

router.post('/auth/validation', authCtrl.auth_validation);

module.exports = router;