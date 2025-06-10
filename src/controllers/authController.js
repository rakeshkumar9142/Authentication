import bcrypt from "bcryptjs"
import User from "../models/user"
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
export const login = async (req,res) => {};
export const authStatus = async (req,res) => {};
export const logout = async (req,res) => {};
export const setup2FA = async (req,res) => {};
export const verify2FA = async (req,res) => {};
export const reset2FA = async (req,res) => {};