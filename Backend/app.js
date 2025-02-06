const express = require('express')

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('welcome to the online Learning Platform API')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`))