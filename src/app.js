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
  return `${day} ${hours} ${minutes}`;
}

function displayTemp(response) {
  console.log(response);
  console.log(response.data.temperature.current);
  let todayTempElement = document.querySelector("#todayTemp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#todayDate");
  todayTempElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
}

let apiKey = "8d3005o34ffbab3ta1fb4085f9834b16";
let apiURL = `https://api.shecodes.io/weather/v1/current?query=London&key=${apiKey}&units=metric`;

console.log(apiURL);
axios.get(apiURL).then(displayTemp);
