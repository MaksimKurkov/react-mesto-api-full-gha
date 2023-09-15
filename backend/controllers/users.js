const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return userModel.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => userModel.find({})
  .then((user) => res.send(user))
  .catch((err) => next(err));

module.exports.getUserById = (req, res, next) => {
  const { userId } = req.params;
  return userModel.findById(userId)
    .orFail()
    .then((user) => { res.send(user); })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError(`Некорректный _id: ${req.params.userId}`));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь по данному _id: ${req.params.userId} не найден.`));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      name: user.name, about: user.about, avatar: user.avatar, _id: user._id, email: user.email,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err.code === 11000) {
        next(new ConflictError(`Пользователь с email: ${email} уже зарегистрирован`));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  const userID = req.user._id;
  userModel.findByIdAndUpdate(userID, { name, about }, { new: true, runValidators: true })
    .orFail()
    .then((r) => { res.send(r); })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь по данному _id: ${req.user._id} не найден.`));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const userID = req.user._id;
  return userModel.findByIdAndUpdate(userID, { avatar }, { new: true })
    .orFail()
    .then((r) => { res.send(r); })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь по данному _id: ${req.user._id} не найден.`));
      } else {
        next(err);
      }
    });
};

module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;
  return userModel.findById(userId)
    .orFail()
    .then((currentUser) => res.send(currentUser))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError(`Пользователь по данному _id: ${req.user._id} не найден.`));
      } else {
        next(err);
      }
    });
};
