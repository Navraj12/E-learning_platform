const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
app.use(express.json())
const connectToDatabase = require('./database/index.js')



const port = process.env.PORT
app.get('/', (req, res) => {
        res.send('welcome to the E-Learning Platform API')
    })
    //importing routes
const userRoutes = require('./routes/user.js')
    //using  routes
app.use("/api/user", userRoutes);

app.listen(port, () => console.log(`server running on http://localhost:${port}`))
connectToDatabase()