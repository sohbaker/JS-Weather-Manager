import { OneDayLondonWeather } from './one-day-weather';

const weatherOne = new OneDayLondonWeather();

async function getWeatherOne() {
  const temp = document.getElementById('display-one-day-weather');
  temp.innerHTML = await weatherOne.weatherInLondonOneDay() + '&deg;C';
  return temp;
};

getWeatherOne();
