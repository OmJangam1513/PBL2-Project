const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, validateToken, logoutUser } = require('../controllers/authController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Authentication Routes
router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, authorize('Employee', 'Project Head', 'Department Head'), getUserProfile);
router.get('/validate', validateToken);
router.post('/logout', logoutUser);

module.exports = router;
