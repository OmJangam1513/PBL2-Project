const express = require("express");
const { getDepartmentInfo } = require("../controllers/departmentController");
const router = express.Router();

// Get department information by departmentId
router.get("/:departmentId", getDepartmentInfo);

module.exports = router;
