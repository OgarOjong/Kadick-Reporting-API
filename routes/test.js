const router = require("express").Router();
const verifyToken = require("../utils/verifyToken");
const Joi = require("@hapi/joi");
const { reportValidation } = require("../validation/validate");
const Report = require("../models/Report");
const multer = require("multer");
const User = require("../models/User");
const { APIResponse } = require("../models/APIResponse");
const { storage } = require("../cloudinary");

// const validateReport = (req, res, next) => {
//   const schema = Joi.object({
//     visitCategory: Joi.string().required().valid("Prospect", "Agent", "Return"),
//     remark: Joi.string().max(255).required(),
//     agentCode: Joi.string().allow(""),
//     mobileNumber: Joi.string(),
//     fmlocation: Joi.string().required(),
//     obtainedLocation: Joi.string().required(),
//     obtainLocString: Joi.string().required(),
//   });
//   const { error } = schema.validate(req.body);
//   if (error) {
//     reg_message = error.details[0].message;
//     //console.log(error);
//     return res.send(reg_message);
//   } else {
//     next();
//   }
// };

router.get("/test", verifyToken, (req, res, next) => {
  res.send("Verified and Logged IN ");
});
const upload = multer({ storage });

router.post("/test", verifyToken, upload.none(), async (req, res, next) => {
  const user = req.user;
  const { _id: ID } = user;
  const FM = await User.findById({ _id: ID });
  // console.log(FM);
  console.log(req.body);
  const { error } = reportValidation(req.body);

  // const file = req.file;
  //   console.log(error);

  if (error) {
    reg_message = error.details[0].message;
    console.log(error);
    return res.status(400).send(APIResponse(400, false, reg_message, null));
  }

  upload.single("image").then((image) => {
    const { path, filename } = image;
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
    try {
      const savedReport = report
        .save()
        .then(FM.reports.push(savedReport).then(FM.save()));

      console.log(savedReport);

      return res
        .status(201)
        .send(APIResponse(201, true, "Report successfuly saved!", null));
    } catch (e) {
      console.log(e);
      console.log(e);
      return res.send(e);
    }
  });

  //image: [(image.url = url), (image.filename = filename)],
  console.log(report);
});

module.exports = router;
