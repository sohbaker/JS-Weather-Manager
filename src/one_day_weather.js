const fetch = require("node-fetch");
require('dotenv').config();

export class OneDayWeather {
  async LondonOneDay() {
    const londonOneDayData = await fetch('https://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid='+ process.env.API_KEY);
    const json = await londonOneDayData.json();
    const londonOneDayTemp = json.list[0].main.temp;
    return londonOneDayTemp;
  }
};
