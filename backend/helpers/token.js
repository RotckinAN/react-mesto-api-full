const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// const tokenKey = 'secret_cody_by_mesto_app';

const generateToken = (payload) => jwt.sign(
  payload,
  NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
  { expiresIn: '7d' },
);

module.exports = {
  // tokenKey,
  generateToken,
};
