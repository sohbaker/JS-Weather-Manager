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

  getDates() {
    const addOneDay = 1000 * 60 * 60 * 24
    const today = new Date();
    const todayPlus1 = new Date(today.getTime() + (addOneDay));
    const todayPlus2 = new Date(today.getTime() + (addOneDay * 2));
    const todayPlus3 = new Date(today.getTime() + (addOneDay * 3));
    const todayPlus4 = new Date(today.getTime() + (addOneDay * 4));

    const nextFiveDays = [today, todayPlus1, todayPlus2, todayPlus3, todayPlus4]
    let dateStrings = []

    nextFiveDays.forEach(function(date) {
      const dateToString = JSON.stringify(date)
      dateStrings.push(dateToString.substring(1, 11))
    });

    return dateStrings
  }

};
