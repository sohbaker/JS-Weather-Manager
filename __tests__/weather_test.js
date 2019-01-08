const fetch = require("node-fetch");
import { Weather } from '../src/weather';

describe('Weather', () => {

  let weather;
  beforeEach(() => {
    weather = new Weather();
  });

  it('creates a new instance of Weather', () => {
    expect(weather instanceof Weather).toEqual(true);
  });

  it('can access the temperature for the current weather in London', async () => {
    const londonWeather = await weather.londonOneDayWeather();
    expect(typeof londonWeather[0]).toEqual('number');
  });

  it('can access the description for the current weather in London', async () => {
    const londonWeather = await weather.londonOneDayWeather();
    expect(typeof londonWeather[1]).toEqual('string');
  });

  it('can access the five day weather forecast for London', async () => {
    const london5DayWeather = await weather.londonFiveDayWeather();
    expect(london5DayWeather.cnt).toEqual(40);
  });

  it('can convert unix time to a string', async () => {
    expect(weather.convertDate(1546948800)).toEqual('2019-01-08');
  });

});
