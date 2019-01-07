const fetch = require("node-fetch");

export class Weather {

  async currentWeatherInLondon() {
    const weatherAPI = await fetch('https://samples.openweathermap.org/data/2.5/find?q=London&units=metric&appid=b6907d289e10d714a6e88b30761fae22');
    const json = await weatherAPI.json();
    const temperature = json.list[0].main.temp;
    return temperature;
  }

// fetch('https://api.openweathermap.org/data/2.5/find?q=London&units=metric&appid=b6907d289e10d714a6e88b30761fae22');
};
