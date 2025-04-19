const apiKey    = '3f0cb5f6a2041fd74b7735ea2a677710';
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name.");
    }
});

async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    console.log("Fetching weather from:", url); // Debug log

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API response:", response.status, data); // Debug log

        if (response.ok) {
            const temp = data.main.temp;
            alert(`Current temperature in ${city}: ${temp}°C`);
        } else {
            alert(`Error: ${data.message || "Could not fetch current weather."}`);
        }
    } catch (error) {
        console.error("Network or fetch error:", error);
        alert("Error fetching weather data. Please check console for details.");
    }
}
