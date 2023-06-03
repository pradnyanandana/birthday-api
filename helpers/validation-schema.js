const joi = require("joi").extend(require("@joi/date"));
const moment = require("moment-timezone");

const register = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  location: joi
    .string()
    .valid(...moment.tz.names())
    .required(),
  birthdate: joi.date().format("YYYY-MM-DD").required(),
});

module.exports = {
  register,
};
