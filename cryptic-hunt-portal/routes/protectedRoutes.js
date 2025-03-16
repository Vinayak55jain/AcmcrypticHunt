const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

const router = express.Router();

// Protected route to get user profile
router.get('/profile', authMiddleware, userController.getProfile);

// Protected route to update user profile
router.put('/profile', authMiddleware, userController.updateProfile);

// Add more protected routes as needed

module.exports = router;