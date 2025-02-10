const mongoose = require('mongoose');

const lectureSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Lecture = mongoose.model("Lecture", lectureSchema)


module.exports = { Lecture }