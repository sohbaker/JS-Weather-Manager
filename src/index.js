import { Weather } from './weather';

const weather = new Weather();

async function getWeather() {
  const temp = document.getElementById('display-weather');
  temp.innerHTML = await weather.currentWeatherInLondon() + '&deg;C';
  return temp;
};

getWeather();
