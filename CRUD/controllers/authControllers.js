const { signupSchema } = require("../middleware/validater");
const User = require("../models/usermodels");
exports.signup = async(req,res) => {
    const {email,password} = req.body;
    try {
        const {error,value} = signupSchema.validate({email,password});

        if (error) {
            res.status(401).json({success : false,message :error.details[0].message })
        }
        const existingUser = await User.findone
    } catch (error) {
      console.log(error);  
    }
};