$('.days').addClass('hidden');
$('.futureTitle').addClass('hidden');
$('#day').addClass('hidden');

var inputBtn = $('#inputBtn');
var inputBar = $('#inputBar');
var recent = $('.recent');
var clear = $('#clear');
var day = $('#day');
var day1 = $('#day1');
var day2 = $('#day2');
var day3 = $('#day3');
var day4 = $('#day4');
var day5 = $('#day5');
var array = []; 

var today = moment().day();
dayOfWeek();
function dayOfWeek() {
    day.text(moment().day(today).format('dddd MMM Do'));
    day1.text(moment().day(today + 1).format('dddd'));
    day2.text(moment().day(today + 2).format('dddd'));
    day3.text(moment().day(today + 3).format('dddd'));
    day4.text(moment().day(today + 4).format('dddd'));
    day5.text(moment().day(today + 5).format('dddd'));
}

const cities = localStorage.getItem('cities');
console.log(typeof cities, cities);
if(cities != null) {
    const citiesArray = JSON.parse(cities);
    console.log(typeof citiesArray, citiesArray);
    for(i = 0; i < citiesArray.length; i++) {
        recent.append('<li>' + citiesArray[i]);
        $('li').addClass('listItem');
    }
}
const weather = {
    apiKey: '2b42c7fdedf42c78051a0e7d3a57aab9',
    fetchWeather: function(city) {
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
            $('#inputBar').val(''); 
            console.log('clear');
        }

        var icon = data.weather[0].icon;
        const description = data.weather[0].description;
        const temp = Math.floor(data.main.temp);
        const humidity = data.main.humidity;
        const speed = data.wind.speed
        $('#cityTitle').text(name);
        $('#temp').text(temp + '°');
        $('#descr').text(description);
        $('#icon').attr("src", 'https://openweathermap.org/img/wn/' + icon + '.png');
        $('#humid').text('Humidity: ' + humidity + '%');
        $('#wind').text('Wind Speed: ' + speed + 'mph');
        
    },
    fetchFuture: function(city) {
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

        // inputBar.val('');

        // const name = data.city.name;

        // if (!array.includes(name)) {
        //     array.push(name);
        // } else {
        //     return;
        // }

        // $('li').remove();

        // for(i = 0; i < array.length; i++) {
        //     recent.append('<li>' + array[i]);
        //     $('li').addClass('listItem');
        //     console.log('go');
        // }

        // const arrayString = JSON.stringify(array);
        // console.log(typeof arrayString, arrayString);
        // localStorage.setItem('cities', arrayString);
    },
    render: function(name){

        inputBar.val('');

        if (!array.includes(name)) {
            array.push(name);
        } else if (1 == 1) {
            console.log(this.displayWeather);
        } else {
            return;
        }

        $('li').remove();

        for(i = 0; i < array.length; i++) {
            recent.append('<li>' + array[i]);
            $('li').addClass('listItem');
            console.log('go');
        }

        const arrayString = JSON.stringify(array);
        console.log(typeof arrayString, arrayString);
        localStorage.setItem('cities', arrayString);
    }
}

function search(input) {
    $('.days').removeClass('hidden');
    $('.futureTitle').removeClass('hidden');
    $('#day').removeClass('hidden');
    weather.fetchWeather(input);
    weather.fetchFuture(input);
    weather.render(input);
}

function saveSearch(input) {
    const listItem = $('<li>' + input + '</li>');
    recent.append(listItem);
    listItem.addClass('listItem');
    inputBar.val('');
}

inputBtn.on('click', function() {
    search($('#inputBar').val());
});

inputBar.on('keypress', function(e) {
    if(e.key == 'Enter') {
    search($('#inputBar').val());
    }
});

recent.on('click', function(e) {
    weather.fetchWeather(e.target.textContent);
    weather.fetchFuture(e.target.textContent);
    $('.days').removeClass('hidden');
    $('.futureTitle').removeClass('hidden');
    $('#day').removeClass('hidden');
});

clear.on('click', function(e) {
    $('li').remove();
    localStorage.clear();
});
