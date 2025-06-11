import bcrypt from "bcryptjs"
import User from "../models/user.js"
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
export const setup2FA = async (req,res) => {};
export const verify2FA = async (req,res) => {};
export const reset2FA = async (req,res) => {};