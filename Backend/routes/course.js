const express = require('express');
const { getAllCourses, getSingleCourse, fetchLectures, fetchLecture, getMyCourses } = require('../controllers/course.js');
const { isAuth } = require('../middlewares/isAuth');
const { route } = require('./user.js');
const router = express.Router();


router.get("/all", getAllCourses); // GET /api/courses/all
router.get("/:id", getSingleCourse); // GET /api/courses/:id
router.get("/:id/lectures", isAuth, fetchLectures); // GET /api/courses/:id/lectures
router.get("/:id/lectures/:lectureId", isAuth, fetchLecture); // GET /api/courses/:id/lectures/:lectureId
router.get("/:id/mycourse", isAuth, getMyCourses)

module.exports = router;