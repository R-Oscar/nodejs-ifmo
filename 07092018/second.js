const axios = require('axios');

async function makeRequest(N) {
  const result = await axios.get(`https://kodaktor.ru/api2/there/${N}`);
  return result.data;
}

async function makeSecondRequest(N) {
  const result = await axios.get(`https://kodaktor.ru/api2/andba/${N}`);
  return result.data;
}

module.exports = { makeRequest, makeSecondRequest };

// makeRequest(1)
//   .then(r => makeSecondRequest(r))
//   .then(r => console.log(r));
