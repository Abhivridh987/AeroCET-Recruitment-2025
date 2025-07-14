import React, { useState } from 'react';
import './Weather.css';
import { FaSearch } from 'react-icons/fa';

const Weather: React.FC = () => {
    const [city, setCity] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any>(null); // You can define better type later
    const [error, setError] = useState<string>('');

    const apiKey = '4ce63996ffb141b7bbd175127251107';
    const baseUrl = 'https://api.weatherapi.com/v1/current.json';

    const fetchWeather = async () => {
        if (!city.trim()) return;

        try {
            const response = await fetch(`${baseUrl}?key=${apiKey}&q=${city}`);
            const data = await response.json();
            if (data.error) {
                setError(data.error.message);
                setWeatherData(null);
            } else {
                setWeatherData(data);
                setError('');
            }
        } catch (err) {
            setError("Failed to fetch weather data.");
            setWeatherData(null);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchWeather();
        }
    };

    return (
        <div className="weather-container">
            <h2>🌤️ Weather App</h2>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={fetchWeather}>
                    <FaSearch />
                </button>
            </div>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-card">
                    <h3>{weatherData.location.name}, {weatherData.location.country}</h3>
                    <img src={weatherData.current.condition.icon} alt="weather icon" />
                    <p className="condition">{weatherData.current.condition.text}</p>
                    <p><span>🌡 Temp:</span> {weatherData.current.temp_c}°C</p>
                    <p><span>💧 Humidity:</span> {weatherData.current.humidity}%</p>
                    <p><span>💨 Wind:</span> {weatherData.current.wind_kph} kph</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
