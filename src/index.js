import { Weather } from './weather';

const weatherOne = new Weather();

async function getWeatherOne() {
  const displayTemp = document.getElementById('one-day-weather');
  const displayDesc = document.getElementById('one-day-description');
  const data = await weatherOne.londonOneDayWeather();
  displayTemp.innerHTML = data[0];
  displayDesc.innerHTML = data[1];
}

async function getWeatherFive() {
  const displayTemp = document.getElementById('five-day-weather');
  const displayDesc = document.getElementById('five-day-description');
  const displayStamp = document.getElementById('five-day-stamp');
  const data = await weatherOne.getForecast();

  data.forEach(function(hash){
    displayTemp.innerHTML = hash.temp;
    displayDesc.innerHTML = hash.desc;
    displayStamp.innerHTML = hash.dt;
  })
}

getWeatherOne();
getWeatherFive();
