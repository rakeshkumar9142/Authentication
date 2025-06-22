const jwt = require('jsonwebtoken');

const verifyToekn = (req,res,next) => {
  const authHeader = req.headers.token
  if (authHeader) {
    jwt.verify(token,process.env.JWT_SEC),(err,user) => {
        if(err) return res.status(403).json("Token is not valid!");
        req.user = user
        next();
    }
  } else {
    return res.status(401).json({message : "you are not authenticated"})
  }
};

const verifyTokenAuthorization = (req,res,next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({message : "you are not allowed to do that"})
    }
}

const verifyTokenAdmin = (req,res,next) => {
    if (req.user.isAdmin) {
        next();
    } else {
        return res.status(403).json({message : "you are not allowed to do that"})
    }
}

module.exports = {verifyToekn,verifyTokenAuthorization,verifyTokenAdmin};