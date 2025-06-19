const express = require('express');
//const { model } = require('mongoose');
const authController = require('../controllers/authControllers.js');
const router = express.Router();

router.post('/signup',authController.signup);
router.post('/signin',authController.signin);
router.post('/signout',authController.signout);

router.patch('/send-verification-code',authController.sendVerificationCode);
router.patch(
    '/verify-verification-code',
    authController.verifyverificationCode
    ); 
module.exports = router;
