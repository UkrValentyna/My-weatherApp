function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");

  let forecastHtml = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
          <div class="data">${formatDay(forecastDay.time)}</div>
          <div class="forecast-image"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png" alt="rain" widht=10></div>
          <span class="forecast-temperature-max">${Math.round(
            forecastDay.temperature.maximum
          )}°</span> <span class="forecast-temperature-min">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
        </div>`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
  forecastHtml = forecastHtml + `</div>`;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5b9aaac066641215de6d72f73af7e9b5";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.lon}&lat=${coordinates.lat}&key=04b141339acd3f04b673o841d30107td&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let city = document.querySelector("#city");
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  city.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "5b9aaac066641215de6d72f73af7e9b5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b9aaac066641215de6d72f73af7e9b5&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#placeholder");
  search(cityInputElement.value);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let form = document.querySelector("#form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Odesa");
