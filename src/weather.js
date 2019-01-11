import { Api } from './api';
import moment from 'moment';

const callApi = new Api();

export class Weather {
  constructor() {
    this.apiRequest = new Api();
  }

  async londonOneDayWeather() {
    const json =  await callApi.oneDayApiCall();
    const oneDayTemp = json.list[0].main.temp;
    const oneDayDescription = json.list[0].weather[0].description;
    const oneDayIcon = json.list[0].weather[0].icon;
    const allLondonData = [Math.round(oneDayTemp) + '\xB0C', oneDayDescription, oneDayIcon]
    return allLondonData;
  }

  async londonFiveDayWeather() {
    const json = await callApi.fiveDayApiCall();
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

  removeDuplicates(arr, key) {
    const unique = arr
      .map(e => e[key])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }

  async getForecast() {
    const forecastData = await this.londonFiveDayWeather();
    const setTimestamps = this.getDates();
    const timestamps = ['00:00:00', '06:00:00', '12:00:00', '18:00:00']
    let firstResult = []

    forecastData.list.forEach(function(hash) {
      setTimestamps.forEach(function(stamp) {
        if(hash.dt_txt === stamp) {
          let dateTime = hash.dt_txt.split(' ')
          let day = ""
          let roundedTemp = Math.round(hash.main.temp)

          moment.locale('en-gb');

          let date = moment(dateTime[0]).format('L');
          let listDay = moment(dateTime[0]).format('dddd');
          let time = moment(hash.dt_txt).format('LT');

          if(roundedTemp === -0) {
            roundedTemp = 0;
          }

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
        let roundedTemp = Math.round(hash.main.temp)

        moment.locale('en-gb');

        let date = moment(dateTime[0]).format('L');
        let listDay = moment(dateTime[0]).format('dddd');
        let time = moment(hash.dt_txt).format('LT');

        if(obj.dt === dateTime[0] && timestamps.includes(dateTime[1])) {
          obj.data.push({
            time: time,
            temp: roundedTemp + '\xB0C',
            icon: hash.weather[0].icon,
            desc: hash.weather[0].description,
          })
        }
      })
    })
  return newResult;
  }
};
