const https = require('https');
const StringDecoder = require('string_decoder').StringDecoder;

const N = 333;

const request = https.request(
  {
    host: 'kodaktor.ru',
    path: `/api2/buffer2/${N}`
  },
  res => {
    let size = 0;
    let data = '';
    const decoder = new StringDecoder('utf8');
    res.on('data', chunk => {
      size += chunk.length;
      data += chunk;

      const textChunk = decoder.write(chunk);

      if (textChunk.indexOf('cats') === 0) {
        console.log('cats: ' + size);
      }
    });
    res.on('end', () => {
      console.log('total: ' + data.length);
    });
  }
);
request.on('error', function(e) {
  console.log(e.message);
});
request.end();
