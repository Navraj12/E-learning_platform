const jwt = require('jsonwebtoken');
const { User } = require('../models/User.js');

const isAuth = async(req, res, next) => {
    try {
        // Get the token from the request headers
        const token = req.headers.token;

        // If no token is provided, return an error
        if (!token) {
            return res.status(403).json({
                message: "Please login.",
            });
        }

        // Verify the token and decode its data
        const decodedData = jwt.verify(token, process.env.JWT_SEC);

        // Find the user in the database using the decoded user ID
        const user = await User.findById(decodedData._id);

        // If no user is found, return an error
        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        // Attach the user object to the request for use in the next middleware/route
        req.user = user;

        // Proceed to the next middleware/route
        next();
    } catch (error) {
        // Handle specific JWT errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Session expired. Please login again.",
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                message: "Invalid token. Please login again.",
            });
        }

        // Handle other errors
        console.error("Authentication error:", error);
        res.status(500).json({
            message: "Authentication failed. Please try again.",
        });
    }
};

module.exports = isAuth;