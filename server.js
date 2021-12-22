/**
 * @author Bhargab Nath<bhargabnath691@gmail.com>
 */

const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require('mongoose');
require('dotenv').config();

//Set up default mongoose connection
// const mongoDB = 'mongodb://localhost:27017/test';
const mongoDB = process.env.MONGODB_URL;

//Get the default connection
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
    })
  .then(() => console.log('DB connnection successful!'));

// start app
const app = express();

// Express port
const port = process.env.PORT || 5000;
// const db = process.env.DATABASE

app.use(express.json());
// CORS
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, 'client', 'build')))

// Setting up a route for our API
app.get('/api/', (req, res) => {
    return res.status(200).json({
        status: "success"
    });
});

//configure the routes
const studentRoutes = require('./routes/students');
const authRoutes = require('./routes/auth');

app.use('/api/students', studentRoutes);
app.use('/api/admin', authRoutes);

// Redirect back to index.html if urls do not match
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});