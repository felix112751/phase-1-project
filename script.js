
    // DOM Elements
    const searchButton = document.querySelector('.search button');
    const searchInput = document.querySelector('.search input');
    const cityTitle = document.querySelector('.city');
    const tempElement = document.querySelector('.temp');
    const descriptionElement = document.querySelector('.description');
    const humidityElement = document.querySelector('.humidity');
    const windElement = document.querySelector('.wind');
    const uvIndexElement = document.querySelector('.Uv.index');
    const iconElement = document.querySelector('.icon');
  
    // Event listener for search button click
    searchButton.addEventListener('click', function () {
      const searchQuery = searchInput.value.trim();
      if (searchQuery !== '') {
        getWeatherData(searchQuery);
      } else {
        alert('Please enter a valid city name');
      }
    });
  
    // Fetchs weather data from JSON
    async function getWeatherData(city) {
      try {
        const response = await fetch('db.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const cityData = data.counties.find(item => item.county.toLowerCase() === city.toLowerCase());
        if (!cityData) throw new Error('City not found');
        updateWeatherUI(cityData);
      } 
      catch (error) {
        console.error('Error fetching weather data:', error);
        alert('City not found. Please try again.');
      }
    }
  
    // Updates UI with weather data
    function updateWeatherUI(data) {
      cityTitle.textContent = `Weather in ${data.county}`;
      tempElement.textContent = `${data.temp}°C`;
      descriptionElement.textContent = data.description;
      humidityElement.textContent = `Humidity: ${data.humidity}%`;
      windElement.textContent = `Wind speed: ${data.wind}`;
      uvIndexElement.textContent = `UV Index: ${data['Uv index']}`;
      // Assuming the weather API provides an icon code, uses it to fetch the icon image
      const iconUrl = `https://openweathermap.org/img/wn/${data.icon}.png`;
      iconElement.src = iconUrl;
  
      // Updates title attributes for icons (if needed)
      iconElement.title = `Weather Icon: ${data.description}`;
    }
