const joi = require("joi");

const register = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi.string().required(),
  location: joi.string().required(),
  birthdate: joi.string().required(),
});

module.exports = {
  register,
};
