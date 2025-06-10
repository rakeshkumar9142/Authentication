import { Router } from "express";
import passport from "passport";
import { register,login,logout,authStatus,setup2FA,verify2FA,reset2FA } from "../controllers/authController.js";

const router = Router();

// Rejistration Route
router.post('/register',register)
// Login route
router.post('/login',login)
// Auth Status Route
router.get('/status',authStatus)
// Logout Route
router.post('/logout',logout);

// 2FA setup
router.post('/2fa/setup',setup2FA);

// verify Route
router.post('/2fa/verify',verify2FA);

// Reset Route
router.post('/2fa/reset',reset2FA);

export default router;