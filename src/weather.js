const fetch = require("node-fetch");
require('dotenv').config();

export class Weather {
  async currentWeatherInLondon() {
    const weatherAPI = await fetch('https://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid='+ process.env.API_KEY);
    const json = await weatherAPI.json();
    const temperature = json.list[0].main.temp;
    console.log(weatherAPI)
    return temperature;
  }
};
