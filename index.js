let apiKey = "c52bf40f90a5a6e613ba93727930a589";

function getTempratureNow(response) {
  let currentTemp = document.querySelector("#todayTemprature");
  currentTemp.innerHTML = Math.round(response.data.main.temp);
  celTemp = Math.round(response.data.main.temp);

  let currentDescrip = document.querySelector(".description");
  currentDescrip.innerHTML = response.data.weather[0].description;

  let currentHi = document.querySelector(".hi");
  currentHi.innerHTML = `${Math.round(response.data.main.temp_max)}°`;
  let currentLow = document.querySelector(".low");
  currentLow.innerHTML = `${Math.round(response.data.main.temp_min)}°`;
  let currentFeels = document.querySelector(".feels");
  currentFeels.innerHTML = `${Math.round(response.data.main.feels_like)}°`;
  let currentHumid = document.querySelector(".humid");
  currentHumid.innerHTML = response.data.main.humidity;

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;

  let currentIcon = document.querySelector(".dicon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  doForecastCel(response.data.coord);
}

function getForecast(response) {
  let hourlyForecast = response.data.hourly;
  let displayHrForecast = document.querySelector("#hr-forecast");
  let hourlyHTML = `<div class="row mt-2">`;
  hourlyForecast.forEach(function (hrly, index) {
    if (index < 6) {
      hourlyHTML =
        hourlyHTML +
        `   
            <div class="col">
              <div class="card pt-3 px-1 border-light">
                <span class="hrlyTime">${formatTime(hrly.dt)}</span>
                <div class="cardBody">
                  <img src="http://openweathermap.org/img/wn/${
                    hrly.weather[0].icon
                  }@2x.png" class="card-img-top" alt="hourly icon">
                  <p>${Math.round(hrly.temp)}°</p>
                </div>
              </div>
            </div>
      `;
    }
  });

  hourlyHTML = hourlyHTML + `</div>`;
  displayHrForecast.innerHTML = hourlyHTML;

  let dailyForecast = response.data.daily;
  let displayDailyForecast = document.querySelector("#daily-forecast");
  let dailyHTML = `<ul class="list-group list-group-flush">`;
  dailyForecast.forEach(function (daily, index) {
    if (index < 5) {
      dailyHTML =
        dailyHTML +
        `   
            <li class="list-group-item">
            <strong>${formatDate(daily.dt)}</strong>
            <br>
            <img src="http://openweathermap.org/img/wn/${
              daily.weather[0].icon
            }@2x.png" alt="daily icon"> 
            <strong>${Math.round(daily.temp.max)}°</strong> /  ${Math.round(
          daily.temp.min
        )}° 
            </li>

        `;
    }
  });

  dailyHTML = dailyHTML + `</ul>`;
  displayDailyForecast.innerHTML = dailyHTML;
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
    "Dec"
  ];

  let currentMon = months[date.getMonth()];
  let currentDate = date.getDate();
  let currentDay = days[date.getDay()];
  let currentHr = date.getHours();
  let currentMin = date.getMinutes();

  function timeAdd0(num) {
    if (num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }
  currentHr = timeAdd0(currentHr);
  currentMin = timeAdd0(currentMin);

  let newDate = document.querySelector("#time");
  newDate.innerHTML = `${currentDay} ${currentMon}. ${currentDate} <br> Last updated at ${currentHr}:${currentMin}`;
}

changeDate(currentTime);

function formatTime(timestamp) {
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  return `${day}`;
}

let searchCity = document.querySelector("#search-form");
searchCity.addEventListener("submit", changeCityByName);

let currentGeo = document.querySelector("#current");
currentGeo.addEventListener("click", changeCityByGeo);

function changeCityByName(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  doSearchCel(cityInput.value);
}

function doSearchCel(city) {
  let apiUrlbyName = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlbyName).then(getTempratureNow);
}

function doForecastCel(coords) {
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(getForecast);
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
  cUnit.classList.remove("active");
  fUnit.classList.add("active");
  let currentTemp = document.querySelector("#todayTemprature");
  let ferTemp = Math.round((celTemp * 9) / 5 + 32);
  currentTemp.innerHTML = ferTemp;
}

function ftoC(event) {
  event.preventDefault();
  fUnit.classList.remove("active");
  cUnit.classList.add("active");
  let currentTemp = document.querySelector("#todayTemprature");
  currentTemp.innerHTML = celTemp;
}

let celTemp = null;
let cUnit = document.querySelector("#cunit");
cUnit.addEventListener("click", ftoC);
let fUnit = document.querySelector("#funit");
fUnit.addEventListener("click", ctoF);

doSearchCel("San Francisco"); //change the default showing-city
