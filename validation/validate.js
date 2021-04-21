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

const reportValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    visitCategory: Joi.string().required().valid("Prospect", "Agent", "Return"),
    remark: Joi.string().max(255).required(),
    agentCode: Joi.string().allow(""),
    mobileNumber: Joi.string().required(),
    fmLocation: Joi.string().required(),
    obtainedLocation: Joi.string().required(),
    obtainLocString: Joi.string().required(),
  });
  return schema.validate(data);
};

const seenValidation = (data) => {
  const schema = Joi.object({
    lastSeen: Joi.string().required().trim(),
  });
  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.reportValidation = reportValidation;
module.exports.seenValidation = seenValidation;
