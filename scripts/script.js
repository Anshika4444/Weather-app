const apiKey = '3c26ce6d7b5a5280db873e3a42d1c735';

        // Function to fetch weather data by location name
        async function fetchWeatherByLocationName(locationName) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${locationName}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                displayErrorMessage('Location not found');
            }
        }

        // Function to fetch weather data by coordinates
        async function fetchWeatherByCoordinates(latitude, longitude) {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
                displayErrorMessage('Unable to fetch weather data');
            }
        }

        // Function to display weather data
        function displayWeather(data) {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
            `;
        }

        // Function to display error message
        function displayErrorMessage(message) {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `<p>${message}</p>`;
        }

        // Function to get user's current location
        function getCurrentLocationWeather() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;
                    fetchWeatherByCoordinates(latitude, longitude);
                }, error => {
                    console.error('Error getting location:', error);
                    displayErrorMessage('Unable to retrieve location data.');
                });
            } else {
                console.error('Geolocation is not supported by this browser.');
                displayErrorMessage('Geolocation is not supported by your browser.');
            }
        }

        // Handle search form submission
        const searchForm = document.getElementById('search-form');
        searchForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const locationInput = document.getElementById('location-input');
            const locationName = locationInput.value.trim();
            if (locationName) {
                fetchWeatherByLocationName(locationName);
            } else {
                displayErrorMessage('Please enter a location');
            }
        });

        // Get the user's current location weather by default
        getCurrentLocationWeather();
