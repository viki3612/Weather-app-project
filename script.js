//add current date and time
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
//to transfer digits into integer if the time is e.g 1 am by adding a 0 in front
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

let updatedTime = document.querySelector("#date");
updatedTime.innerHTML = `${day} | ${month} ${date} | ${hours}:${minutes}`;

//transfer degrees between fahrenheit and celcius
function showFahrenheit(event) {
  event.preventDefault();
  let celciusElement = document.querySelector("#degrees-change");
  //remove active class from celcius link
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitCalc = Math.round((celciusTemp * 9) / 5 + 32);
  celciusElement.innerHTML = fahrenheitCalc;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
//adding a global variable that will recieve the value from the api call
let celciusTemp = null;

function showCelcius() {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let updatetocelcius = document.querySelector("#degrees-change");
  updatetocelcius.innerHTML = Math.round(celciusTemp);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);

//change temp
function showTemp(response) {
  celciusTemp = response.data.main.temp;
  let temperature = Math.round(celciusTemp);
  let changeTemp = document.querySelector("#degrees-change");
  changeTemp.innerHTML = `${temperature}`;

  //cahnge weather description
  let weatherDescription = response.data.weather[0].description;
  let updatedDescription = document.querySelector("#weather-description");
  updatedDescription.innerHTML = `${weatherDescription}`;
  //cange name of city based on geolocation
  let city = document.querySelector("#city");
  let changedCity = response.data.name;
  city.innerHTML = `${changedCity}`;
  //feels like
  let feelsLike = document.querySelector("#feels-like");
  let fetchedFeels = Math.round(response.data.main.feels_like);
  feelsLike.innerHTML = `Feels like: ${fetchedFeels}°C`;
  //humidity
  let humidity = document.querySelector("#humidity");
  let fetchedHumidity = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${fetchedHumidity}%`;
  //wind
  let wind = document.querySelector("#wind");
  let fetchedWind = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${fetchedWind}km/h`;
  //weather icon
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    ` http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
//getting the url and triggering rest of changes
function search(event) {
  event.preventDefault();
  let newCity = document.querySelector("#input-city");
  newCity.innerHTML = `${newCity.value}`;
  let apiKey = "c8b7f437a6d44cbd5a4a488b2e517d13";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity.value}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

let enterCity = document.querySelector("#search-form");
enterCity.addEventListener("submit", search);

// adding geolocation
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c8b7f437a6d44cbd5a4a488b2e517d13";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
function geoLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", geoLocation);
