const TryCatch = require('../middlewares/TryCatch.js');
const { Course } = require('../models/Course.js');
const { Lecture } = require('../models/Lecture.js');
const { rm } = require('fs')
const { promisify } = require('util')
const fs = require('fs');
const { User } = require('../models/User.js');

const createCourse = TryCatch(async(req, res) => {
    console.log("Request Body:", req.body); // Log the request body
    console.log("Request File:", req.file); // Log the uploaded file
    const { title, description, category, createdBy, duration, price } = req.body;
    const image = req.file;

    // Validate required fields
    // if (!title || !description || !category || !createdBy || !duration || !price) {
    //     return res.status(400).json({ message: "All fields are required" });
    // }
    if (!title || !description) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Create the course
    const course = await Course.create({
        title,
        description,
        category,
        createdBy,
        image: image ? image.path : null, // Corrected optional chaining
        duration,
        price,
    });

    // Send response with the created course
    res.status(201).json({
        message: "Course Created Successfully",
        course,
    });
});


const addLectures = TryCatch(async(req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course)
        return res.status(404).json({
            message: "No COurse with this id",
        });
    const { title, description } = req.body

    const file = req.file

    const lecture = await Lecture.create({

        title,
        description,
        video: file ? file.path : file,
        course: course._id,
    });
    res.status(201).json({
        message: "Lecture Added",
        lecture
    })
})

const deleteLecture = TryCatch(async(req, res) => {
    const lecture = await Lecture.findById(req.params.id);
    rm(lecture.video, () => {
        console.log("Video deleted");
    });
    await lecture.deleteOne();
    res.json({
        message: "Lecture deleted"
    })
})
const unlinkAsync = promisify(fs.unlink)
const deleteCourse = TryCatch(async(req, res) => {
    const course = await Course.findById(req.params.id);

    if (!course) {
        return res.status(404).json({ message: "Course not found" });
    }

    // Delete all lectures associated with the course
    const lectures = await Lecture.find({ course: course._id });

    await Promise.all(
        lectures.map(async(lecture) => {
            await unlinkAsync(lecture.video); // Delete the video file
            console.log("Video deleted");
        })
    );

    // Delete the course image
    rm(course.image, () => {
        console.log("Image deleted");
    });

    // Delete all lectures associated with the course
    await Lecture.deleteMany({ course: req.params.id });

    // Delete the course
    await course.deleteOne();

    // Remove the course from users' subscriptions
    await User.updateMany({}, {
        $pull: {
            subscription: req.params.id,
        },
    });

    res.json({
        message: "Course deleted successfully",
    });
});

const getAllStats = TryCatch(async(req, res) => {
    const totalCourses = (await Course.find()).length;
    const totalLectures = (await Lecture.find()).length;
    const totalUsers = (await User.find()).length;

    const stats = {
        totalCourses,
        totalLectures,
        totalUsers,
    };
    res.json({ stats, })
})


module.exports = { createCourse, addLectures, deleteLecture, deleteCourse, getAllStats }