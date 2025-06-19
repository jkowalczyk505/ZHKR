// routes/postRoutes.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/postController");
const upload = require("../utils/upload");

// publiczne
router.get("/", ctrl.getAll);
router.get("/:idOrSlug", ctrl.getOne);

// admin: CRUD
router.post("/", auth, ctrl.create);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.remove);

// admin: upload wielu zdjęć
router.post("/:id/images", auth, upload.array("images", 10), ctrl.uploadImages);

module.exports = router;
