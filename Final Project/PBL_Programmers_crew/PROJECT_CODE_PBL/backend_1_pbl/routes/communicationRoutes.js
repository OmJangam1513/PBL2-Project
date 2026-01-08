const express = require('express');
const router = express.Router();
const { getCommunications } = require('../controllers/communicationController');

// Define the API endpoint
router.get('/users/:userId/communications', getCommunications);

module.exports = router;
