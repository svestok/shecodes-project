function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let h1 = document.querySelector("h1");
  if (searchInput.value) {
    h1.innerHTML = `${searchInput.value}`;
  } else {
    h1.innerHTML = null;
    alert(`write a city`);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday",
];
let day = days[now.getDay()];
let hours = now.getHours();
let minutes = now.getMinutes();
let time = document.querySelector("#time");
time.innerHTML = `${day}, ${hours}:${minutes}`;

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  celsiusTemperature = response.data.main.temp;
}

function showPosition(position) {
  let apiKey = "55fa6bb8ce9106cc7e720db05b9549dd";
  let city = document.querySelector("#search-text").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
  navigator.geolocation.getCurrentPosition(showPosition);
}
let button = document.querySelector("#place");
button.addEventListener("click", showPosition);

function showFarTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function showCelTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#far");
fahrenheitLink.addEventListener("click", showFarTemp);
let celsiusLink = document.querySelector("#cel");
celsiusLink.addEventListener("click", showCelTemp);
