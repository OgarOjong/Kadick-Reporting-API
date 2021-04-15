const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const { reportValidation } = require("../validation/validate");
const Report = require("../models/Report");
const multer = require("multer");
const User = require("../models/User");
var fileupload = require("express-fileupload");
const { APIResponse, APIResponseToks } = require("../models/APIResponse");
const { storage, cloudinary } = require("../cloudinary");
const { isValidCords } = require("../validation/coordinateValidation");

const refID = mongoose.Types.ObjectId;

router.get("/", verifyToken, async (req, res, next) => {
  console.log("HIT !!");
  const user = await req.user;
  const { _id: _id } = user;
  // const here = await User.findById(_id);
  const userReport = await Report.find({});
  res.send(userReport);
});

router.get("/fm", verifyToken, async (req, res, next) => {
  console.log("HIT !!");
  const user = await req.user;
  const { _id: _id } = user;
  // const here = await User.findById(_id);
  const userReport = await Report.find({
    user: mongoose.Types.ObjectId(_id),
  });

  res.send(userReport);
});

router.post("/new", verifyToken, async (req, res, next) => {
  const user = req.user;
  const { _id: ID } = user;
  const FM = await User.findById({
    _id: ID,
  });
  console.log(`THE USER IS ${FM}`);
  const { error } = reportValidation(req.body);
  const {
    name,
    visitCategory,
    remark,
    agentCode,
    mobileNumber,
    fmLocation,
    obtainedLocation,
    obtainLocString,
  } = req.body;

  if (error) {
    reg_message = error.details[0].message;
    // console.log(error);
    return res.status(400).send(APIResponse(400, false, reg_message, null));
  } else if (!isValidCords(obtainedLocation)) {
    reg_message = "Invalid Corodinates";
    // console.log(error);
    return res.status(400).send(APIResponse(400, false, reg_message, null));
  } else {
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

    await cloudinary.uploader.upload(
      file.tempFilePath,
      {
        quality: "auto:low",
      },
      (err, result) => {
        if (err) {
          console.log(err);
          const { message, http_code, name } = err;
          console.log(err);
          return res
            .status(http_code)
            .send(APIResponse(http_code, false, message, http_code));
        }
        const { secure_url, public_id } = result;
        path = secure_url;
        console.log(path);
      }
    );
    // return res.send("done");

    const report = new Report({
      name,
      visitCategory,
      remark,
      agentCode,
      mobileNumber,
      fmLocation,
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
      const newCord = obtainedLocation.split(",");
      var longitude = parseFloat(newCord[0]);
      var lattitude = parseFloat(newCord[1]);

      return res.status(201).send(
        APIResponse(201, true, "Report successfuly saved!", {
          image: path,
          coordinates: [longitude, lattitude],
        })
      );
    } catch (e) {
      console.log(e);
      res.send("sent!!");
    }
  }
});

module.exports = router;
