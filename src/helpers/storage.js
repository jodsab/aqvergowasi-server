import multer from "multer";
import getFileExtension from "./getFileExtension.js";

const whitelist = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `../src/uploads`);
  },
  filename: function (req, file, cb) {
    if (whitelist.includes(file.mimetype)) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}.${file.mimetype.substring(
          getFileExtension(file.mimetype)
        )}`
      );
    }
  },
});

const upload = multer({ storage: storage });

export default upload;
