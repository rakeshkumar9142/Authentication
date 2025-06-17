const express = require('express');
//const { model } = require('mongoose');
const authController = require('../controllers/authControllers.js');
const router = express.Router();

router.post('/signup',authController.signup);

module.exports = router;