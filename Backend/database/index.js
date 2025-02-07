const mongoose = require('mongoose')

const ConnectionString = "mongodb+srv://awasthintr07:navraj123@cluster0.hn1sc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

async function connectTodDatabase() {
    await mongoose.connect(ConnectionString)
    console.log("Connected to DB successfully")
}

module.exports = connectTodDatabase