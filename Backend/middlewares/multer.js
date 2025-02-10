const multer = require('multer')
const { v4: uuid } = require('uuid');
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads")
    },
    filename(req, file, cb) {
        const id = uuid();

        const extName = file.originalname.split('.').pop();

        const filename = `${id}.${extName}`;
        cb(null, filename)
    },
});


const uploadFiles = multer({ storage }).single("file")

module.exports = { uploadFiles }