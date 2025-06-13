const express = require('express');
const verifyToken = require('../middlewares/authMiddlewares.js');
const authorizerRoles = require('../middlewares/roleMiddleware.js');
const router = express.Router();

// Only admin can access this router
router.get("/admin", verifyToken, authorizerRoles("admin"),(req,res) => {
    res.json({message  : "Welcome admin"})
})

// Both admin and manager can access this router
router.get("/manager", verifyToken, authorizerRoles("admin","manager"), (req,res) => {
    res.json({message  : "Welcome Manager"})
})

// All can access this router
router.get("/user", verifyToken,authorizerRoles("admin","manager","user") ,(req,res) => {
    res.json({message  : "Welcome User"})
})

module.exports = router;