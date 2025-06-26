import bcrypt from "bcryptjs"
import speakeasy from "speakeasy"
import qrCode from "qrcode"
import jwt from "jsonwebtoken"
import User from "../models/user.js"
import { Passport } from "passport"

export const register = async (req,res) => {

  try {
    const {username,password} = req.body
    const hashpassword = await bcrypt.hash(password,10);
    const newUser = new User({
      username,
      password: hashpassword,
      isMfaActive : false,
    });
    console.log("New user : ",newUser);
    await newUser.save();
    res.status(201).json({message : "USer Registered successfully"});
  } catch(error) {
      res.status(500).json({error : "Error registrating user",message : error})
  }

};

export const login = async (req,res) => {
  console.log("The authenticated user is",req.user);
  res.status(200).json({
    message : "user logged in successfully",
    username : req.user.username,
    isMfaActive : req.user.isMfaActive,
  });
};
export const authStatus = async (req,res) => {

  if(req.User) {
    res.status(200).json({
      message : "user logged in successfully",
    username : req.user.username,
    isMfaActive : req.user.isMfaActive,
    })
  } else {
    res.status(401).json({message : "Unauthorized user"})
  }
};
export const logout = async (req,res) => {

  if (!req.User) {
    res.status(401).json({message : "Unauthorized user"})
    req.logout((err) => {
      if(err) return res.status(400).json({message : "user not logged in"})
      res.status(200).json({message : "Logout Successfull"})
    })
  } 
};
export const setup2FA = async (req,res) => {
  try {
    console.log("The req.user is : ",req.user);
    const user = req.user;
    var secret = speakeasy.generateSecret();
    console.log("The secret object is : ",secret);
    user.twoFactorSector = secret.base32;
    user.isMfaActive = true;
    await user.save();
    const url = speakeasy.otpauthURL({
      secret: secret.base32,
      label : `${req.user.username}`,
      issuer : "www.dipeshmalvia.com",
      encoding : "base32",
    });
    const qrImageUrl = await qrCode.toDataURL(url)
    res.status(200).json({
      secret : secret.base32,
      qrCode : qrImageUrl,
    })
  } catch (error) {
    res.status(500).json({error : "Error setting up 2FA",message : error})
  }
};
export const verify2FA = async (req,res) => {

  const {token} = req.body;
  const user = req.user;

  const verified = speakeasy.totp.verify({
     secret : user.twoFactorSector,
     encoding : "base32",
     token,
  });

  if (verified) {
    const jwtToken = jwt.sign({username : user.username},
      process.env.JWT_SECRET,
      {expiresIn : "1hr"}
      );
      res.status(200).json({message : "2FA successful",token : jwtToken})
  } else {
    res.status(400).json({message : "Invalide 2FA token"})
  }
};

export const reset2FA = async (req,res) => {
  try {
    const user = req.user;
    user.twoFactorSector = "";
    user.isMfaActive = false;
    await user.save();
    res.status(200).json({message : "2FA reset successfully"});
  } catch (error) {
    res.status(500).json({error : "Error reseting 2FA", message : error})
  }
};