const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const Joi = require("@hapi/joi");

router.get("/test", verifyToken, (req, res, next) => {
  res.send("Verified and Logged IN ");
});

router.post("/test", verifyToken, (req, res, next) => {
  const reportValidation = Joi.object().keys({
    visitCategory: Joi.string().required(),
    remark: Joi.string().max(255).required(),
    agentCode: Joi.string().allow(""),
    mobileNumber: Joi.string(),
    fmlocation: Joi.string().required(),
    obtainedLocation: Joi.string().required(),
    obtainLocString: Joi.string().required(),
  });
  const { error } = reportValidation.validate(req.body);
  console.log(error);
  reg_message = error.details[0].message;
  if (error) console.log(error);
  res.send(reg_message);
});

module.exports = router;
