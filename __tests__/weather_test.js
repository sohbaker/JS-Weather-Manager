import { Weather } from '../src/weather';

describe('Weather', () => {

  let weather;
  beforeEach(() => {
    weather = new Weather();
  });

  it('creates a new instance of Weather', () => {
    expect(weather instanceof Weather).toEqual(true);
  });

  it('can access the current wetaher in London', () => {
    expect(weather.currentWeatherInLondon()).toEqual('hot');
  });
});
