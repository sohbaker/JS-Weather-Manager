import { OneDayWeather } from './one_day_weather';

const weatherOne = new OneDayWeather();

async function getWeatherOne() {
  const temp = document.getElementById('display-one-day-weather');
  temp.innerHTML = await weatherOne.LondonOneDay() + '&deg;C';
  return temp;
};

async function getDescriptionOne() {
  const description = document.getElementById('display-one-day-description');
  description.innerHTML = await weatherOne.LondonOneDayDescription();
  return description;
};

getWeatherOne();
getDescriptionOne();
