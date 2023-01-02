const { celebrate, Joi } = require('celebrate');
const regex = require('../helpers/regex');

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(50),
    about: Joi.string().min(2).max(50),
    avatar: Joi.string().regex(regex),
  }),
});

module.exports = {
  validateAuthentication,
};
