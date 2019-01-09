const fetch = require("node-fetch");

import { Api } from '../src/api';

describe('Api', () => {

  let api;
  beforeEach(() => {
    api = new Api();
  });

  it('creates a new instance of Api', () => {
    expect(api instanceof Api).toEqual(true);
  });

  it('completes an weather api call for London for the current day', async () => {
    const weatherOneDay = await api.oneDayApiCall();
    expect(weatherOneDay.list[0].name).toEqual('London');
  });
})
