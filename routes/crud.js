const router = require("express").Router();
const User = require("../models/User");
const Report = require("../models/Report");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/kadickrep", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connection established!!");
  })
  .catch((err) => {
    console.log("error in connection");
    console.log(err);
  });

// router.post("/report", async (req, res, next) => {

//   const newReport = new Report({
//     visitCategory: "Prospect",
//     remark: "new day new dawn",
//     agentCode: "FM1002",
//     mobileNumber: "080123456789",
//   });

//   newReport.user.push(newReport);
//   await newReport.save();
//   console.log(newReport);
//   res.send("sent !!");
// });

const addNew = async () => {
  const userA = await User.findOne({ userCode: "FM4469" });
  const newReport = new Report({
    visitCategory: "Return",
    remark: "new day new dawn",
    agentCode: "KA2000",
    mobileNumber: "080123456789",
  });

  // newReport.user.push(userA);
  await newReport.save();
  await userA.reports.push(newReport);
  await userA.save();
  // console.log(userA);

  console.log(newReport);
};
// addNew();

User.findOne({ userCode: "FM4469" })
  .populate("reports")
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });

// module.exports = router;
