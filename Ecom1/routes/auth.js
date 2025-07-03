const router = require('express').Router();
const User = require('../models/user.js')
const  cryptojs = require('crypto-js');  // ✅ correct import


//REGISTER

router.post('/register', async (req,res) => {
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : cryptojs.AES.encrypt(req.body.password,process.env.PASS_SEC)
    })
 
    try {
        const savedUSer = await newUser.save();
        res.status(201).json(savedUSer)
    } catch (error) {
       res.status(500).json(error)
    }

})


// LOGIN

router.post('/login',async (Req,res) => {
    try {
        const user = await User.findOne({username:Req.body.username});
        if (!user) {
            res.status(500).json(error)
         }
        const hashedpassword = cryptojs.AES.decrypt(user.password,this.process.env.PASS_SEC);
        const password  = hashedpassword.toString(cryptojs.enc.Utf8);
        if(password != Req.body.password) {
            res.status(500).json(error)
        }
         
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;
