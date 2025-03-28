const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherCard = document.getElementById("weatherDisplay");
const locationName = document.getElementById("locationName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const extraInfo = document.getElementById("extraInfo");
const savedList = document.getElementById("savedList");
const themeToggle = document.getElementById("themeToggle");

let savedCities = JSON.parse(localStorage.getItem("weatherSavedCities")) || [];

function updateWeatherUI(data) {
  locationName.textContent = data.name;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherIcon.alt = data.weather[0].description;
  temperature.textContent = `${Math.round(data.main.temp)}°F`;
  description.textContent = data.weather[0].main;
  extraInfo.textContent = `Humidity: ${data.main.humidity}% | Wind: ${data.wind.speed} m/s`;
  weatherCard.classList.remove("hidden");
}

function saveCity(city) {
  if (!savedCities.includes(city)) {
    savedCities.push(city);
    localStorage.setItem("weatherSavedCities", JSON.stringify(savedCities));
    renderSavedCities();
  }
}

function renderSavedCities() {
  savedList.innerHTML = "";

  savedCities.forEach((city) => {
    const li = document.createElement("li");
    li.classList.add("saved-city");

    const span = document.createElement("span");
    span.textContent = city;
    span.style.cursor = "pointer";
    span.onclick = () => fetchWeather(city);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-saved");
    deleteBtn.onclick = () => {
      savedCities = savedCities.filter((c) => c !== city);
      localStorage.setItem("weatherSavedCities", JSON.stringify(savedCities));
      renderSavedCities(); // re-render the list
    };

    li.appendChild(span);
    li.appendChild(deleteBtn);
    savedList.appendChild(li);
  });
}

async function fetchWeather(city) {
  try {
    const data = await getWeatherByCity(city);
    updateWeatherUI(data);
    saveCity(city);
  } catch (error) {
    alert("Could not find weather for that city.");
  }
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) fetchWeather(city);
});

// 🧠 Add this to allow Enter key to submit
cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

function loadTheme() {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
  }
}

function init() {
  loadTheme();
  renderSavedCities();
}

init();