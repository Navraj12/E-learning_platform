const { registerUser } = require('../controllers/user.js')

const express = require('express')

const router = express.Router();

router.post('/user/register', registerUser)


module.exports = router;