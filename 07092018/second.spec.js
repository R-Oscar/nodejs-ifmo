const chai = require('chai');
const { makeRequest, makeSecondRequest } = require('./second');
const expect = chai.expect;

describe('two consecutive requests', () => {
  function makeTest(N) {
    it(`should return ${N} when we pass in ${N}`, async () => {
      const result = await makeSecondRequest(await makeRequest(N));

      expect(result).to.equal(N);
    });
  }

  makeTest(0);
  makeTest(-1);
  makeTest(1000);
  makeTest(0.5);
});
