require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const signinRouter = require('./routes/sign-in');
const signupRouter = require('./routes/sign-up');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-middlewares');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const mycors = require('./middlewares/cors');

const { PORT } = process.env;
const { MONGO_URL } = process.env;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.use(mycors);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Монго подключена');
});

app.use(signinRouter);
app.use(signupRouter);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('*', (req, res, next) => {
  next(new NotFoundError('Неверный путь!'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Запущен порт ${PORT}`);
});
