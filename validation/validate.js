const Joi = require("@hapi/joi");

//VALIDATION
const registerValidation = (data) => {
  const schema = Joi.object({
    fullName: Joi.string()
      .min(6)
      .required()
      .regex(/^([\w]{3,})+\s+([\w\s]{3,})+$/i),

    userCode: Joi.string().max(10).required(),
    state: Joi.string().required(),
    street: Joi.string().required(),

    email: Joi.string().min(6).email().required(),

    password: Joi.string().min(6).required(),

    phoneNumber: Joi.string().min(11).required(),
  });
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    userCode: Joi.string().max(10).required(),

    password: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
