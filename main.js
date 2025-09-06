const apikey = "d115cd6d889d41109bde733f929327f0"; 
const form = document.querySelector("form");
const input = document.querySelector(".input");

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const city = input.value.trim();
  if (city === "") return;
  getWeather(city);
});

async function getWeather(city) {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      document.querySelector(".city-name").textContent = "";
      document.querySelector(".temperature").textContent = "";
      document.querySelector(".condition").textContent = data.message;
      document.body.style.background = "linear-gradient(to right, #6a11cb, #2575fc)";
      return;
    }

    
    document.querySelector(".city-name").textContent = data.name;
    document.querySelector(".temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.querySelector(".condition").textContent = `Condition: ${data.weather[0].description}`;

    
    changeBackground(data.weather[0].main);

  } catch (error) {
    console.error("Error fetching weather:", error);
    document.querySelector(".city-name").textContent = "";
    document.querySelector(".temperature").textContent = "";
    document.querySelector(".condition").textContent = "Network error!";
    document.body.style.background = "linear-gradient(to right, #6a11cb, #2575fc)";
  }
}


function changeBackground(weather) {
  const clouds = document.getElementById("clouds");
  const sun = document.getElementById("sun");
  const rain = document.getElementById("rain");
  const snow = document.getElementById("snow");

  
  clouds.style.display = "none";
  sun.style.display = "none";
  rain.style.display = "none";
  snow.style.display = "none";

  switch (weather) {
    case "Clear":
      document.body.style.background = "linear-gradient(to right, #fceabb, #f8b500)";
      sun.style.display = "block";
      break;
    case "Clouds":
      document.body.style.background = "linear-gradient(to right, #757f9a, #d7dde8)";
      clouds.style.display = "block";
      break;
    case "Rain":
      document.body.style.background = "linear-gradient(to right, #4e54c8, #8f94fb)";
      rain.style.display = "block";
      break;
    case "Snow":
      document.body.style.background = "linear-gradient(to right, #e0eafc, #cfdef3)";
      snow.style.display = "block";
      break;
    default:
      document.body.style.background = "linear-gradient(to right, #6a11cb, #2575fc)";
  }
}
