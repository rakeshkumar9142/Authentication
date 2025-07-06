const router = require('express').Router();
const User = require('../models/user.js')
const  cryptojs = require('crypto-js');  // ✅ correct import
const jwt = require('jsonwebtoken');

//REGISTER

router.post('/register', async (req,res) => {
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : cryptojs.AES.encrypt(req.body.password,process.env.PASS_SEC)
    })
 
    try {
        const savedUSer = await newUser.save();
       return res.status(201).json(savedUSer)
    } catch (error) {
      return res.status(500).json(error)
    }

})


// LOGIN

router.post('/login',async (req,res) => {
    try {
        const user = await User.findOne({username:req.body.username});
        if (!user) {
           return res.status(500).json({message : "User does not found"})
         }
        const hashedpassword = cryptojs.AES.decrypt(user.password,process.env.PASS_SEC);
        const Originalpassword  = hashedpassword.toString(cryptojs.enc.Utf8);
        if(Originalpassword != req.body.password) {
          return  res.status(500).json({message : 'Wrong password',error})
        }
 
        const accessToken = jwt.sign({
            id : user._id,
            isAdmin : user.isAdmin
        },
          process.env.JWT_SEC,
          {expiresIn : "3d"}
        );

         const {password, ...others} = user._doc
        return res.status(200).json({...others,accessToken})

    } catch (error) {
        return res.status(500).json({message : "Something is wrong during the login",error})
    }
})



module.exports = router;
