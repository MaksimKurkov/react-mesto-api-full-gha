const jwt = require('jsonwebtoken');
const AuthError = require('../errors/authorized-error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET = 'secret-key', JWT_DEV = 'dev-key' } = process.env;
  const secretKey = NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV;
  let payload;
  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};
