let input = document.getElementById("input");
let took = 0;
let cities;

function fetchCityNames() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            removeElements();
            cities = JSON.parse(xhttp.responseText)
            let count = 0
            for (let i of cities.results) {
                //convert input to lowercase and compare with each string
                if (
                    i.name.toLowerCase().startsWith(input.value.toLowerCase()) &&
                    input.value != ""
                ) {
                    //create li element
                    let listItem = document.createElement("li");
                    //One common class name
                    listItem.classList.add("list-items");
                    listItem.style.cursor = "pointer";
                    listItem.setAttribute("onclick", "displayNames('" + i.name + "', '" + count + "')");
                    //Display matched part in bold
                    let word = "<b>" + i.name.substr(0, input.value.length) + "</b>";
                    word += i.name.substr(input.value.length);
                    word = word + ", " + i.admin1 + ", " + i.country_code;
                    //display the value in array
                    listItem.innerHTML = word;
                    document.querySelector(".list").appendChild(listItem);
                }
                count++;
            }
        }
    };
    xhttp.open("GET", "https://geocoding-api.open-meteo.com/v1/search?name=" + input.value.toLowerCase(), true);
    xhttp.send();
}

function displayNames(value, count) {
    console.log(cities.results[count])
    getWeather(cities.results[count].latitude, cities.results[count].longitude)
    input.value = value;
    removeElements();
}

function getWeatherCurrentPos() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    getWeather(position.coords.latitude, position.coords.longitude);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(xhttp.responseText))
            input.value = JSON.parse(xhttp.responseText).address.town
        }
    };
    xhttp.open("GET", "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, true);
    xhttp.send();

}

function getWeather(lat, long) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const weather = JSON.parse(xhttp.responseText);
            console.log(weather);
            document.getElementById("temperature").innerHTML = weather.current_weather.temperature + "°";
            document.getElementById("min_temp").innerHTML = weather.daily.temperature_2m_min[0] + "°";
            document.getElementById("max_temp").innerHTML = weather.daily.temperature_2m_max[0] + "°";
            const sunrise = weather.daily.sunrise[0]
            const sunset = weather.daily.sunset[0]
            document.getElementById("sun_up").innerHTML = sunrise.substring(sunrise.length - 5)
            document.getElementById("sun_down").innerHTML = sunset.substring(sunset.length - 5)
            swapWeatherImage(Number(weather.current_weather.weathercode))
        }
    };
    xhttp.open("GET", "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + long + "&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&timezone=Europe%2FBerlin", true);
    xhttp.send();
}

function swapWeatherImage(code) {
    let result = "./img/cloud.svg"
    if (code === 0) {
        result = "./img/sun.svg"
    } else if (code > 0 && code < 3) {
        result = "./img/sun_with_cloud.svg"
    } else if (code === 3) {
        result = "./img/cloud.svg"
    } else if (code === 45 || code === 48) {
        result = "./img/fog.svg"
    } else if (code > 50 && code < 56) {
        result = "./img/drizzle.svg"
    } else if ((code > 60 && code < 66) || (code > 79 && code < 83)) {
        result = "./img/rain.svg"
    } else if (code > 65 && code < 68) {
        result = "./img/freezing.svg"
    } else if ((code > 70 && code < 76) || (code > 84 && code < 87)) {
        result = "./img/snowy.svg"
    } else if (code > 94 && code < 100) {
        result = "./img/thunderstorm.svg"
    }
    document.getElementById("weather-image").src = result;
}

function removeElements() {
    //clear all the item
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}