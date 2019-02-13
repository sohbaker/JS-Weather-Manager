const fetch = require('node-fetch');
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

export class ApiRequest {
  async getWeatherData(callType) {
    const url = `https://api.openweathermap.org/data/2.5/${callType}?q=London,UK&units=metric`;

    try {
      const response = await fetch(`${url}&appid=${process.env.API_KEY}`);
      const data = await response.json();
      if (!data) return `${callType} not found`;
      return data;
    } catch (error) {
      return `${callType}: Unexpected error occurred`;
    }
  }

  async weatherOneDayCall() {
    const data = await this.getWeatherData('find');
    const formatData = this.formatOneDayData(data);
    return formatData;
  }

  async weatherFourDayCall() {
    // eslint-disable-next-line no-return-await
    return await this.getWeatherData('forecast');
  }

  formatOneDayData(data) {
    return {
      temp: data.list[0].main.temp,
      description: data.list[0].weather[0].description,
      icon: data.list[0].weather[0].icon,
      conditionID: data.list[0].weather[0].id,
    };
  }
}
