const express = require('express')
const router = express.Router();
const forgotPassword = require('../controllers/forgot_password_controller.js');

router.post('/forgotPassword', forgotPassword.resetPassword);
router.post('/resetPassword',forgotPassword.newPassword);
router.post('/validPasswordToken',forgotPassword.validPasswordToken)
router.get('/token',forgotPassword.getAllToken);


module.exports=router;