
const jwt = require("jsonwebtoken");
const {JWT_SECRET}= require("../backend/routes/config")


 function authMiddleware (req,res,next){
 const Auth = req.headers.authorization

 if (!Auth || !Auth.startsWith('Bearer ')) {
    return res.status(403).json({ message : "Auth failed"});
}



try {
 const decoded = jwt.verify(token, JWT_SECRET);
req.userId= decoded.userId 
next()
}

catch(e){
    return res.status(403).json({message : "Token Verification err"})
}


}

module.exports= {authMiddleware}


