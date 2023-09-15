require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const signinRouter = require('./routes/sign-in');
const signupRouter = require('./routes/sign-up');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/error-middlewares');
const NotFoundError = require('./errors/not-found-error');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const { MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();

const corsOptions = {
  origin: 'https://kurkov.students.nomoredomainsicu.ru',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(requestLogger);

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
}).then(() => {
  console.log('Монго подключена');
});

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(signinRouter);
app.use(signupRouter);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Неверный путь!'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Запущен порт ${PORT}`);
});
