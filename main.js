//after login (api key) = 0120919775c64637399b472bae38c8dc

//from openweathermap = api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

const weatherApi = {
  key: "0120919775c64637399b472bae38c8dc",
  baseUrl: "https://api.openweathermap.org/data/2.5/weather"
}

const searchInputBox = document.getElementById('input-box');

//Event listener function on keypress
searchInputBox.addEventListener('keypress', (event) => {
  if (event.keyCode == 13) {
    getWeatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
  }
});


//get weather report
function getWeatherReport(city) {
  fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`) //in this line,argument city is passed which will get value from input box(search box)
    //&units=metric is used to get display temp in C
    .then(weather => {
      return weather.json();
    }).then(showWeatherReport);
}

//show weather report
function showWeatherReport(weather) {
  console.log(weather);

  let city = document.getElementById('city');
  city.innerText = `${weather.name},${weather.sys.country}`;

  let temperature = document.getElementById('temp');
  temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

  let minMaxTemp = document.getElementById('min-max');
  minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

  let weatherType = document.getElementById('weather');
  weatherType.innerText = `${weather.weather[0].main}`;

  let date = document.getElementById('date');
  let todayDate = new Date();
  date.innerText = dateManage(todayDate);
  
  
  
  
  //changing background image according to type of weather
  let type=weatherType.textContent.toLowerCase();

   if(type=== 'clear') {
    document.body.style.backgroundImage = "url('images/clear.jpg')";
  }
  else if (type== 'clouds') {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  }
  else if (type== 'haze') {
    document.body.style.backgroundImage = "url('images/cloud.jpg')";
  }
  else if (type == 'rain') {
    document.body.style.backgroundImage = "url('images/rain.jpg')";
  }
  else if (type == 'snow') {
    document.body.style.backgroundImage = "url('images/snow.jpg')";
  }
  else if (type == 'thunderstorm') {
    document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
  }
  else if (type == 'sunny') {
    document.body.style.backgroundImage = "url('images/sunny.jpg')";
  }
}


//date manage
function dateManage(dateArg) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];
  let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];

  let year = dateArg.getFullYear();
  let month = months[dateArg.getMonth()];
  let date = dateArg.getDate();
  let day = days[dateArg.getDay()];

  return `${date} ${month} ${day}, ${year}`;
}