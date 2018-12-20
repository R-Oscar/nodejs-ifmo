const app = require('express')(),
  Parser = require('rss-parser'),
  bodyParser = require('body-parser'),
  morgan = require('morgan');

const URL = 'https://nodejs.org/en/feed/blog.xml';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));

async function parse(N) {
  const parser = new Parser();
  const { items } = await parser.parseURL(URL);

  const newItems = items.slice(0, N).map(({ title, link }) => ({
    title,
    link
  }));

  return JSON.stringify(newItems);
}

app.listen(1234, () => console.log('Server listening on port 1234'));

app.post('/', async (req, res) => {
  console.log(await parse(req.body.n));
  res.json(await parse(req.body.n));
});
