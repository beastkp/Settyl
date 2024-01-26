const jwt = require('jsonwebtoken');
require('dotenv').config();


const auth = async (req,res,next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        console.log("NO token");
        return res.status(401).json({ error: "Unauthorized" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = {userId:payload.userId,name:payload.name};
        console.log(req.user);
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Unauthorized" });
    }
}

module.exports = auth;