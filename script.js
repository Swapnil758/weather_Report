function getWeather() {
    const apiKey = '3f0cb5f6a2041fd74b7735ea2a677710';
    const city = document.getElementById('city').value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Updated proxy (use /raw to get clean JSON)
    const proxy = 'https://api.allorigins.win/raw?url=';

    // Current weather fetch
    fetch(proxy + encodeURIComponent(currentUrl))
        .then(res => res.json())
        .then(weatherData => {
            if (weatherData.cod !== 200) throw new Error(weatherData.message);
            displayWeather(weatherData);
        })
        .catch(err => {
            console.error('Current weather fetch error:', err);
            alert('Could not fetch current weather.');
        });

    // Forecast fetch
    fetch(proxy + encodeURIComponent(forecastUrl))
        .then(res => res.json())
        .then(forecastData => {
            if (forecastData.cod !== "200") throw new Error(forecastData.message);
            displayHourlyForecast(forecastData.list);
        })
        .catch(err => {
            console.error('Forecast fetch error:', err);
            alert('Could not fetch forecast data.');
        });
}
