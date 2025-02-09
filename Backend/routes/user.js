const express = require('express');
const { registerUser, verifyUser, loginUser, myProfile } = require('../controllers/user.js');
const isAuth = require('../middlewares/isAuth.js');

const router = express.Router();

// Middleware to validate registration input
const validateRegisterInput = (req, res, next) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json({ message: "Name, email, and password are required." });
    }

    // Simple email validation
    const emailRegex = /.+@.+\..+/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format." });
    }

    next(); // Proceed to the controller if validation passes
};

// Register route with validation middleware
router.post('/register', validateRegisterInput, registerUser);
router.post('/verify', verifyUser);
router.post('/login', loginUser);
router.get('/me', isAuth, myProfile);
module.exports = router;