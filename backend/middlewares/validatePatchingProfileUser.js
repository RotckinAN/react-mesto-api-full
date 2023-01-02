const { celebrate, Joi } = require('celebrate');

const validatePatchingProfileUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(50),
    about: Joi.string().min(2).max(50),
  }),
});

module.exports = {
  validatePatchingProfileUser,
};
