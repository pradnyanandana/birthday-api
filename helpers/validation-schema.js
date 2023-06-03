const joi = require("joi").extend(require("@joi/date"));
const data = require("../helpers/data");
const { timezones } = data;

let location = [];

timezones.map((tz) => {
  location = [...location, ...tz.utc];
});

const register = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required(),
  location: joi
    .string()
    .valid(...location)
    .required(),
  birthdate: joi.date().format('YYYY-MM-DD').required(),
});

module.exports = {
  register,
};
