const TryCatch = require("../middlewares/TryCatch.js");
const { User } = require("../models/User.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendMail = require("../middlewares/sendMail.js");

// Register User
const registerUser = TryCatch(async(req, res) => {
    const { email, name, password } = req.body;

    // Basic input validation
    if (!email || !name || !password) {
        return res.status(400).json({
            message: "All fields (name, email, password) are required.",
        });
    }

    // Check if the user already exists
    let existingUser = await User.find({ email });
    if (existingUser) {
        return res.status(400).json({
            message: "User already exists with this email.",
        });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hashSync(password, 10);

    // Create a new user object (not saved yet)
    const newUser = {
        name,
        email,
        password: hashedPassword,
    };
    console.log(newUser)

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Ensures it's always 6 digits

    // Create an activation token valid for 5 minutes
    const activationToken = jwt.sign({ user: newUser, otp }, // Include user data and OTP
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
});

// Verify User
const verifyUser = TryCatch(async(req, res) => {
    const { otp, activationToken } = req.body;

    try {
        // Verify the activation token
        const verify = jwt.verify(activationToken, process.env.ACTIVATION_SECRET);

        // Check if the OTP matches
        if (verify.otp != otp) {
            return res.status(400).json({
                message: "Wrong OTP.",
            });
        }

        // Create the user in the database
        await User.create({
            name: verify.user.name,
            email: verify.user.email,
            password: verify.user.password,
        });

        // Send success response
        res.status(201).json({
            message: "User registered successfully.",
        });
    } catch (error) {
        // Handle token verification errors (e.g., expired or invalid token)
        if (error.name === "TokenExpiredError") {
            return res.status(400).json({
                message: "OTP expired. Please register again.",
            });
        }
        return res.status(400).json({
            message: "Invalid activation token.",
        });
    }
});

const loginUser = TryCatch(async(req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        email
    });
    console.log(user)
    if (!user)
        return res.status(400).json({

            message: "No User with this email",
        });
    const mathPassword = await bcrypt.compareSync(password, user.password);
    if (!mathPassword)
        return res.status(400).json({
            message: "wrong Password",
        });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SEC, {
        expiresIn: "15d",
    })
    res.json({
        message: `welcome back ${user.name}`,
        token,
        user
    })
})

const myProfile = TryCatch(async(req, res) => {
    const user = await User.findById(req.user._id);
    res.json({ user })
})


// Export both functions
module.exports = { registerUser, verifyUser, loginUser, myProfile };