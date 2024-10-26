// weather.js
const axios = require('axios');
const mysql = require('mysql2');

// OpenWeatherMap API details
const API_KEY = 'c595de0d3fa3084a4f159aae5f083eca';
const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'dina11',
    database: 'weather_db'
});

function convertKelvinToCelsius(tempKelvin) {
    return tempKelvin - 273.15;
}

async function fetchWeatherData() {
    const promises = cities.map(city => 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
    );

    const responses = await Promise.all(promises);
    return responses.map(response => {
        const data = response.data;
        return {
            city: data.name,
            temperature: convertKelvinToCelsius(data.main.temp),
            humidity: data.main.humidity,
            main_condition: data.weather[0].main,
            wind_speed: data.wind.speed,
            date: new Date(data.dt * 1000).toISOString()
        };
    });
}

async function saveDailySummary() {
    try {
        const weatherData = await fetchWeatherData();
        
        for (const entry of weatherData) {
            db.query('INSERT INTO daily_weather SET ?', entry, (err, results) => {
                if (err) {
                    console.error('Database insert error:', err);
                }
            });
        }
        console.log("Weather data saved successfully!");
        return weatherData;
    } catch (error) {
        console.error('Error in saveDailySummary:', error.message);
    }
}

module.exports = { saveDailySummary };
