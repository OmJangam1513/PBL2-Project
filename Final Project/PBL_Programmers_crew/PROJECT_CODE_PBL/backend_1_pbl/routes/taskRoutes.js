const express = require('express');
const router = express.Router();
const { createTask, getTasks, assignTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Task Routes
router.post('/', protect, authorize('Project Head'), createTask);
router.get('/', protect, authorize('Employee', 'Project Head', 'Department Head'), getTasks);
router.put('/:taskId/assign', protect, authorize('Project Head'), assignTask);

module.exports = router;
