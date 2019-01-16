import { ApiRequest } from '../src/api_request';
import { Weather } from '../src/weather';
jest.mock('../src/api_request');

describe('Weather', () => {
  beforeEach(() => {
    ApiRequest.mockClear();
  });

  it('checks if weather class creates a new instance of api request class', () => {
    const weather = new Weather();
    expect(ApiRequest).toHaveBeenCalledTimes(1);
  });

  it('checks for a new instance of api request', () => {
    expect(ApiRequest).not.toHaveBeenCalled();
  });

  it('checks whether currentDayWeather function makes an API request', async () => {
    const weather = new Weather();
    expect(ApiRequest).toHaveBeenCalledTimes(1);

    weather.currentDayWeather();

    const mockApiRequestInstance = ApiRequest.mock.instances[0];
    const mockOneDayApiCall = mockApiRequestInstance.weatherOneDayCall;

    expect(mockOneDayApiCall).toHaveBeenCalledTimes(1);
  });

  it('checks whether nextFourDaysWeather function makes an API request', async () => {
    const weather = new Weather();
    expect(ApiRequest).toHaveBeenCalledTimes(1);

    weather.nextFourDaysWeather();

    const mockApiRequestInstance = ApiRequest.mock.instances[0];
    const mockFiveDayApiCall = mockApiRequestInstance.weatherFourDayCall;

    expect(mockFiveDayApiCall).toHaveBeenCalledTimes(1);
  });

});
