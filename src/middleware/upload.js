const multer = require("multer");
const storage = require("../config/cloudinary");

const upload = multer({
  storage: storage,
}).fields([
  {
    name: "photo",
    maxCount: 1,
  }
]);

module.exports = {upload};