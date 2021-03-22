let apiKey = "c52bf40f90a5a6e613ba93727930a589";

function getTempratureNow(response) {
  let currentTemp = document.querySelector("#temprature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
}

let currentTime = new Date();

function changeDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let currentHr = date.getHours();
  let currentMin = date.getMinutes();

  let currentDate = document.querySelector("#time");
  currentDate.innerHTML = `${currentDay} ${currentHr}:${currentMin}`;
}

changeDate(currentTime);

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", changeCityByName);

let currentGeo = document.querySelector("#current");
currentGeo.addEventListener("click", changeCityByGeo);

function changeCityByName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  doSearch(cityInput.value);
}

function doSearch(city) {
  let apiUrlbyName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlbyName).then(getTempratureNow);
}

function changeCityByGeo(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiUrlbyGeo = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlbyGeo).then(getTempratureNow);
}

function ctoF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temprature");
  //let changedTemp = Math.round((currentTemp.value * 9) / 5 + 32);
  //currentTemp.innerHTML = 68;
}

function ftoC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#temprature");
  //let changedTemp = Math.round(((currentTemp.value - 32) * 5) / 9);
  //currentTemp.innerHTML = 20;

  //let currentUnit = document.querySelector("#unit");
  //currentUnit.innerHTML = "°C";
}

let cUnit = document.querySelector("#cunit");
cUnit.addEventListener("click", ftoC);
let fUnit = document.querySelector("#funit");
fUnit.addEventListener("click", ctoF);

/*let linktoGit = document.querySelector("github-button");
linktoGit.addEventListener("click", linktoGithub);

function linktoGithub(event) {
  event.preventDefault();
  
}*/
doSearch("San Francisco"); //change the default showing-city
