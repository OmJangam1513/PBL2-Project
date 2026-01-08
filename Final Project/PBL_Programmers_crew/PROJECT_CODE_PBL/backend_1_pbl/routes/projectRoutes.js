const express = require('express');
const router = express.Router();
const { createProject, getProjects } = require('../controllers/projectController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Project Routes
router.post('/', protect, authorize('Department Head'), createProject);
router.get('/', protect, authorize('Employee', 'Project Head', 'Department Head'), getProjects);

module.exports = router;
