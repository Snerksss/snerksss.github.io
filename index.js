const weekday = ["SO","MO","DI","MI","DO","FR","SA"];
function updateTime() {
    const d = new Date()
    document.getElementById("weekday").innerHTML= weekday[d.getDay()];
    document.getElementById("hour").innerHTML = hours_with_leading_zeros(d).toString()
    document.getElementById("minute").innerHTML = minutes_with_leading_zeros(d).toString()
    document.getElementById("second").innerHTML = seconds_with_leading_zeros(d).toString()

}

function hours_with_leading_zeros(dt)
{
    return (dt.getHours() < 10 ? '0' : '') + dt.getHours();
}

function minutes_with_leading_zeros(dt)
{
    return (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
}

function seconds_with_leading_zeros(dt)
{
    return (dt.getSeconds() < 10 ? '0' : '') + dt.getSeconds();
}

setInterval(updateTime, 1000)