const searchBtn = document.getElementById("search");
const themeToggle = document.getElementById("theme-toggle");

// Toggle Light/Dark Mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = themeToggle.querySelector("i");
    icon.textContent = document.body.classList.contains("dark-mode") ? "dark_mode" : "light_mode";
});

// Search Button Click Event
searchBtn.addEventListener("click", () => {
    const searchInput = document.getElementById("search-input").value.trim();
    if (!searchInput) {
        displayError("Please enter a valid city name.");
        return;
    }
    fetchWeatherData(searchInput);
});

// Fetch Weather Data
async function fetchWeatherData(city) {
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
    const apiKey = "cac8b908030fa0de15bbcebf6a8ca86a";

    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            displayError("City not found. Please try again.");
        }
    } catch (error) {
        displayError("An error occurred. Please try again.");
    }
}

// Display Weather Data
function displayWeather(data) {
    document.querySelector(".error-message").classList.add("d-none");
    document.querySelector(".weather-card").classList.remove("d-none");

    const { name, sys, main, weather, wind, dt } = data;
    const date = new Date(dt * 1000);

    document.getElementById("city").textContent = name;
    document.getElementById("country").textContent = sys.country;
    document.getElementById("date-time").textContent = date.toLocaleString();
    document.getElementById("weather-degree").innerHTML = `${Math.round(main.temp)}&#8451;`;
    document.getElementById("weather-humidity").textContent = `${main.humidity}%`;
    document.getElementById("weather-wind").textContent = `${wind.speed} km/h`;
    document.getElementById("weather-status").textContent = weather[0].description;
    document.getElementById("weather-image").src = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
}

// Display Error Message
function displayError(message) {
    const errorMessage = document.querySelector(".error-message");
    errorMessage.textContent = message;
    errorMessage.classList.remove("d-none");
    document.querySelector(".weather-card").classList.add("d-none");
}
