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

    const times = ['00:00:00', '06:00:00', '12:00:00', '18:00:00']
    let dateAndTimeArray = []

    dateStrings.forEach(function(date) {
      if(date !== dateStrings[0]) {
        times.forEach(function(time) {
          let dateAndTime = date + " " + time
          dateAndTimeArray.push(dateAndTime)
        })
      }
    });
    return dateAndTimeArray;
  };

  async getForecast() {
    const forecastData = await this.londonFiveDayWeather();
    const timestamps = this.getDates();
    let collectData = []

    forecastData.list.forEach(function(hash) {
      timestamps.forEach(function(stamp) {
        if(hash['dt_txt'] === stamp) {
          let dateTime = hash['dt_txt'].split(' ')
          let day = ""
          let formattedDate = dateTime[0].split('-')
          let formattedTime = dateTime[1].split(':')
          let roundedTemp = Math.round(hash.main.temp)

          switch (new Date(formattedDate[0], formattedDate[1] - 1, formattedDate[2]).getDay()) {
            case 0:
              day = "Sunday";
              break;
            case 1:
              day = "Monday";
              break;
            case 2:
              day = "Tuesday";
              break;
            case 3:
              day = "Wednesday";
              break;
            case 4:
              day = "Thursday";
              break;
            case 5:
              day = "Friday";
              break;
            case 6:
              day = "Saturday";
              break;
          }


          if(roundedTemp === -0) {
            roundedTemp = 0
          }

          collectData.push({
            day: day,
            date: `${formattedDate[2]}/${formattedDate[1]}/${formattedDate[0]}`,
            time: `${formattedTime[0]}:${formattedTime[1]}`,
            temp: roundedTemp + '°C',
            desc: hash.weather[0].description,
          })
        }
      })
    })
    return collectData;
  }
};
