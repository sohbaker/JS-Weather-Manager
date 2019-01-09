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
})
