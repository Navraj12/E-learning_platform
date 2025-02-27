const TryCatch = require("../middlewares/TryCatch.js")

const { Course } = require("../models/Course.js");
const { Lecture } = require("../models/Lecture.js");
const { User } = require("../models/User.js");

const getAllCourses = TryCatch(async(req, res) => {
    const courses = await Course.find();
    res.json({
        courses,
    });
});

const getSingleCourse = TryCatch(async(req, res) => {
    const course = await Course.findById(req.params.id)
    res.json({
        course
    })
})


const fetchLectures = TryCatch(async(req, res) => {
    const lectures = await Lecture.find({ course: req.params.id });
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lectures });
    }
    if (!user.subscription.includes(req.params.id))
        return res.status(400).json({
            message: "You have not  subscribed to this course",
        });
    res.json({ lectures })
})
const fetchLecture = TryCatch(async(req, res) => {
    const lecture = await Lecture.find({ course: req.params.id });
    const user = await User.findById(req.user._id);

    if (user.role === "admin") {
        return res.json({ lecture });
    }
    if (!user.subscription.includes(lecture.course))
        return res.status(400).json({
            message: "You have not  subscribed to this course",
        });
    res.json({ lecture })
})

const getMyCourses = TryCatch(async(req, res) => {
    const courses = await Course.find({ _id: req.user.subscription })
    res.json({
        courses,
    })
})

module.exports = { getAllCourses, getSingleCourse, fetchLectures, fetchLecture, getMyCourses }