const Card = require('../models/card');

const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const SERVER_ERROR = 500;

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.status(200).send({ cards }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(NOT_FOUND).send({ message: 'Ошибка получения карточек.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по-умолчанию.' });
    });
};

const createCard = (req, res) => {
  const ownerCard = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner: ownerCard })
    .then((card) => res.status(200).send({ card }))
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(NOT_FOUND).send({ message: ' Переданы некорректные данные при создании карточки.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по-умолчанию.' });
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Карточка с указанным _id не найдена.' });
        return;
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(NOT_FOUND).send({ message: 'Переданы некорректные данные для постановки лайка.' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию.' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(NOT_FOUND).send({ message: 'Передан несуществующий _id карточки.' });
        return;
      }
      res.status(200).send({ card });
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(NOT_FOUND).send({ message: 'Переданы некорректные данные для снятия лайка' });
        return;
      }
      res.status(SERVER_ERROR).send({ message: 'Ошибка по умолчанию' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
