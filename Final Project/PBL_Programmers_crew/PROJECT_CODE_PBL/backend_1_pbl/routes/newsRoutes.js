const express = require("express");
const router = express.Router();
const newsController = require("../controllers/newsController");

// Get all news
router.get("/", newsController.getAllNews);

// Create a news item
router.post("/", newsController.createNews);

// Update a news item
router.put("/:id", newsController.updateNews);

// Delete a news item
router.delete("/:id", newsController.deleteNews);

module.exports = router;