import { ApiRequest } from '../src/api_request';

// const fetch = require('node-fetch');

describe('ApiRequest', () => {
  let api;
  beforeEach(() => {
    api = new ApiRequest();
  });

  it('creates a new instance of Api', () => {
    expect(api instanceof ApiRequest).toEqual(true);
  });

  it('completes an weather api call for London for the current day', async () => {
    const weatherOneDay = await api.weatherOneDayCall();
    expect(weatherOneDay.list[0].name).toEqual('London');
  });

  it('completes a weather api call for five days', async () => {
    const weatherFourDay = await api.weatherFourDayCall();
    expect(weatherFourDay.cnt).toEqual(40);
  });
});
