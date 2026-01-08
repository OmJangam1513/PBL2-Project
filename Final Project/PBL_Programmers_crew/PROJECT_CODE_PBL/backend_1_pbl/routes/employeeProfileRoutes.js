const express = require('express');
const router = express.Router();
const employeeProfileController = require("../controllers/employeeProfileController");
const { protect, authorize } = require('../middlewares/authMiddleware');


// Route to get employee profile
router.get('/:userId/profile', protect, authorize('Employee'), employeeProfileController.getEmployeeProfile);

// Route to update employee profile (for the frontend updateProfile function)
router.patch('/:userId/profile', protect, authorize('Employee'), employeeProfileController.updateEmployeeProfile);

// Route to update task performance (real-time task updates)
router.put("/:userId/task-performance", employeeProfileController.updateTaskPerformance);


module.exports = router;
