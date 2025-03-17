import express from 'express';
import TeamController from '../controllers/teamController.js';
import TeamService from '../services/teamService.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

router.post('/teams', authMiddleware, (req, res) => teamController.createTeam(req, res));
router.post('/teams/add-member', authMiddleware, (req, res) => teamController.addMember(req, res));

export default router;