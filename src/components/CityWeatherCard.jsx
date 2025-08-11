import React from 'react'

export default function CityWeatherCard({ weather }) {
  return (
    <div>
        <div className="weather-card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>{Math.round(weather.main.temp)}°C</p>
          <p>{weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      
    </div>
  )
}
