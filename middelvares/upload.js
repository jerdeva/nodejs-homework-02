const multer = require("multer");
const path = require("path");

const { HttpError } = require("../helpers/HttpError.js");

const destination = path.resolve("temp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}_${Math.round(Math.random() * 1e9)} `;
    const uniqueFileName = `${uniqueSuffix}_${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const limits = {
  fileSize: 5 * 1024 * 1024,
};

const fileFilter = (req, file, cb) => {
  const extention = file.originalname.split(".").pop();

  if (extention === "exe") {
    return cb(HttpError(400, "Invalid file extention"));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

module.exports = {
  upload,
};
