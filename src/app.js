function formatDate(timestamp) {
  //calc date time using minute count
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

function formatForecastDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastArray = response.data.daily;
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  forecastArray.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
        <div class="forecast-day">${formatForecastDay(forecastDay.time)}</div>
        <img
          src="${forecastDay.condition.icon_url}"
          alt="${forecastDay.condition.description}"
          width="42px"
        />
        <div class="forecast-temp">
          <span class="forecast-temp-max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="forecast-temp-min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemp(response) {
  let todayTempElement = document.querySelector("#todayTemp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#todayDate");
  let iconElement = document.querySelector("#icon");

  celciusTemp = response.data.temperature.current;

  todayTempElement.innerHTML = Math.round(celciusTemp);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute("src", response.data.condition.icon_url);
  iconElement.setAttribute("alt", response.data.condition.description);

  forecastWeather(response.data.city);
}

function search(city) {
  let apiKey = "8d3005o34ffbab3ta1fb4085f9834b16";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemp);
}

function forecastWeather(city) {
  let apiKey = "8d3005o34ffbab3ta1fb4085f9834b16";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityEnteredElement = document.querySelector("#cityEntered");
  search(cityEnteredElement.value);
}

function showFarenheitTemp(event) {
  event.preventDefault();
  let todayTempElement = document.querySelector("#todayTemp");
  celciusLinkElement.classList.remove("active");
  farenheitLinkElement.classList.add("active");
  let farenhietTemp = (celciusTemp * 9) / 5 + 32;
  todayTempElement.innerHTML = Math.round(farenhietTemp);
}

function showCelciusTemp(event) {
  event.preventDefault();
  let todayTempElement = document.querySelector("#todayTemp");
  celciusLinkElement.classList.add("active");
  farenheitLinkElement.classList.remove("active");
  todayTempElement.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLinkElement = document.querySelector("#farenheitLink");
farenheitLinkElement.addEventListener("click", showFarenheitTemp);

let celciusLinkElement = document.querySelector("#celciusLink");
celciusLinkElement.addEventListener("click", showCelciusTemp);

search("London");
