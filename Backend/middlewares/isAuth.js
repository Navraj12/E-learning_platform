const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');

const isAuth = async(req, res, next) => {
    try {
        console.log("Incoming Headers:", req.headers); // Log headers to verify

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.log("Authorization header missing.");
            return res.status(403).json({ message: "Please login." });
        }

        if (!authHeader.startsWith('Bearer ')) {
            console.log("Authorization header format incorrect.");
            return res.status(403).json({ message: "Please login." });
        }

        const token = authHeader.split(' ')[1];
        console.log("Extracted Token:", token);

        const decodedData = jwt.verify(token, process.env.JWT_SEC);
        console.log("Decoded Token:", decodedData);

        const user = await User.findById(decodedData.id || decodedData._id);
        console.log("User Found:", user);

        if (!user) {
            console.log("User not found in DB.");
            return res.status(404).json({ message: "User not found." });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please login again." });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token. Please login again." });
        }

        res.status(500).json({ message: "Authentication failed. Please try again." });
    }
};

const isAdmin = (req, res, next) => {
    try {
        if (req.user.role != "admin")
            return res.status(500).json({
                message: "You are not admin",
            });
        next();
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}

module.exports = { isAuth, isAdmin }