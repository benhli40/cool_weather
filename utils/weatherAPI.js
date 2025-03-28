// utils/weatherAPI.js
async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=imperial`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("City not found");
  return await res.json();
}