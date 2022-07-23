const weather = {
    apiKey: '2b42c7fdedf42c78051a0e7d3a57aab9',
    fetchWeather: function(city) {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' 
        + city 
        + '&units=imperial&appid=' 
        + this.apiKey
    )
        .then((response) => response.json())
        .then((data) => console.log(data));
    },
    displayWeather: function() {

    }
}