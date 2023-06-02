const ApiError = require("../helpers/api-error");

const validation =
  (schema, type = "body") =>
  (req, res, next) => {
    const { error } = schema.validate(req[type]);
    error ? next(ApiError.badRequest(error.message)) : next();
  };

module.exports = validation;
