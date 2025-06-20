const router = require('express').Router();
const User = require('../models/user.js')
const CryptoJs = require('crypto-js');
const { route } = require('./user.js');
//REGISTER

router.post('/register',async (req,res) => {
   const newUser = new User({
    username : req.body.username,
    email : req.body.email,
    password : CryptoJs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
   });

   try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser)
   } catch (error) {
    res.status(500).json(error)
   }

})


//LOGIN

router.post('/login',async (req,res) => {
    
  try {
    const user = await User.findOne({
        username : req.body.username
    })

    if(!user) {
        res.status(401).json({message : "wrong credentials"})
    }

    const hashedpassword = CryptoJs.AES.decrypt(user.password,process.env.PASS_SEC);
    
    const passsword = hashedpassword.toString(CryptoJs.enc.Utf8);
   
    if(passsword !== req.body.password) {
        res.status(500).json({message : "Wrong Password"})
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json(err)
  }

})

module.exports = router;