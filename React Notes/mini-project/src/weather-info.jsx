import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import SunnyIcon from "@mui/icons-material/Sunny";
import ThunderstormIcon from "@mui/icons-material/Thunderstorm";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import "./style.css";

export default function WeatherInfo({ info }) {
  return (
    <div className="card">
      <Card sx={{ maxWidth: 345 }} className="cardWidth">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={
              info && (info.temp === "-- `C" || info.city === "City Name")
                ? "https://images.unsplash.com/photo-1532178910-7815d6919875?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" // Default weather
                : info.humidity > 93
                ? "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80" // Rainy
                : info.temp > 15
                ? "https://www.altonherald.com/tindle-static/image/2025/03/09/17/21/Sunny.jpeg?width=1200&crop=16:9,smart&quality=75" // Sunny (fixed real image)
                : "https://images.unsplash.com/photo-1478719059408-592965723cbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80" // Cold
            }
            alt="Weather Image"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {info.city}
              {info && info.city === "City Name" ? (
                <ThermostatIcon />
              ) : info.humidity > 93 ? (
                <ThunderstormIcon />
              ) : info.temp > 15 ? (
                <SunnyIcon />
              ) : (
                <AcUnitIcon />
              )}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
              component={"span"}
            >
              <p>Temperature: {info.temp}&deg;C</p>
              <p>Humidity: {info.humidity}%</p>
              <p>Wind: {info.wind}km/h</p>
              <p>
                Weather of{" "}
                <b>
                  <u>{info.city}</u>
                </b>{" "}
                is{" "}
                <b>
                  <u>{info.weather}</u>
                </b>
              </p>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
