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

//define forecast fnction
function getForecast(coordinates) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
//forecast function
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row row-forecast">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col col-2-edit">
    <div class="weather-forecast-day">${formatDay(forecastDay.dt)}</div>
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt="weather icon"
                    width="50"
                  />
         
                <div class="temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</div>
              <div class="temperature-min">${Math.round(
                forecastDay.temp.min
              )}°</div>
                </div>
                
                `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// formatting the timestamp
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return day;
}

//change temp
function showTemp(response) {
  celciusTemp = response.data.main.temp;
  let temperature = Math.round(celciusTemp);
  let changeTemp = document.querySelector("#degrees-change");
  changeTemp.innerHTML = `${temperature}`;
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

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

  //cal this fction that will receive the coordinates of the searched city
  getForecast(response.data.coord);
}
//getting the url and triggering rest of changes
function search(newCity) {
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}&units=metric`;

  axios.get(url).then(showTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let newCity = document.querySelector("#input-city").value;
  search(newCity);
}

let enterCity = document.querySelector("#search-form");
enterCity.addEventListener("submit", handleSubmit);

// adding geolocation
function currentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "8cac06f7ab6c10287cd06a316ff84a57";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}
function geoLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", geoLocation);

search("Porto");

//transfer degrees between fahrenheit and celcius
function showFahrenheit(event) {
  event.preventDefault();
  let celciusElement = document.querySelector("#degrees-change");
  //remove active class from celcius link
  celciusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitCalc = Math.round((celciusTemp * 9) / 5 + 32);
  console.log(celciusTemp);
  celciusElement.innerHTML = fahrenheitCalc;
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit);
//adding a global variable that will recieve the value from the api call
//let celciusTemp = null;
//making celcius link active
function showCelcius(event) {
  event.preventDefault();
  celciusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let updatetocelcius = document.querySelector("#degrees-change");
  updatetocelcius.innerHTML = Math.round(celciusTemp);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelcius);
