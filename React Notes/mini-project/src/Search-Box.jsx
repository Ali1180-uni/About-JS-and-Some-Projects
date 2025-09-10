import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./style.css";
import { useState, useEffect } from "react";

export default function Search({ updateinfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_URL = "https://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "87a078599259a51fe4a923af3c4cb2ea";

  let setWeather = async () => {
    try {
      let response = await fetch(
        `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`
      );
      let data = await response.json();
      let weatherData = {
        temp: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        city: data.name,
        weather: data.weather[0].description,
      };
      return weatherData;
    } catch (Error) {
      console.log(Error);
      throw error;
    }
  };

  let handleChnage = (event) => {
    setCity(event.target.value);
  };

  // Inside your component:
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer); // cleanup if error changes
    }
  }, [error]);

  let prevent = async (event) => {
    try {
      event.preventDefault();
      let newInfo = await setWeather();
      updateinfo(newInfo);
      setCity("");
    } catch {
      setError(true);
    }
  };

  return (
    <div className="search">
      <h1>Let's Search for Weather</h1>
      <form onSubmit={prevent}>
        <TextField
          className="search"
          id="outlined-basic"
          label="Enter City"
          variant="outlined"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          onChange={handleChnage}
          required
        />
        <br />
        <br />
        <Button variant="contained" type="submit" className="btn">
          Search
        </Button>
      </form>
      {error && (
        <p style={{ color: "red" }}>
          There is No Such Type of Location in our Database
        </p>
      )}
    </div>
  );
}
