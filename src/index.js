import { OneDayWeather } from './one_day_weather';

const weatherOne = new OneDayWeather();

async function getWeatherOne() {
  const displayTemp = document.getElementById('one-day-weather');
  const displayDesc = document.getElementById('one-day-description');
  const data = await weatherOne.LondonOneDayWeather();
  displayTemp.innerHTML = data[0];
  displayDesc.innerHTML = data[1];
}

getWeatherOne();
