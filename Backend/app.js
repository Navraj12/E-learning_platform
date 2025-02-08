const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const connectToDatabase = require('./database/index.js');
const userRoutes = require('./routes/user.js');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the E-Learning Platform API');
});

// User Routes
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong!' });
    console.error(err.stack);
});

// Connect to Database and Start Server
const port = process.env.PORT;

connectToDatabase()
    .then(() => {
        app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Stop the server if DB connection fails
    });