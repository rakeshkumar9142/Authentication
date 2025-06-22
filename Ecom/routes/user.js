const { verifyToekn, verifyTokenAuthorization, verifyTokenAdmin } = require('./verifyToken');
const router = require('express').Router();
const User = require('../models/user')

router.put('/:id',verifyTokenAuthorization,async(req,res) => {
   if (req.body.password) {
    req.body.password = CryptJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
    ).toString();
   }

   try{
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set: req.body
    },{new : true});
    return res.status(200).json({updatedUser});
   } catch(err) {
    return res.status(500).json({err})
   }

})

//DELETE

router.delete('/:id',verifyTokenAuthorization,async (req,res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({message : "User has been deleted"});
    } catch (error) {
        return res.status(500).json({err})
    }
})

// GET USER

router.get('/:id',verifyTokenAndAdmin,async (req,res) => {
    try {
       const user = await User.findById(req.params.id);
        return res.status(200).json({message : "User has been deleted"});
    } catch (error) {
        return res.status(500).json({err})
    }
})

module.exports = router;