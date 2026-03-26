const input = document.getElementById("search");
const searchBtn = document.getElementById("searchBtn");
const place = document.getElementById("location");
const date = document.getElementById("date");
const icon = document.getElementById("icon");
const temp = document.getElementById("temp");
const status = document.getElementById("status");
const feels = document.getElementById("feels");
const wind = document.getElementById("wind");
const humidity = document.getElementById("humidity");

const apiKey = "dc5521d0c7b146adb07132306262603";

function clearInput() {
  input.value = "";
}
async function fetchWeather() {
  if (input.value === "") {
    alert("Please enter a location");
    return;
  }

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${input.value}&aqi=no`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    if (response.ok === false) {
      alert("Please enter a valid location");
    }
    const data = await response.json();
    console.log(data);
    place.innerHTML = data.location.name;
    date.innerHTML = data.location.localtime;
    icon.src = data.current.condition.icon;
    temp.innerHTML = `${data.current.temp_c}°C`;
    status.innerHTML = `Weather looks ${data.current.condition.text}`;
    feels.innerHTML = `Feels like ${data.current.feelslike_c}°C`;
    humidity.innerHTML = `with a ${data.current.humidity}% humidity`;
    wind.innerHTML = `Wind speed = ${data.current.wind_mph}mhp`;
  } catch (error) {
    console.log("fetch failed");
  }
  clearInput();
}

searchBtn.addEventListener("click", fetchWeather);
