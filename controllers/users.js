const User = require('../models/user');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ users }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(NOT_FOUND).send({ message: 'Ошибка отображения пользователей.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по-умолчанию.' });
    });
};

const getUser = (req, res) => {
  const id = req.params.userId;
  User.findById(id)
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName.') {
        res.status(NOT_FOUND).send({ message: 'Ошибка: 404.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по-умолчанию.' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
        return;
      }
      if (err.name === 'SomeErrorName') {
        res.status(BAD_REQUEST).send({ message: `Ошибка ${BAD_REQUEST}.` });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по-умолчанию.' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(BAD_REQUEST).send({ message: 'Пользователь по указанному _id не найден.' });
        return;
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(BAD_REQUEST).send({ message: `Ошибка ${BAD_REQUEST}.` });
        return;
      }
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по-умолчанию.' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  if (!avatar) {
    res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.' });
  }
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.' });
        return;
      }
      res.status(200).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля.' });
        return;
      }
      if (err.name === 'SomeErrorName') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  updateAvatar,
};
