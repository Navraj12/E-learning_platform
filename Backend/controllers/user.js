const { User } = require("../models/User.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require("../middlewares/sendMail.js"); // Fixed import

const registerUser = async(req, res) => {
    try {
        const { email, name, password } = req.body;

        // Basic input validation
        if (!email || !name || !password) {
            return res.status(400).json({
                message: "All fields (name, email, password) are required.",
            });
        }

        // Check if the user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists with this email.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user object (not saved yet)
        const newUser = {
            name,
            email,
            password: hashedPassword,
        };

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000); // Ensures it's always 6 digits

        // Create an activation token valid for 5 minutes
        const activationToken = jwt.sign({ email, otp }, // Only include necessary info
            process.env.ACTIVATION_SECRET, { expiresIn: "5m" }
        );

        // Send OTP via email
        await sendMail(email, "E-learning - Account Verification", {
            name,
            otp,
        });

        // Send success response
        res.status(200).json({
            message: "OTP sent to your email.",
            activationToken,
        });
    } catch (error) {
        console.error("Registration Error:", error); // Log for debugging
        res.status(500).json({
            message: "An error occurred during registration. Please try again.",
        });
    }
};

module.exports = { registerUser };