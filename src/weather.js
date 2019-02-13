import moment from 'moment';
import { ApiRequest } from './api_request';

export class Weather {
  constructor() {
    this.apiRequest = new ApiRequest();
  }

  async currentDayWeather() {
    const todayWeather = await this.apiRequest.weatherOneDayCall();
    todayWeather.temp = Math.round(todayWeather.temp);
    return todayWeather;
  }

  async nextFourDaysWeather() {
    const allLondonData = await this.apiRequest.weatherFourDayCall();
    return allLondonData;
  }

  getDatesAndTimes() {
    const addOneDay = 1000 * 60 * 60 * 24;
    const today = new Date();
    const todayPlus1 = new Date(today.getTime() + (addOneDay));
    const todayPlus2 = new Date(today.getTime() + (addOneDay * 2));
    const todayPlus3 = new Date(today.getTime() + (addOneDay * 3));
    const todayPlus4 = new Date(today.getTime() + (addOneDay * 4));

    const nextFiveDays = [today, todayPlus1, todayPlus2, todayPlus3, todayPlus4];
    const dateStrings = [];

    nextFiveDays.forEach((date) => {
      const dateToString = JSON.stringify(date);
      dateStrings.push(dateToString.substring(1, 11));
    });

    const times = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];
    const dateAndTimeArray = [];

    dateStrings.forEach((date) => {
      if (date !== dateStrings[0]) {
        times.forEach((time) => {
          const dateAndTime = `${date} ${time}`;
          dateAndTimeArray.push(dateAndTime);
        });
      }
    });
    return dateAndTimeArray;
  }

  removeDuplicates(arr, key) {
    const unique = arr
      .map(e => e[key])
      .map((e, i, final) => final.indexOf(e) === i && i)
      .filter(e => arr[e]).map(e => arr[e]);
    return unique;
  }

  async getForecast() {
    const forecastData = await this.nextFourDaysWeather();
    const setTimestamps = this.getDatesAndTimes();
    const times = ['00:00:00', '06:00:00', '12:00:00', '18:00:00'];
    const firstResult = [];

    forecastData.list.forEach((hash) => {
      setTimestamps.forEach((stamp) => {
        if (hash.dt_txt === stamp) {
          const dateTime = hash.dt_txt.split(' ');
          // const day = '';
          moment.locale('en-gb');
          const date = moment(dateTime[0]).format('L');
          const listDay = moment(dateTime[0]).format('dddd');
          // const time = moment(hash.dt_txt).format('LT');

          firstResult.push({
            day: listDay,
            date,
            dt: dateTime[0],
            data: [],
          });
        }
      });
    });

    const newResult = this.removeDuplicates(firstResult, 'day');

    forecastData.list.forEach((hash) => {
      newResult.forEach((obj) => {
        const dateTime = hash.dt_txt.split(' ');
        // const day = '';
        moment.locale('en-gb');
        const time = moment(hash.dt_txt).format('LT');

        if (obj.dt === dateTime[0] && times.includes(dateTime[1])) {
          obj.data.push({
            time,
            temp: Math.round(hash.main.temp),
            icon: hash.weather[0].icon,
            desc: hash.weather[0].description,
          });
        }
      });
    });
    return newResult;
  }
}
