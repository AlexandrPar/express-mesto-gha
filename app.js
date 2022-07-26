const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const roterAutoriz = require('./routes/autorization');

const { PORT = 3000 } = process.env;
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.use('/', roterAutoriz);
app.use('/', routerUsers);
app.use('/', routerCards);

app.use((req, res, next) => next(new NotFoundError('Страница не найдена')));

app.listen(PORT, '127.0.0.1', () => {
  console.log('Сервер запущен');
});
