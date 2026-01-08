const express = require("express");
const router = express.Router();
const {
  getProjectProgress,
  updateProjectProgress,
} = require("../controllers/projectProgressController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// Get project progress
router.get("/:projectId", protect, getProjectProgress);

// Update project progress
router.patch("/:projectId", protect, authorize("ProjectHead"), updateProjectProgress);

module.exports = router;