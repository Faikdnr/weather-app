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
  document.querySelector(
    ".location"
  ).innerText = `${result.name}, ${result.sys.country}`;
  document.querySelector(".temp").innerText = `${Math.round(
    result.main.temp
  )}°C`;

  let desc = result.weather[0].description;
  if (result.weather[0].main.toLowerCase() === "clear") {
    desc = "Güneşli";
  } else {
    desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  }
  document.querySelector(".description").innerText = desc;

  document.querySelector(
    ".humidity"
  ).innerText = `Nem: ${result.main.humidity}%`;
  document.querySelector(".wind").innerText = `Rüzgar: ${Math.round(
    result.wind.speed * 3.6
  )} km/h`;
};

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("keypress", setQuery);
