const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectToDatabase = require('./database/index.js');
const userRoutes = require('./routes/user.js');
const adminRoutes = require('./routes/admin.js');
const courseRoutes = require('./routes/course.js');
const app = express();
const paymentRoutes = require("./routes/payment.js");
const cors = require('cors');

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); //Enables cors for cross-domain requests 

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the E-Learning Platform API');
});

app.use("/uploads", express.static("uploads"))

// User Routes
app.use("/api/users", userRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/payments", paymentRoutes);

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