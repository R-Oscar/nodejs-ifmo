const http = require('http');
const zlib = require('zlib');

http
  .Server((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-Disposition': 'attachment; filename=output.gz' });
    req.pipe(zlib.createGzip()).pipe(res);
  })
  .listen(1234, () => console.log('Server started'));
