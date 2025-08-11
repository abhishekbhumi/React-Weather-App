import React, { useEffect, useState } from "react";
import "./App.css";
import CityWeatherCard from "./components/CityWeatherCard";

const App = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
 
  useEffect(() => {
  const fetchWeather = setTimeout(async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid="process.env.REACT_APP_WEATHER_API_KEY"&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      const data = await response.json();
      setWeather(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }, 1000);
   return () => clearTimeout(fetchWeather);
}, [city]);

 const handleInputChange = (e) => {
    setCity(e.target.value);
  };
  const getBackgroundColor = () => {
    if (!weather) return "#f0f0f0";
    const condition = weather.weather[0].main.toLowerCase();
    if (condition.includes("cloud")) return "#a0c4ff";
    if (condition.includes("rain")) return "#90e0ef";
    if (condition.includes("clear")) return "#ffd166";
    if (condition.includes("snow")) return "#caf0f8";
    return "#f0f0f0";
  };

  return (
    <div
      className="app"
      style={{
        backgroundColor: getBackgroundColor(),
        minHeight: "100vh",
        padding: "20px",
        transition: "background-color 0.5s ease",
      }}
    >
      <h1>🌤 Weather App</h1>
      <div>
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) =>handleInputChange(e)}
        />  
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && <CityWeatherCard weather={weather} />}
    </div>
  );
};

export default App;
