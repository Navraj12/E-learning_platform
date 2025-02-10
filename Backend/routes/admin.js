const express = require('express');
const {
    isAuth,
    isAdmin
} = require('../middlewares/isAuth.js');
const { createCourse, addLectures } = require('../controllers/admin');
const { uploadFiles } = require('../middlewares/multer');
const router = express.Router();

router.post("/okay", isAuth, isAdmin, uploadFiles, createCourse);
router.post("/:id", isAuth, isAdmin, uploadFiles, addLectures);

module.exports = router;