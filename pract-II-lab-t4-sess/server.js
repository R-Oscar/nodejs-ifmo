const express = require('express');
const { get } = require('axios');
const bodyParser = require('body-parser');
const session = require('express-session');

let items;
const PORT = 4321;
const URL = 'https://kodaktor.ru/j/users';
const app = express();

const checkAuth = (r, res, next) => {
  if (r.session.auth === 'ok') {
    next();
  } else {
    app.locals.before = r.url;
    res.redirect('/login');
  }
};

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(session({ secret: 'mysecret', resave: true, saveUninitialized: true }))
  .get('/author', r => {
    r.res.header('Access-Control-Allow-Origin', '*');
    r.res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    r.res.send('<h4 id="author" title="GossJS">Иван Иванов</h4>');
  })
  .get('/users/', checkAuth, async r => r.res.render('list', { title: 'Список логинов', items }))
  .get('/hello/', r => r.res.end('Hello world!'))
  .get('/login', (req, res) => res.render('login'))
  .get('/logout', r => {
    r.res.send('ok');
    r.session.auth = '';
  })
  .post('/login/check/', (r, res) => {
    const {
      body: { login: l }
    } = r;
    const user = items.find(({ login }) => login === l);
    if (user) {
      if (user.password === r.body.pass) {
        r.session.auth = 'ok';

        if (app.locals.before) {
          res.redirect(app.locals.before);
        }
      } else {
        r.res.send('Wrong pass!');
      }
    } else {
      r.res.send('No such user!');
    }
  })
  .use(r => r.res.status(404).end('Still not here, sorry!'))
  .use((e, r, res, n) => res.status(500).end(`Error: ${e}`))
  .set('view engine', 'pug')
  .listen(process.env.port || PORT, async () => {
    console.log(`Старт процесса: ${process.pid}`);
    ({
      data: { users: items }
    } = await get(URL));
  });
