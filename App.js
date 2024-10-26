import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

// Register the necessary components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const App = () => {
    const [weatherData, setWeatherData] = useState([]);
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/weather/daily-summary');
                console.log(response.data);
                setWeatherData(response.data);
                setChartData({
                    labels: response.data.map(item => item.city),
                    datasets: [
                        {
                            label: 'Temperature (°C)',
                            data: response.data.map(item => item.temperature),
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: 'Humidity (%)',
                            data: response.data.map(item => item.humidity),
                            borderColor: 'rgba(255,99,132,1)',
                            borderWidth: 2,
                            fill: false,
                        }
                    ],
                });
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch weather data');
                setLoading(false);
            }
        };

        fetchWeatherData();
    }, []);

    return (
        <div>
            <h1>Weather Monitoring Dashboard</h1>
            {loading ? (
                <p>Loading weather data...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Line data={chartData} />
                    <ul>
                        {weatherData.map((item, index) => (
                            <li key={index}>
                                {item.city}: {item.temperature}°C, Humidity: {item.humidity}%,
                                Condition: {item.main_condition}, Wind Speed: {item.wind_speed} km/h
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default App;

