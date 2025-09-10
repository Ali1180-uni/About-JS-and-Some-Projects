import "./style.css";
import Search from "./Search-Box";
import WeatherInfo from "./weather-info";
import { useState } from "react";

function ShowWeather() {
  let [weatherinfo, setWeatherinfo] = useState({
    temp: "-- `C",
    humidity: "--",
    wind: "-- km/h",
    city: "City Name",
    weather: "Current Weather",
  });

  let updateinfo = (result) =>{
    setWeatherinfo(result)
  }

  return (
    <div>
      <Search updateinfo = {updateinfo} />
      <WeatherInfo info = {weatherinfo}/>
    </div>
  );
}

export default ShowWeather;
