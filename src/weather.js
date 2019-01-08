const fetch = require("node-fetch");
require('dotenv').config();

export class Weather {
  async londonOneDayWeather() {
    const data = await fetch('https://api.openweathermap.org/data/2.5/find?q=London,UK&units=metric&appid='+ process.env.API_KEY);
    const json = await data.json();
    const oneDayTemp = json.list[0].main.temp;
    const oneDayDescription = json.list[0].weather[0].description;
    const allLondonData = [oneDayTemp, oneDayDescription]
    return allLondonData;
  }

  async londonFiveDayWeather() {
    const data = await fetch('https://api.openweathermap.org/data/2.5/forecast?q=London,UK&units=metric&appid='+ process.env.API_KEY);
    const json = await data.json();
    const allLondonData = json
    return allLondonData;
  }

  convertDate(unix_time) {
    const date = new Date(unix_time * 1000)
    let day = date.getDate();
    let month = date.getMonth();
    const year = date.getFullYear();

    if(day < 10){
      day = "0" + date.getDate()
    };
    if(month < 10){
      month = "0" + (date.getMonth() + 1)
    };

    return `${year}-${month}-${day}`;
  }

};
