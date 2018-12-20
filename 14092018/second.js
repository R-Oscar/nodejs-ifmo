const http = require('http');
const moment = require('moment');

const server = http.createServer();

server.listen(1234, () => console.log('Server started!'));

server.on('request', (req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  const params = req.url
    .split('/')
    .slice(1)
    .filter(el => el !== '');

  if (params.length > 0) {
    const action = params[0];

    if (action === 'add') {
      if (params.length !== 3) res.end();

      const [, a, b] = params;
      res.end(JSON.stringify({ Sum: +a + +b }));
    }
  } else {
    res.end(JSON.stringify({ date: moment().format('DD.MM.YYYY HH:mm:ss') }));
  }
});
