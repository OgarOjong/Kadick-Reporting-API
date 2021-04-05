const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const Joi = require("@hapi/joi");
const { reportValidation } = require("../validation/validate");
const Report = require("../models/Report");
const multer = require("multer");
const User = require("../models/User");
var fileupload = require("express-fileupload");
const { APIResponse, APIResponseToks } = require("../models/APIResponse");
const { storage, cloudinary } = require("../cloudinary");

router.get("/upload", verifyToken, async (req, res, next) => {
  console.log("HIT !!");
  const user = req.user;
  const { _id: ID } = user;
  console.log(ID);
  const userReport = Report.findOne({ user: ID });
  console.log(userReport);

  // const FM = await User.findOne({ _id: ID })
  //   .populate("reports")
  //   .then((data) => {
  //     console.log(data);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // const FM = await User.findById({ _id: ID });
  res.send("Verified and Logged IN ");
});

router.post("/upload", verifyToken, async (req, res, next) => {
  const user = req.user;
  const { _id: ID } = user;
  const FM = await User.findById({ _id: ID });
  const { error } = reportValidation(req.body);
  if (error) {
    reg_message = error.details[0].message;
    // console.log(error);
    return res.status(400).send(APIResponse(400, false, reg_message, null));
  }

  var file = null;
  try {
    file = req.files.image;
  } catch (e) {
    return res.status(400).send(APIResponse(400, false, e.message, null));
  }

  // const file = req.files.image;
  if (file === null) {
    return res
      .status(400)
      .send(APIResponse(400, false, "Please input a file", null));
  }

  await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log(err);
    console.log(result);
    const { secure_url, public_id } = result;
    path = secure_url;
    console.log(path);
  });
  // return res.send("done");
  const {
    visitCategory,
    remark,
    agentCode,
    mobileNumber,
    fmlocation,
    obtainedLocation,
    obtainLocString,
  } = req.body;
  const report = new Report({
    visitCategory,
    remark,
    agentCode,
    mobileNumber,
    fmlocation,
    obtainedLocation,
    obtainLocString,
    image: path,
  });
  // console.log(report);
  // return res.send("done");
  try {
    await report.user.push(ID);
    const savedReport = await report.save();
    // await savedReport.user.push(ID);
    // await FM.reports.push(savedReport);
    // await FM.save();
    console.log(savedReport);

    return res
      .status(201)
      .send(APIResponse(201, true, "Report successfuly saved!", path));
  } catch (e) {
    console.log(e);
    res.send("sent!!");
  }
});

module.exports = router;
