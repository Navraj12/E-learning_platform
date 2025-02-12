const TryCatch = require('../middlewares/TryCatch.js');
const axios = require('axios');
const { User } = require('../models/User.js');


//Initiate Payment
const initiatePayment = TryCatch(async(req, res) => {
    const { amount, courseId } = req.body;
    if (!amount || !courseId) {
        return res.status(400).json({ message: "Amount and courseId are required" });
    }

    const payload = {
        return_url: "http://localhost:5000/success",
        website_url: "http://localhost:5000",
        amount: amount * 100,
        purchase_order_name: `Course Subscription - ${courseId}`,
        purchase_order_id: courseId,
        customer_info: {
            name: req.user.name,
            email: req.user.email,
        },
    };
    try {
        const response = await axios.post(
            "https://a.khalti.com/api/v2/epayment/initiate/",
            payload, {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        res.status(200).json({
            message: "Payment initiated",
            payment_url: response.data.payment_url,
        })
    } catch (error) {
        console.error("Khalti API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "Payment initiation failed" });
    }

});

const verifyPayment = TryCatch(async(req, res) => {
    const { pidx, courseId } = req.body;
    if (!pidx || !courseId) {
        return res.status(400).json({ message: "Payment ID (pidx) and courseId are required" });
    }
    try {
        const response = await axios.post(
            "https://a.khalti.com/api/v2/epayment/lookup/", { pidx }, {
                headers: {
                    Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );
        const paymentStatus = response.data.status;
        if (paymentStatus === "Completed") {
            await User.findByIdAndUpdate(req.user._id, { $addToSet: { subscription: courseId }, });
            res.status(200).json({ message: "Payment verified and course subscribed" });
        } else {
            res.status(400).json({ message: "Payment not completed" });
        }
    } catch (error) {
        console.error("Khalti API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ message: "PAyment verification failed" });
    }
});

module.exports = { initiatePayment, verifyPayment };