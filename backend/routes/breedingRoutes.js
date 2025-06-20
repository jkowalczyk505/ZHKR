const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/breedingController");
const upload = require("../utils/uploadBreeding");

// Public endpoints
router.get("/", ctrl.getAll);
router.get("/:numer", ctrl.getOne);

// Admin-only endpoints
router.post("/", auth, upload.single("zdjecie"), ctrl.create);
router.put("/:numer", auth, upload.single("zdjecie"), ctrl.update);
router.delete("/:numer", auth, ctrl.remove);

module.exports = router;
