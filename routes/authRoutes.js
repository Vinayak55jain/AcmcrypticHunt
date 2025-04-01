import express from 'express';
import AuthController from '../controllers/authController.js';
import AuthService from '../services/authService.js';

const router = express.Router();
const authService = new AuthService();
const authController = new AuthController(authService);

// Authentication routes
router.post('/signup', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));

// Team management routes
router.post('/teams', (req, res) => authController.createTeam(req, res));
router.post('/teams/join', (req, res) => authController.joinTeam(req, res));
router.post('/teams/requests', (req, res) => authController.sendJoinRequest(req, res));
router.put('/teams/requests/approve', (req, res) => authController.approveJoinRequest(req, res));
router.put('/teams/requests/reject', (req, res) => authController.rejectJoinRequest(req, res));
router.get('/:teamId/solved-questions', (req, res) => teamController.getSolvedQuestions(req, res));
router.post('/:teamId/solved-questions/:questionId', (req, res) => teamController.addSolvedQuestion(req, res));

// User profile route
router.get('/profile', (req, res) => authController.getProfile(req, res));

export default router;