var inputBtn = $('#inputBtn');
var inputBar = $('#inputBar');
var recent = $('.recent');
var clear = $('#clear');

const weather = {
    apiKey: '2b42c7fdedf42c78051a0e7d3a57aab9',
    fetchWeather: function(city) {
        console.log(typeof city, city); 
        fetch('https://api.openweathermap.org/data/2.5/weather?q='
        + city
        + '&cnt=5&units=imperial&appid='
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const name = data.name;

        if(!name){  
            console.log('clear');
            $('#inputBar').val(''); 
        }

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
        
    },
    fetchFuture: function(city) {
        console.log(typeof city, city);
        fetch('https://api.openweathermap.org/data/2.5/forecast?q='
        + city
        + '&units=imperial&cnt=6&appid='
        + this.apiKey
        )
        .then((response) => response.json())
        .then((data) => this.displayFuture(data));
    },
    displayFuture: function(data) {
        const temp1 = Math.floor(data.list[0].main.temp);
        const temp2 = Math.floor(data.list[1].main.temp);
        const temp3 = Math.floor(data.list[2].main.temp);
        const temp4 = Math.floor(data.list[3].main.temp);
        const temp5 = Math.floor(data.list[4].main.temp);

        const descr1 = data.list[0].weather[0].description;
        const descr2 = data.list[1].weather[0].description;
        const descr3 = data.list[2].weather[0].description;
        const descr4 = data.list[3].weather[0].description;
        const descr5 = data.list[4].weather[0].description;

        const icon1 = data.list[0].weather[0].icon;
        const icon2 = data.list[1].weather[0].icon;
        const icon3 = data.list[2].weather[0].icon;
        const icon4 = data.list[3].weather[0].icon;
        const icon5 = data.list[4].weather[0].icon;

        // const humidity = data.main.humidity;
        // const speed = data.wind.speed;
        // console.log(name,icon,description,temp,speed);
        // console.log(typeof icon, icon);
        $('#temp1').text(temp1 + '°');
        $('#temp2').text(temp2 + '°');
        $('#temp3').text(temp3 + '°');
        $('#temp4').text(temp4 + '°');
        $('#temp5').text(temp5 + '°');

        $('#descr1').text(descr1);
        $('#descr2').text(descr2);
        $('#descr3').text(descr3);
        $('#descr4').text(descr4);
        $('#descr5').text(descr5);

        $('#icon1').attr("src", 'https://openweathermap.org/img/wn/' + icon1 + '.png');
        $('#icon2').attr("src", 'https://openweathermap.org/img/wn/' + icon2 + '.png');
        $('#icon3').attr("src", 'https://openweathermap.org/img/wn/' + icon3 + '.png');
        $('#icon4').attr("src", 'https://openweathermap.org/img/wn/' + icon4 + '.png');
        $('#icon5').attr("src", 'https://openweathermap.org/img/wn/' + icon5 + '.png');

        const numItem = $('li').length;
        const listItem = $('<li>' + data.city.name + '</li>');
        if(numItem < 9){
            recent.prepend(listItem);
            listItem.addClass('listItem');
            inputBar.val('');
        } else {
            inputBar.val('');
            $('.recent li:last-child').remove();
            recent.prepend(listItem);
            listItem.addClass('listItem');
            return;
        }
    }
}

function search(input) {
    console.log('hallo');
    weather.fetchWeather(input);
    weather.fetchFuture(input);
}

function saveSearch(input) {
    const listItem = $('<li>' + input + '</li>');
    recent.append(listItem);
    listItem.addClass('listItem');
    inputBar.val('');
}

inputBtn.on('click', function() {
    var inputVal = $('#inputBar').val();
    console.log(inputVal);
    search(inputVal);
});

inputBar.on('keypress', function(e) {
    if(e.key == 'Enter') {
    search($('#inputBar').val());
    }
});

recent.on('click', function(e) {
    weather.fetchWeather(e.target.textContent);
    weather.fetchFuture(e.target.textContent);
});

clear.on('click', function(e) {
    $('li').remove();
});

// function listItem(city) {
//     const numItem = $('li').length;
//     if(numItem > 9){
//         inputBar.val('');
//         return;
//     } else {
//     const listItem = $('<li>' + city + '</li>');
//     recent.append(listItem);
//     listItem.addClass('listItem');
//     inputBar.val('');
//     }
// }

// weather.fetchWeather('tokyo')