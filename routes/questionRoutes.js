import express from 'express';
import QuestionController from '../controllers/questionController.js';
import QuestionService from '../services/questionService.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();
const questionService = new QuestionService();
const questionController = new QuestionController(questionService);

// Public routes
router.get('/', (req, res) => questionController.getQuestions(req, res));
router.get('/:id', (req, res) => questionController.getQuestion(req, res));

// Protected routes (require authentication)
router.use(authMiddleware);

// Answer submission
router.post('/:id/submit', (req, res) => questionController.submitFlag(req, res));

// Admin routes (require admin privileges)
router.use(adminMiddleware);

router.post('/', (req, res) => questionController.createQuestion(req, res));
router.put('/:id', (req, res) => questionController.updateQuestion(req, res));
router.delete('/:id', (req, res) => questionController.deleteQuestion(req, res));

export default router;