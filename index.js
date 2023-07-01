function displayTemperature(response) {
  console.log(response.data.main.humidity);
  let temperatureElement = document.querySelector("#temperature");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = `${Math.round(response.data.wind.speed)}km/h`;
  humidityElement.innerHTML = `${Math.round(response.data.main.humidity)}%`;
}

let apiKey = "5b9aaac066641215de6d72f73af7e9b5";
let city = "London";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b9aaac066641215de6d72f73af7e9b5&units=metric`;
axios.get(apiUrl).then(displayTemperature);
