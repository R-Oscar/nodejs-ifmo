const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const URL = 'https://kodaktor.ru';

chai.use(chaiHttp);

describe('add', () => {
  function makeTest(a, b) {
    it(`should result ${a + b} when adding ${a} and ${b}`, async () => {
      const response = await chai
        .request(URL)
        .get(`/api/add/${a}/${b}`)
        .set('Content-Type', 'application/json');

      const { Сумма: result } = JSON.parse(response.text);

      expect(result).to.equal(+a + +b);
    });
  }

  makeTest(2, 3);
  makeTest(0, 0);
  makeTest(-5, 4);

  makeTest('05', '123');
});
