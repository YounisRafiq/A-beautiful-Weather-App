const apiKey = "916fd7a47c4291c272d743b1c42dc018";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const errorElement = document.getElementById("error");
    const cityName = document.getElementById("cityName");
    const temperature = document.getElementById("temperature");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");
    const weatherIcon = document.getElementById("weatherIcon");

    if (!city) {
        errorElement.textContent = "Please enter a city name.";
        return;
    }

    errorElement.textContent = "";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        humidity.textContent = `${data.main.humidity}%`;
        wind.textContent = `${Math.round(data.wind.speed)} km/h`;

        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        errorElement.textContent = error.message;
    }
}
