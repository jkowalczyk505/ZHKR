// utils/uploadBreeding.js
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const dir = path.join(__dirname, "..", "public", "uploads", "breedings");
    await fs.mkdirp(dir); // tworzy katalog jeśli nie istnieje
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + file.originalname;
    cb(null, unique);
  },
});

module.exports = multer({ storage });
