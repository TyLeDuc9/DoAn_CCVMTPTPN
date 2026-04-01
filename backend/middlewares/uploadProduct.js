const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "organic/product",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const uploadProduct = multer({ storage });

module.exports = uploadProduct;

