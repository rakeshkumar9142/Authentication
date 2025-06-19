const { date } = require("joi");
const transport = require("../middleware/sendMail.js");
const { signupSchema, signinSchema, acceptcodeSchema } = require("../middleware/validater");
const User = require("../models/usermodels");
const { doHash, doHashValidation, hmacProcess } = require("../utils/hashing");
const jwt = require('jsonwebtoken');
exports.signup = async(req,res) => {
    const {email,password} = req.body;
    try {
        const {error,value} = signupSchema.validate({email,password});

        if (error) {
           return res.status(401).json({success : false,message :error.details[0].message })
        }
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).json({success : false,message : "User already exists!"})
        }

        const hashedpassword = await doHash(password,12);
        const newUser = new User({
            email,
            password : hashedpassword,
        })
        const result = await newUser.save();
        result.password = undefined;
        res.status(201).json({
            success : true,
            message : "Your account has been cretaed successfully"
        })
    } catch (error) {
      console.log(error);  
    }
};


exports.signin = async(req,res) => {
    const {email,password} = req.body;
    try {
        const {error,value} = signinSchema.validate({email,password});
        if (error) {
            return res
            .status(401)
            .json({success : false,message : error.details[0].message});
        }
 
        const existingUser = await User.findOne({email}).select(`+password`);
        if (!existingUser) {
            return res
            .status(401)
            .json({success: false,message : "User does not exists"});
        } 
       const result = await doHashValidation(password,existingUser.password)
       if (!result) {
         return res
         .status(401)
         .json({success : false,message : "Invalide Credentialse"});
       } 
    
        const token = jwt.sign({
            userId : existingUser._id,
            email : existingUser.email,
            verified : existingUser.verified,
        },
        process.env.TOKEN_SECRET,
        {
            expiresIn : '8h',
        }
        );

      res.cookie('Authorization','Bearer' + token,{expires : new Date(Date.now() + 8 * 3600000),httpOnly : process.env.NODE_ENV === 'Production', secure: process.env.NODE_ENV === 'Production'}).json({
        success : true,
        token : token,
        message  :'logged in Successful'
      })

    } catch (error) {
        console.log(error);
    }
};

exports.signout = async (req,res) => {
    res.clearCookie('Authorization').status(200).json({success : true,message : "Logout Successfully"});
}

exports.sendVerificationCode = async (req,res) => {
  const {email} = req.body;
  try {
    const existingUser = await User.findOne({email})
    if (!existingUser) {
        return res 
        .status(404)
        .json({success : false, message : "User does not exists"});
    }
    if (existingUser.verified) {
        return res
        .status(400)
        .json({success:false,message : "You are already verified"})
    }

    const codeValue = Math.floor(Math.random()*1000000).toString()
    let info =await transport.sendMail({
        from : process.env.NODE_CODE_SENDING_ADDRESS,
        to : existingUser.email,
        subject : "Verification Code",
        html : `<h1>` +codeValue+ `</h1>`
    })
    
    if (info.accepted[0] === existingUser.email) {
        const hashedCodevalue = hmacProcess(codeValue,process.env.HMAC_VERIFICATION_CODE_SECRET);
        existingUser.verificationCode = hashedCodevalue;
        existingUser.verificationCodevalidation = Date.now();
        await existingUser.save()
        return res.status(200).json({success : true, message : 'code sent'})
    }
    res.status(400).json({success : false, message : 'code sent failed'})
  } catch (error) {
    console.log(error);
  }
}


exports.verifyverificationCode = async(req,res) => {
    const {email,providecode} = req.body;
    try {
        const {error,value} = acceptcodeSchema.validate({email,providecode});
        if (error) {
            return res
            .status(401)
            .json({success : false,message:error.details[0].message});

        }
        const codeValue = providecode.toString();
        const exsitingUser = await User.findOne({email}).select("+verificationCode+verificationcodeValidation");
        if (!exsitingUser) {
            return res
            .status(401)
            .json({success : false,message : "User does not exists!"});
        }
        if (exsitingUser.verified) {
            return res.status(400).json({success : false, message : "You are already verified"});
        }
        if (exsitingUser.verificationCode || !exsitingUser.verificationCodevalidation) {
            return res.status(400).json({success : false, message : "Something is wrong with the code"});
        }
        if (Date.now() - existingUser.verificationCodevalidation > 5 * 60 * 1000) {
            return res 
            .status(400)
            .json({success : false, message : "Code has been expired!"});
        }
        const haedcodeValue = hmacProcess(codeValue,process.env.HMAC_VERIFICATION_CODE_SECRET)

        if (haedcodeValue === existingUser.verificationCode)  {
            exsitingUser.verified = true;
            existingUser.verificationCode = undefined;
            existingUser.verificationCodevalidation = undefined;

            await exsitingUser.save();
  
            return res 
            .status(200)
            .json({success : true, message : "Your account has been verified"});
             
        }
        return res 
        .status(400)
        .json({success : false, message : "Unexpected occured!"});

    } catch (error) {
        console.log(error);
    }
}
