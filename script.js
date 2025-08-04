const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "916fd7a47c4291c272d743b1c42dc018";
const InputBox = document.querySelector(".Input input");
const Btn = document.querySelector(".Input button");
const WetherIcon = document.querySelector(".WetherIcon");

let FetchData = async (city) => {
  let currentData = await fetch(apiUrl + city + `&appid=${apiKey}`);
  let data = await currentData.json();
  console.log(data);
  if (currentData.ok) {
    document.querySelector(".city p").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".temp h1").innerHTML = data.name;
    document.querySelector(".icon-1 h3").innerHTML = data.main.humidity + "%";
    document.querySelector(".icon-2 h3").innerHTML = data.wind.speed + "km/h";
    if (data.weather[0].main == "Clear") {
      WetherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Clouds") {
      WetherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Drizzle") {
      WetherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Rain") {
      WetherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Mist") {
      WetherIcon.src = "images/mist.png";
    }
     else if (data.weather[0].main == "Smoke") {
      WetherIcon.src = "images/snow.png";
    }
  } else {
    document.querySelector(".invalid p").style.display = "block";

    setInterval(() => {
      document.querySelector(".invalid p").style.display = "none";
    }, 2000);
    InputBox.value = "";
  }
};
Btn.addEventListener("click", () => {
  FetchData(InputBox.value);
});
// Detect Enter key anywhere in the document
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    const city = InputBox.value.trim();
    if (city !== "") {
      FetchData(city);
    } else {
      document.querySelector(".invalid p").style.display = "block";

      setTimeout(() => {
        document.querySelector(".invalid p").style.display = "none";
      }, 2000);
    }
  }
});

