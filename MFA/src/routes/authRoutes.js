import { Router } from "express";
import passport from "passport";
import { register,
    login,
    logout,
    authStatus,
    setup2FA,
    verify2FA,
    reset2FA }
 from "../../src/controllers/authController.js";

const router = Router();

// Rejistration Route
router.post('/register',register)
// Login route
router.post('/login',passport.authenticate("local"),login)
// Auth Status Route
router.get('/status',authStatus)
// Logout Route
router.post('/logout',logout);

// 2FA setup
router.post(
    '/2fa/setup',
    (req,res,next) => {
    if (req.isAuthenticated()) return next() 
    res.status(401).json({message : "Unauthorized"})
},
setup2FA
);

// verify Route
router.post(
    '/2fa/verify',
    (req,res,next) => {
        if (req.isAuthenticated()) return next() 
        res.status(401).json({message : "Unauthorized"})
    },
    verify2FA);

// Reset Route
router.post(
    '/2fa/reset',
    (req,res,next) => {
        if (req.isAuthenticated()) return next()    
        res.status(401).json({message : "Unauthorized"})
    },
    reset2FA);

export default router;