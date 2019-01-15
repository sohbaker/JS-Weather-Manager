import { ApiRequest } from '../src/api_request';
import { Weather } from '../src/weather';
jest.mock('../src/api');

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

  it('checks whether londonOneDayWeather function makes an API request', async () => {
    const weather = new Weather();
    expect(ApiRequest).toHaveBeenCalledTimes(1);

    weather.londonOneDayWeather();

    const mockApiRequestInstance = ApiRequest.mock.instances[0];
    const mockOneDayApiCall = mockApiRequestInstance.oneDayApiCall;

    expect(mockOneDayApiCall).toHaveBeenCalledTimes(1);
  });

  it('checks whether londonFiveDayWeather function makes an API request', async () => {
    const weather = new Weather();
    expect(ApiRequest).toHaveBeenCalledTimes(1);

    weather.londonFiveDayWeather();

    const mockApiRequestInstance = ApiRequest.mock.instances[0];
    const mockFiveDayApiCall = mockApiRequestInstance.fiveDayApiCall;

    expect(mockFiveDayApiCall).toHaveBeenCalledTimes(1);
  });

});
