const TryCatch = require('../middlewares/TryCatch.js');
const { Course } = require('../models/Course.js');
const { Lecture } = require('../models/Lecture.js');

const createCourse = TryCatch(async(req, res) => {
    console.log("Request Body:", req.body); // Log the request body
    console.log("Request File:", req.file); // Log the uploaded file
    const { title, description, category, createdBy, duration, price } = req.body;
    const image = req.file;

    // Validate required fields
    if (!title || !description || !category || !createdBy || !duration || !price) {
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

module.exports = { createCourse, addLectures }