const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const authController = require('../controllers/authController.js');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
module.exports = router;