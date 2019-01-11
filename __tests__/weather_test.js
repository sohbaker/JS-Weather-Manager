import { Api } from '../src/api';
import { Weather } from '../src/weather';
jest.mock('../src/api');

describe('Weather', () => {
  beforeEach(() => {
    Api.mockClear();
  });

  it('checks if weather class creates a new instance of api request class', () => {
    const weather = new Weather();
    expect(Api).toHaveBeenCalledTimes(1);
  });

  it('checks for a new instance of api request', () => {
    expect(Api).not.toHaveBeenCalled();
  });

  it('checks whether londonOneDayWeather function makes an API request', async () => {
    const weather = new Weather();
    expect(Api).toHaveBeenCalledTimes(1);

    weather.londonOneDayWeather();

    const mockApiRequestInstance = Api.mock.instances[0];
    const mockOneDayApiCall = mockApiRequestInstance.oneDayApiCall;

    expect(mockOneDayApiCall).toHaveBeenCalledTimes(1);
  });

  it('checks whether londonFiveDayWeather function makes an API request', async () => {
    const weather = new Weather();
    expect(Api).toHaveBeenCalledTimes(1);

    weather.londonFiveDayWeather();

    const mockApiRequestInstance = Api.mock.instances[0];
    const mockFiveDayApiCall = mockApiRequestInstance.fiveDayApiCall;

    expect(mockFiveDayApiCall).toHaveBeenCalledTimes(1);
  });

  // <-------------------------->
  // let weather;
  // beforeEach(() => {
  //   weather = new Weather();
  // });
  //
  // it('creates a new instance of Weather', () => {
  //   expect(weather instanceof Weather).toEqual(true);
  // });
  //
  // it('can access the temperature for the current weather in London', async () => {
  //   const londonWeather = await weather.londonOneDayWeather();
  //   expect(londonWeather[0]).toContain('\xB0');
  // });
  //
  // it('can access the description for the current weather in London', async () => {
  //   const londonWeather = await weather.londonOneDayWeather();
  //   expect(typeof londonWeather[1]).toEqual('string');
  // });
  //
  // it('can access the five day weather forecast for London', async () => {
  //   const london5DayWeather = await weather.londonFiveDayWeather();
  //   expect(london5DayWeather.cnt).toEqual(40);
  // });
  //
  // it('adds a specific timestamp to each date for the next four days in a new array', async () => {
  //   const timestamp = await weather.getDates();
  //   expect(timestamp.length).toEqual(16);
  // });
  //
  // it('collects the temperature, weather description and date/timestamp for the next four days', async () => {
  //   const forecast = await weather.getForecast();
  //   console.log(weather.getForecast())
  //   expect(forecast.length).toEqual(4);
  // });

});
