import { Weather } from './weather';

const weather = new Weather();

async function getWeatherOne() {
  const displayTemp = document.getElementById('one-day-weather');
  const displayDesc = document.getElementById('one-day-description');
  const data = await weather.londonOneDayWeather();
  displayTemp.innerHTML = data[0];
  displayDesc.innerHTML = data[1];
}

async function getWeatherFive() {
  const data = await weather.getForecast();
  return data;
}

async function displayForecast() {
  const forecast = await getWeatherFive()
  const displayFourDays = document.getElementById('next-four-days')

  forecast.forEach((obj) =>  {
    let info = document.createElement("div")

    let dayp = document.createElement("p")
    dayp.innerHTML = obj.day
    info.appendChild(dayp);

    let datep = document.createElement("p")
    datep.innerHTML = obj.date
    info.appendChild(datep);

    let timep = document.createElement("p")
    timep.innerHTML = obj.time
    info.appendChild(timep);

    let tempp = document.createElement("p")
    tempp.innerHTML = obj.temp
    info.appendChild(tempp);

    let descp = document.createElement("p")
    descp.innerHTML = obj.desc
    info.appendChild(descp);

    displayFourDays.appendChild(info);
  })
}

getWeatherOne();
getWeatherFive();
displayForecast();
