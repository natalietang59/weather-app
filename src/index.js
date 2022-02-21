let now = new Date();

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let displayTime = document.querySelector("#time");
displayTime.innerHTML = `${day} ${hour}:${minute}`;

function showcityName(event) {
  event.preventDefault();
  let cityInput = document.querySelector(".city");
  let location = document.querySelector(".place");
  let city = `${cityInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e95dda3b842143f2a3679d55a4922fed&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let cityName = document.querySelector("#search-form");
cityName.addEventListener("submit", showcityName);

function showTemperature(response) {
  let location = document.querySelector(".place");
  location.innerHTML = `${response.data.name}`;
  let showTemp = document.querySelector(".displayTemp");
  celsiusTemp = response.data.main.temp;
  showTemp.innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#weatherIcon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=edcf3057f46d5bddac96b0cfadd71703&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener(
  "click",
  navigator.geolocation.getCurrentPosition(showPosition)
);
function displayFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector(".displayTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
function displayCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".displayTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheitLink");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsiusLink");
celsiusLink.addEventListener("click", displayCelsiusTemp);
