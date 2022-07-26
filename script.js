var inputBtn = $('#inputBtn');
var inputBar = $('#inputBar');

const weather = {
    apiKey: '2b42c7fdedf42c78051a0e7d3a57aab9',
    fetchWeather: function(city) {
        console.log(typeof city, city);
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city
        + '&units=imperial&appid='
        + this.apiKey
    )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const name = data.name;
        const icon = data.weather[0].icon;
        const description = data.weather[0].description;
        const temp = Math.floor(data.main.temp);
        const humidity = data.main.humidity;
        const speed = data.wind.speed
        console.log(name,icon,description,temp,speed);
        console.log(typeof icon, icon);
        $('#cityTitle').text(name);
        $('#temp').text(temp + '°');
        $('#descr').text(description);
        $('#icon').attr("src", 'https://openweathermap.org/img/wn/' + icon + '.png');
        $('#humid').text('Humidity: ' + humidity + '%');
        $('#wind').text('Wind Speed: ' + speed + 'mph');
        
    }
}

function search(input) {
    console.log('hallo');
    weather.fetchWeather(input);
    }

inputBtn.on('click', function(e) {
    console.log('hello');
    search(inputBar.value);
});
// weather.fetchWeather('tokyo')