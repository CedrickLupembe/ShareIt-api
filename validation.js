// Validation
const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
  const Schema = Joi.object({
    firstname: Joi.string().min(6).required(),
    lastname: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return Schema.validate(data);
};

// Login validation
const LoginValidation = (data) => {
  const Schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return Schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.LoginValidation = LoginValidation;
