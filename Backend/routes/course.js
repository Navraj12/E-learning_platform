const express = require('express');
const { getAllCourses, getSingleCourse, fetchLectures } = require('../controllers/course.js');
const { isAuth } = require('../middlewares/isAuth');
const router = express.Router();


router.get("/all", getAllCourses);
router.get("/:id", getSingleCourse);
router.get("/:id", isAuth, fetchLectures);
module.exports = router;