const jwt = require("jsonwebtoken");
const { APIResponse, APIResponseToks } = require("../models/APIResponse");

module.exports = function (req, res, next) {
  const token = req.header("auth_token");
  if (!token)
    return res.status(401).send(APIResponse(401, false, "Access Denied", null));

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(402).send(APIResponse(401, false, "Invalid Token", null));
    console.log(err);
  }
};
