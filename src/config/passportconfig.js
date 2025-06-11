import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import USer from "../models/user.js";

passport.use(
    new LocalStrategy(async(username, password, done) => {

     try {
        const user = await User.findOne({username})
        if (!user) return done(null,false,{message : "user not found"})
        const isMatch = await bcrypt.compare(password,user.password)
       if (isMatch) {
        return done(null,user)
       } else {
        return done(null,false,{message : "Incorrect password"})
       }
     } catch (error) {
        return done(error);
     }
    }
  ));

passport.serializeUser((user,done) => {
    console.log("we are inside serializeuser");
    done(null,user._id);
})

passport.deserializeUser(async(_id,done) => {
    try {
        console.log("we are inside deserializeuser");
         const user = await User.findById(_id)
         done(null,user)
    } catch (error) {
        done(error)
    }
})