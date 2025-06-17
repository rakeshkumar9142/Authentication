const express = require('express');
const { model } = require('mongoose');

const router = express.Router();

router.post('/signup',(req,res) => {
    res.json({message : "Signup Success"})
})

model.exports = router;