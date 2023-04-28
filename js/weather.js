  const API_KEY = "dd15a783ee8bd40a6464e516b2337179"; 

  function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  //console.log("Your live in " + lat + ', ' + lng); // 37.5682, 126.9977
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`;
  //console.log(url);
  
  fetch(url).then(response => response.json())
    .then(data => {
      //console.log(data.name, data.weather[0].main); // Seoul Clouds
      const weather = document.querySelector("#weather");
      const city = weather.querySelector(".city");
      const main = weather.querySelector(".main");
      const temp = weather.querySelector(".temp");
      const icon = document.createElement("img");

      city.innerText = data.name; // city name
      main.innerText = data.weather[0].main; // rain, snow, cloudy, ...
      temp.innerText = `${parseInt(data.main.temp - 273.15)}°`; // Temperature
      icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
      temp.appendChild(icon);
    });
  }

  function onGeoError() {
  console.log("Cant't you find you. No weather for you.");
  }

  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
