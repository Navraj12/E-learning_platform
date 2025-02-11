const express = require('express');
const {
    isAuth,
    isAdmin
} = require('../middlewares/isAuth.js');
const { createCourse, addLectures, deleteLecture, deleteCourse, getAllStats } = require('../controllers/admin');
const { uploadFiles } = require('../middlewares/multer');
const router = express.Router();

router.post("/okay", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/:id", isAuth, isAdmin, uploadFiles, addLectures);

router.delete("/:id", isAuth, isAdmin, deleteLecture);
router.delete("/:id/deletecourse", isAuth, isAdmin, deleteCourse);
router.get("/stats", isAuth, isAdmin, getAllStats);

module.exports = router;