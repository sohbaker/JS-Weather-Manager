import { ApiRequest } from './api_request';
import moment from 'moment';

export class Weather {
  constructor() {
    this.apiRequest = new ApiRequest();
  }

  async currentDayWeather() {
    const todayWeather =  await this.apiRequest.weatherOneDayCall();
    todayWeather.temp = this.formatTemperature(todayWeather.temp)
    return todayWeather;
  }

  async nextFourDaysWeather() {
    const allLondonData = await this.apiRequest.weatherFourDayCall();
    return allLondonData;
  }

  getDatesAndTimes() {
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

  removeDuplicates(arr, key) {
    const unique = arr
      .map(e => e[key])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }

  formatTemperature(temperature) {
   let roundedTemp = Math.round(temperature)

    if(Object.is(roundedTemp, -0)) {
      roundedTemp = 0;
    }
    temperature = `${roundedTemp}\xB0C`;
    return temperature;
  }

  async getForecast() {
    const forecastData = await this.nextFourDaysWeather();
    const setTimestamps = this.getDatesAndTimes();
    const timestamps = ['00:00:00', '06:00:00', '12:00:00', '18:00:00']
    let firstResult = []

    forecastData.list.forEach(function(hash) {
      setTimestamps.forEach(function(stamp) {
        if(hash.dt_txt === stamp) {
          let dateTime = hash.dt_txt.split(' ')
          let day = ""

          moment.locale('en-gb');

          let date = moment(dateTime[0]).format('L');
          let listDay = moment(dateTime[0]).format('dddd');
          let time = moment(hash.dt_txt).format('LT');

          firstResult.push({
            day: listDay,
            date: date,
            dt: dateTime[0],
            data: []
          })
        }
      })
    })

    let newResult = this.removeDuplicates(firstResult, 'day');

    forecastData.list.forEach(function(hash) {
      newResult.forEach(function(obj){
        let dateTime = hash.dt_txt.split(' ')
        let day = ""
        let temp = hash.main.temp

        moment.locale('en-gb');

        let time = moment(hash.dt_txt).format('LT');

        if(obj.dt === dateTime[0] && timestamps.includes(dateTime[1])) {
          obj.data.push({
            time: time,
            temp: temp,
            icon: hash.weather[0].icon,
            desc: hash.weather[0].description,
          })
        }
      })
    })
  return newResult;
  }
};
