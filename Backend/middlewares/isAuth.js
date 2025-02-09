const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');

const isAuth = async(req, res, next) => {
    try {
        const token = req.headers.token;
        if (!token)
            res.status(403).json({
                message: "please Login",
            });
        const decodeData = jwt.verify(token, process.env.JWT_SEC);

        req.user = await User.findById(decodedData._id)
        next()
    } catch (error) {
        res.status(500).json({
            message: "Login First",
        });
    }
}

module.exports = isAuth;