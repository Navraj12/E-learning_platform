const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(express.json())
const connectTodDatabase = require('./database/index.js')

connectTodDatabase()

const port = process.env.PORT
app.get('/', (req, res) => {
    res.send('welcome to the E-Learning Platform API')
})


app.listen(port, () => console.log(`server running on http://localhost:${port}`))