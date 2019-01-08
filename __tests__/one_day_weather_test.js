const fetch = require("node-fetch");
import { OneDayWeather } from '../src/one_day_weather';

describe('OneDayWeather', () => {

  let weather;
  beforeEach(() => {
    weather = new OneDayWeather();
  });

  it('creates a new instance of OneDayWeather', () => {
    expect(weather instanceof OneDayWeather).toEqual(true);
  });

  it('can access the temperature for the current weather in London', async () => {
    const londonWeather = await weather.LondonOneDayWeather();
    expect(typeof londonWeather[0]).toEqual('number');
  });

  it('can access the description for the current weather in London', async () => {
    const londonWeather = await weather.LondonOneDayWeather();
    expect(typeof londonWeather[1]).toEqual('string');
  });
});
