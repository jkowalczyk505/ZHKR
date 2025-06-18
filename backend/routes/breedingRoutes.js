const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/breedingController");

// Public endpoints
router.get("/", ctrl.getAll);
router.get("/:numer", ctrl.getOne);

// Admin-only endpoints
router.post("/", auth, ctrl.create);
router.put("/:numer", auth, ctrl.update);
router.delete("/:numer", auth, ctrl.remove);

module.exports = router;
