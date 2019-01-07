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

  // it('can access the current weather in London', () => {
  //   expect(weather.currentWeatherInLondon()).toEqual('hot');
  // });

  it('can access the API for the current weather in London', async () => {
    const londonWeather = await weather.currentWeatherInLondon();
    expect(londonWeather).toEqual(7);
  });

});
