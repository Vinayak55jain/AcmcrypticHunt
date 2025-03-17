import express from 'express';
import AuthController from '../controllers/authController.js';
import AuthService from '../services/authService.js';

const router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

router.post('/signup', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

export default router;