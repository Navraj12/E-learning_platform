const mongoose = require('mongoose')



async function connectToDatabase() {
    await mongoose.connect(process.env.DB)
    console.log("Connected to DB successfully")
}

module.exports = connectToDatabase