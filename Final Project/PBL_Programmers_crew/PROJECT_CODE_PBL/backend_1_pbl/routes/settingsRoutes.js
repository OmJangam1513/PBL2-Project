const express = require("express")
const router = express.Router()
const settingsController = require("../controllers/settingsController")
const { protect, authorize } = require("../middlewares/authMiddleware") // Import middlewares

// Route to fetch user settings (protected)
router.get("/:userId/settings", protect, authorize("user"), settingsController.getSettings)

// Route to update user settings (protected)
router.patch("/:userId/settings", protect, authorize("user"), settingsController.updateSettings)

module.exports = router
