const searchBtn = document.querySelector('.search-btn');
const cityInput = document.querySelector('.city-input');

const cityName = document.querySelector('.city-name');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.querySelector('.humidity');
const wind = document.querySelector('.wind');

searchBtn.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city === '') {
    alert('Please enter a city name');
    return;
  }

  fetchWeather(city);
});

function fetchWeather(city) {
  const data = null;
  const xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === this.DONE) {
      try {
        const res = JSON.parse(this.responseText);
        updateWeather(res);
      } catch (error) {
        console.error("Error parsing response:", error);
        alert('Unable to fetch weather data. Try again.');
      }
    }
  });

  const url = `https://yahoo-weather5.p.rapidapi.com/weather?location=${encodeURIComponent(city)}&format=json&u=c`;
  xhr.open('GET', url);
  xhr.setRequestHeader('x-rapidapi-key', 'fca1c107efmsh677c6ae11673afep1f2de8jsn0d11b30ba272');
  xhr.setRequestHeader('x-rapidapi-host', 'yahoo-weather5.p.rapidapi.com');
  xhr.send(data);
}

function updateWeather(data) {
  if (!data || !data.location || !data.current_observation) {
    alert('Invalid city or no weather data found.');
    return;
  }

  cityName.textContent = data.location.city;
  temperature.textContent = `${data.current_observation.condition.temperature}°C`;
  description.textContent = data.current_observation.condition.text;
  humidity.textContent = `Humidity: ${data.current_observation.atmosphere.humidity}%`;
  wind.textContent = `Wind: ${data.current_observation.wind.speed} km/h`;
}
