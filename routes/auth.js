const router = require("express").Router();
const User = require("../models/User");
const { APIResponse, APIResponseToks } = require("../models/APIResponse");
const jwt = require("jsonwebtoken");
const {
  registerValidation,
  loginValidation,
} = require("../validation/validate");
const bcrypt = require("bcryptjs");
const Joi = require("@hapi/joi");
const moment = require("moment");

router.post("/register", async (req, res) => {
  var timeAndDate = moment().format("mmYYhmss");
  var randomNumber = Math.floor(Number(timeAndDate) * Math.random());
  var newCode = `FM${randomNumber.toString().substring(0, 4)}`;
  console.log(newCode);

  //Validating user request
  // const newValue = new Object();
  // newValue = req.body;
  // newValue.userCode = newCode;
  // console.log(newValue);
  req.body.userCode = newCode;

  const { error } = registerValidation(req.body);
  if (error) {
    reg_message = error.details[0].message;
    return res.status(422).send(APIResponse(422, false, reg_message, null));
  }
  //check if user exist in DB before sending
  const userExist = await User.findOne({ userCode: req.body.userCode });
  const EmailExist = await User.findOne({ email: req.body.email });
  if (userExist || EmailExist) {
    return res
      .status(422)
      .send(APIResponse(422, false, "User Exist in DB", null));
  }

  //Hash Password
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //save user to DB
  const user = new User({
    fullName: req.body.fullName,
    userCode: req.body.userCode,
    email: req.body.email,
    state: req.body.state,
    street: req.body.street,
    phoneNumber: req.body.phoneNumber,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    console.log(savedUser);
    return res
      .status(201)
      .send(
        APIResponse(201, true, "User Successfully Registered", user.userCode)
      );
  } catch (err) {
    res.status(500).send(APIResponse(500, false, err, null));
    // res.status(400).send(err.message);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);

  if (error) {
    var log_message = error.details[0].message;
    return res.status(422).send(APIResponse(422, false, log_message, null));
  }
  const user = await User.findOne({ userCode: req.body.userCode });

  if (!user) {
    return res
      .status(422)
      .send(
        APIResponse(422, false, "invalid Field Marshal Code and Password", null)
      );
  }
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res
      .status(422)
      .send(APIResponse(422, false, "invalid  Password", null));
  }

  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  // res.header("auth-token", token).send(token);
  var { id, fullName, userCode, email, phoneNumber } = user;

  var newUser = new Object();
  newUser = {
    id: id,
    fullName: fullName,
    userCode: userCode,
    email: email,
    phoneNumber: phoneNumber,
    auth_token: token,
  };

  return res
    .header("auth_token", token)
    .status(201)
    .send(APIResponseToks(201, true, newUser));

  // res.send(APIResponse(201, true, "logged IN", user.userCode));
});

module.exports = router;
