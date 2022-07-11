const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use((req, res, next) => {
  req.user = {
    _id: '62cc38fc741abf2fa4b2ca4e',
  };

  next();
});

app.use('/', routerUsers);
app.use('/', routerCards);

app.listen(PORT, '127.0.0.1', () => {
  console.log('Сервер запущен');
});
