//add current date and time
let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let date = now.getDate();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
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
//to transfer digits into integer if the time is e.g 1 am by adding a 0 in front
let minutes = now.getMinutes();

let updatedTime = document.querySelector("#date");
updatedTime.innerHTML = `${day} | ${month} ${date} | ${hours}:${minutes}`;

//transfer degrees between fahrenheit and celcius
//function showFahrenheit() {
//let celcius =
//let fahrenheitcalc = Math.round((`${celcius}` * 9) / 5 + 32);
//let updatefahrenheit = document.querySelector("#degreeschange");
//updatefahrenheit.innerHTML = `${fahrenheitcalc}`;
//}
//let fahrenheit = document.querySelector("#fahrenheit-link");
//fahrenheit.addEventListener("click", showFahrenheit);

//function showCelcius() {
//let updatetocelcius = document.querySelector("#degreeschange");
//updatetocelcius.innerHTML = " 🌤 22";
//}

//let celcius = document.querySelector("#celcius-link");
//celcius.addEventListener("click", showCelcius);

//added api to search function
function showTemp(response) {
  //change temp
  let temperature = Math.round(response.data.main.temp);
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
  //let wind=response.data.wind.speed;
  //let changeWind=document.querySelector("#")
  //check these lines
  // let icon = document.querySelector("#weather-icon");
  // let updatedIcon = response.data.weather[0].icon;
  //let iconUrl = `https://openweathermap.org/img/wn/${updatedIcon}@2x.png`;
  //icon.innerHTML = `${iconUrl}`;
}
//changing the name of city when searched //changing the name of city when searched then triggering to change the temp too
function search(event) {
  event.preventDefault();
  let updated = document.querySelector("#city");
  let newCity = document.querySelector("#input-city");
  updated.innerHTML = `${newCity.value}`;
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
  console.log(url);
}
function geoLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", geoLocation);
