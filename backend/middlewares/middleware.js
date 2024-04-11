const { JWT_SECERT } = require("../config");
const jwt = require("jsonwebtoken");
const  authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({msg: "please check your login credentials"});
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECERT);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({});
    }
}

module.exports = { 
    authMiddleware
};