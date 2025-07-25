const url = "https://api.openweathermap.org/data/2.5/";
const key = "b083be043630004a1b861e68bb8924a4";

const setQuery = (e) => {
  if (e.keyCode == 13) getResult(searchBar.value);
};

const getResult = (location) => {
  let query = `${url}weather?q=${location}&appid=${key}&units=metric&lang=tr`;
  fetch(query)
    .then((weather) => weather.json())
    .then(displayResult)
    .catch((err) => console.log("Hata:", err));
};

const displayResult = (result) => {
  if (!result || result.cod !== 200) {
    alert("Şehir bulunamadı veya API hatası!");
    return;
  }
  document.querySelector(".location-icon").innerText = "📍";
  document.querySelector(
    ".location"
  ).innerHTML = `<span class="icon location-icon">📍</span>${result.name}, ${result.sys.country}`;

  document.querySelector(".temp-icon").innerText = "🌡️";
  document.querySelector(
    ".temp"
  ).innerHTML = `<span class="icon temp-icon">🌡️</span>${Math.round(
    result.main.temp
  )}°C`;

  // Açık için 'Güneşli', diğerlerinde baş harfi büyük ve uygun emoji
  let desc = result.weather[0].description;
  let descIcon = "☀️";
  if (result.weather[0].main.toLowerCase() === "clear") {
    desc = "Güneşli";
    descIcon = "☀️";
  } else if (result.weather[0].main.toLowerCase().includes("cloud")) {
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    descIcon = "☁️";
  } else if (result.weather[0].main.toLowerCase().includes("rain")) {
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    descIcon = "🌧️";
  } else {
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
    descIcon = "🌈";
  }
  document.querySelector(
    ".description"
  ).innerHTML = `<span class="icon description-icon">${descIcon}</span>${desc}`;

  document.querySelector(".humidity-icon").innerText = "💧";
  document.querySelector(
    ".humidity"
  ).innerHTML = `<span class="icon humidity-icon">💧</span>Nem: ${result.main.humidity}%`;

  document.querySelector(".wind-icon").innerText = "🌬️";
  document.querySelector(
    ".wind"
  ).innerHTML = `<span class="icon wind-icon">🌬️</span>Rüzgar: ${Math.round(
    result.wind.speed * 3.6
  )} km/h`;
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);
