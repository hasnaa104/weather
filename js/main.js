
let today = document.getElementById('today')
let todayDate = document.getElementById('todayDate')
let month = document.getElementById('month')
let cityLocation = document.getElementById('location')
let todayDegree = document.getElementById('todayDegree')
let todayIcon = document.getElementById('todayIcon')
let today_description = document.getElementById('today_description')
let humidity = document.getElementById('humidity')
let wind = document.getElementById('wind')
let compass = document.getElementById('compass')

let nextDay = document.getElementsByClassName('nextDay')
let nextDayIcon = document.getElementsByClassName('nextDayIcon')
let nextDayMax = document.getElementsByClassName('nextDayMax')
let nextDayMin = document.getElementsByClassName('nextDayMin')
let nextDay_description = document.getElementsByClassName('nextDay-description')
let searchInput = document.getElementById('searchInput')


let searchCity = 'cairo'

let days = ['Sunday', 'Monday', 'Tuseday', 'Wendesday', 'Thrusday', 'Friday', 'Saturday']

let monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Augest', 'Semptemper', 'October', 'November', 'December']

searchInput.addEventListener('keyup', function () {
    searchCity = searchInput.value
    getData()
})

let data
let result

async function getData() {
    data = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=025c526410aa4851abd153140230403&q=${searchCity}&days=3&aqi=no&alerts=no`)
    result = await data.json()
    console.log(result)
    getdate()
    nextDayWeather()
}
getData()

function getdate() {
    let date = new Date()
    today.innerHTML = days[date.getDay()]
    todayDate.innerHTML = date.getDate()
    month.innerHTML = monthes[date.getMonth()]
    cityLocation.innerHTML = result.location.name
    todayDegree.innerHTML = result.current.temp_c
    todayIcon.setAttribute('src', `https:${result.current.condition.icon}`)
    today_description.innerHTML = result.current.condition.text
    humidity.innerHTML = result.current.humidity
    wind.innerHTML = result.current.wind_kph
    compass.innerHTML = result.current.wind_dir

}



function nextDayWeather() {
    for (let i = 0; i < nextDay.length; i++) {
        nextDay[i].innerHTML = days[new Date(result.forecast.forecastday[i + 1].date).getDay()]
        nextDayIcon[i].setAttribute('src', `https:${result.forecast.forecastday[i + 1].day.condition.icon}`)
        nextDayMax[i].innerHTML = result.forecast.forecastday[i + 1].day.maxtemp_c
        nextDayMin[i].innerHTML = result.forecast.forecastday[i + 1].day.mintemp_c
        nextDay_description[i].innerHTML = result.forecast.forecastday[i + 1].day.condition.text

    }
}






