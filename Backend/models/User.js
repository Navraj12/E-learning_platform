const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: true,
        select: false // Enhances security by not returning the password in queries
    },
    role: {
        type: String,
        enum: ["user", "admin"], // Restricts roles to specific values
        default: "user"
    },
    subscription: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

const User = mongoose.model("User", schema);

module.exports = { User };