const express = require("express");
const { isAuth } = require("../middlewares/isAuth.js");

const {
    initiatePayment,
    verifyPayment
} = require("../controllers/payment.js");

const router = express.Router();

//InitiatePayment
router.post("/initiate", isAuth, initiatePayment);

// Verify Payment
router.post("/verify", isAuth, verifyPayment);

module.exports = router;