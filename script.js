function getWeather() {
    const apiKey = '3f0cb5f6a2041fd74b7735ea2a677710';
    const city = document.getElementById('city').value.trim();

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    // Fetch current weather
    fetch(currentUrl)
        .then(res => res.json())
        .then(weatherData => {
            if (weatherData.cod !== 200) throw new Error(weatherData.message);
            displayWeather(weatherData);
        })
        .catch(err => {
            console.error('Current weather fetch error:', err);
            alert('Could not fetch current weather.');
        });

    // Fetch forecast
    fetch(forecastUrl)
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

function displayWeather(data) {
    const tempDiv = document.getElementById('temp-div');
    const weatherInfo = document.getElementById('weather-info');
    const icon = document.getElementById('weather-icon');

    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    tempDiv.innerHTML = `<p>${temp}°C</p>`;
    weatherInfo.textContent = description;
    icon.src = iconUrl;
    icon.style.display = 'block';
}

function displayHourlyForecast(list) {
    const forecastDiv = document.getElementById('hourly-forecast');
    forecastDiv.innerHTML = '';

    for (let i = 0; i < 8; i++) {
        const item = list[i];
        const time = new Date(item.dt * 1000).getHours();
        const temp = Math.round(item.main.temp);
        const icon = item.weather[0].icon;

        const hourly = document.createElement('div');
        hourly.className = 'hourly-item';
        hourly.innerHTML = `
            <p>${time}:00</p>
            <img src="https://openweathermap.org/img/wn/${icon}.png" alt="">
            <p>${temp}°C</p>
        `;
        forecastDiv.appendChild(hourly);
    }
}
