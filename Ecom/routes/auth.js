const router = require('express').Router();
const User = require('../models/user.js')
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

//REGISTER

router.post('/register',async (req,res) => {
   const newUser = new User({
    username : req.body.username,
    email : req.body.email,
    password : CryptoJs.AES.encrypt(req.body.password,process.env.PASS_SEC).toString()
   });

   try {
    const savedUser = await newUser.save();
   return res.status(201).json(savedUser)
   } catch (error) {
   return res.status(500).json(error)
   }

})


//LOGIN

router.post('/login',async (req,res) => {
    
  try {
    const user = await User.findOne({
        username : req.body.username
    })

    if(!user) {
       return res.status(401).json({message : "wrong credentials"})
    }

    const hashedpassword = CryptoJs.AES.decrypt(user.password,process.env.PASS_SEC);
    
    const passsword = hashedpassword.toString(CryptoJs.enc.Utf8);
   
    if(passsword !== req.body.password) {
       return res.status(401).json({message : "Wrong Password"})
    }

    const accessToken = jwt.sign({
      id: user._id,
      isAdmin : user.isAdmin,
    },
    process.env.JWT_SEC,
    {expiresIn : "3d"}
    );
    return res.status(200).json({user,accessToken,message : "You are successfull logged in"})
  } catch (error) {
   return res.status(500).json(error)
  }

})

module.exports = router;