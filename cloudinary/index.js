const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: "onethought",
  api_key: "",
  api_secret: "",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "NewTest",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

module.exports = { cloudinary, storage };
