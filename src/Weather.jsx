import React, { useEffect, useRef, useState } from "react";
import Details from "./Details";
import iconSearch from "./assets/fa_search.png";
import maxTemp from "./assets/max-temp.png";
import minTemp from "./assets/min-temp.png";
import humidity from "./assets/humidity-1.png";
import cloudy from "./assets/Cloudy-1.png";
import wind from "./assets/wind-1.png";

function Weather() {
  const ApiKey = import.meta.env.VITE_APP_KEY;
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const Search = async (city) => {
    setError("");
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${ApiKey}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeather({
        temperature: Math.floor(data.main.temp),
        location: data.name,
        maxTemp: Math.floor(data.main.temp_max),
        minTemp: Math.floor(data.main.temp_min),
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    Search("London");
  }, []);

  return (
    <div className="weather">
      <div className="input-field">
        <input
          type="text"
          placeholder="Search Location..."
          className="search"
          ref={inputRef}
        />
        <img
          src={iconSearch}
          alt="Search Icon"
          onClick={() => Search(inputRef.current.value)}
        />
      </div>
      {error ? (
        "City not found"
      ) : (
        <>
          <h1 className="degree">
            {weather.temperature}
            <sup>0</sup>C
          </h1>
          <h2>{weather.location}</h2>

          <div className="details">
            <p>Weather Details...</p>
            <Details
              text="Max Temp"
              value={weather.maxTemp}
              img={maxTemp}
              degree={0}
            />
            <Details
              text="Min Temp"
              value={weather.minTemp}
              img={minTemp}
              degree={0}
            />
            <Details
              text="Humidity"
              value={weather.humidity}
              img={humidity}
              unit="%"
            />
            <Details
              text="Wind"
              value={weather.windSpeed}
              unit="km/h"
              img={wind}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Weather;
