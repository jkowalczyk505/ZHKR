// utils/upload.js
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const postId = req.params.id;
    const dir = path.join(
      __dirname,
      "..",
      "public",
      "uploads",
      "posts",
      postId
    );
    await fs.mkdirp(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});

module.exports = multer({ storage });
