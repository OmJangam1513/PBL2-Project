const express = require('express');
const router = express.Router();
const { sendNotification, getNotifications, markAsRead } = require('../controllers/notificationController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// All users can get their notifications
router.get('/', protect, getNotifications);

// Only Department Heads can send notifications (if using role-based restriction)
router.post('/send', protect, authorize("DepartmentHead"), sendNotification);

// Mark as read (authenticated users only)
router.patch('/:notificationId/read', protect, markAsRead);

module.exports = router;
