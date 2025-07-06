const jwt = require('jsonwebtoken');
const { use } = require('./user');

const verifytoken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader) {
      jwt.verify(token,process.env.JWT_SEC,(err,user) => {
        if(err) {
            return res.status(403).json("Token is not valide")
        } else {
            req.user = user
            next();

        }
      })
    } else {
        return res.status(401).json("You are not authenticated")
    }
}


const verifyTokenAndAuthorization = (req,res,next) => {
    verifytoken(req,res,next,() => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
          next();
        } else {
            res.status(403).json("You are not allowed to do that !")
        }
    })
}


module.exports = {verifytoken,verifyTokenAndAuthorization};