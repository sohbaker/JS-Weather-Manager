import { Weather } from './weather';

const weather = new Weather();

async function getWeatherOne() {
  const displayTemp = document.getElementById('one-day-weather');
  const displayDesc = document.getElementById('one-day-description');
  const displayIcon = document.getElementById('one-day-icon')
  const data = await weather.londonOneDayWeather();
  displayTemp.innerHTML = data[0];
  displayDesc.innerHTML = data[1];
  displayIcon.innerHTML = "<img src='http://openweathermap.org/img/w/" + data[2] + ".png'>"
}

async function getWeatherFive() {
  const data = await weather.getForecast();
  return data;
}

async function displayForecast() {
  const forecast = await getWeatherFive()
  console.log(forecast)
  const displayFourDays = document.getElementById('next-four-days')

  forecast.forEach((obj) =>  {
    let info = document.createElement("div")

    let day = document.createElement("p")
    day.innerHTML = obj.day
    info.appendChild(day);

    let date = document.createElement("p")
    date.innerHTML = obj.date
    info.appendChild(date);

    let time = document.createElement("p")
    time.innerHTML = obj.time
    info.appendChild(time);

    let temp = document.createElement("p")
    temp.innerHTML = obj.temp
    info.appendChild(temp);

    let icon = document.createElement("p")
    let iconUrl = "http://openweathermap.org/img/w/" + obj.icon + ".png";
    icon.innerHTML = "<img src='" + iconUrl  + "'>";
    info.appendChild(icon);

    let desc = document.createElement("p")
    desc.innerHTML = obj.desc
    info.appendChild(desc);

    displayFourDays.appendChild(info);
  })
}

getWeatherOne();
getWeatherFive();
displayForecast();
