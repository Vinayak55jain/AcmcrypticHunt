const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

// Route to get user profile
router.get('/profile', userController.getUserProfile);

// Route to update user profile
router.put('/profile', userController.updateUserProfile);

// Route to delete user account
router.delete('/account', userController.deleteUserAccount);

module.exports = router;