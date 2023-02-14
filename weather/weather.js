let input = document.getElementById("input");
let cities;
let counter = 0;
let windy = document.getElementById("wind-speed-img");
let windyAnimation;
let cssVariables = document.querySelector(':root');
let darkMode = false;
let checkbox = document.getElementById('myCheckbox');

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
            console.log(weather)
            document.getElementById("temperature").innerHTML = weather.current_weather.temperature + "°";
            document.getElementById("min_temp").innerHTML = weather.daily.temperature_2m_min[0] + "°";
            document.getElementById("max_temp").innerHTML = weather.daily.temperature_2m_max[0] + "°";
            const sunrise = weather.daily.sunrise[0];
            const sunset = weather.daily.sunset[0];
            document.getElementById("sun_up").innerHTML = sunrise.substring(sunrise.length - 5);
            document.getElementById("sun_down").innerHTML = sunset.substring(sunset.length - 5);
            document.getElementById("wind-speed").innerHTML = weather.current_weather.windspeed + "km/h";
            document.getElementById("wind-direction").innerHTML = weather.current_weather.winddirection + "°";
            swapWeatherImage(Number(weather.current_weather.weathercode));
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

function swapAnimationElements() {
    if(counter === 0){
        windy.src="./img/breathIN.svg";
    } else if (counter === 1) {
        windy.src="./img/wind0.svg";
    } else if (counter === 2) {
        windy.src="./img/wind1.svg";
    } else if (counter === 3) {
        windy.src="./img/windy.svg";
        counter = -1;
    }
    counter++;
}

function startAnimation() {
    windyAnimation= setInterval(swapAnimationElements, 400);
}


function darkModeTrigger() {
    let rootVariables = getComputedStyle(cssVariables);
    if(darkMode) {
        cssVariables.style.setProperty("--background", rootVariables.getPropertyValue("--background-dark"));
        cssVariables.style.setProperty("--text-color-main", rootVariables.getPropertyValue("--text-color-main-dark"));
        cssVariables.style.setProperty("--background-container", rootVariables.getPropertyValue("--background-container-dark"));
        cssVariables.style.setProperty("--text-color-second", rootVariables.getPropertyValue("--text-color-second-dark"));
    } else {
        cssVariables.style.setProperty("--background", rootVariables.getPropertyValue("--background-bright"));
        cssVariables.style.setProperty("--text-color-main", rootVariables.getPropertyValue("--text-color-main-bright"));
        cssVariables.style.setProperty("--background-container", rootVariables.getPropertyValue("--background-container-bright"));
        cssVariables.style.setProperty("--text-color-second", rootVariables.getPropertyValue("--text-color-second-bright"));
    }
}

function stopAnimation(){
    clearInterval(windyAnimation);
    counter = 0;
    windy.src="./img/windy.svg";
}

checkbox.addEventListener('change', (event) => {
    if (event.currentTarget.checked) {
        darkMode = true;
        darkModeTrigger()
    } else {
        darkMode = false;
        darkModeTrigger()
    }
})

function openWebsiteBrightDarkChange() {
    const d = new Date();
    if (d.getHours() > 17 || window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        darkMode = true;
        checkbox.checked = true
        darkModeTrigger()
    }
}

openWebsiteBrightDarkChange();
