// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mysql = require('mysql2');
const { saveDailySummary } = require('./weather');



const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dina11',
    database: 'weather_db'
});

db.connect(err => {
    if (err) {
        console.error('Database connection error:', err);
    } else {
        console.log('Connected to database');
    }
});

// Routes
// weather.js (or your route handling file)
app.get("/", (req, res) => {
    res.send("Welcome to the Weather API");
});

app.get("/api/weather/daily-summary", (req, res) => {
    const weatherData = [
        { city: 'New Delhi', temperature: 30, humidity: 60, main_condition: 'Clear', wind_speed: 10 },
        { city: 'Mumbai', temperature: 28, humidity: 70, main_condition: 'Cloudy', wind_speed: 15 },
        { city: 'Bengaluru', temperature: 25, humidity: 65, main_condition: 'Rain', wind_speed: 8 },
        { city: 'Chennai', temperature: 32, humidity: 75, main_condition: 'Sunny', wind_speed: 12 },
        { city: 'Kolkata', temperature: 29, humidity: 80, main_condition: 'Thunderstorms', wind_speed: 20 },
    ];

    app.get('/api/weather/daily-summary', (req, res) => {
        console.log(weatherData);
        res.json(weatherData);
    });// Sending JSON response
});



    



// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
