import SequenceService from '../services/sequenceService';
class TeamController {
    constructor(teamService, questionService) {
        this.teamService = teamService;
        this.questionService = questionService;
        this.sequenceService = new SequenceService(questionService);
    }

    async createTeam(req, res) {
        try {
          const teamData = req.body;
          
          // Generate unique sequence for this team
          const [sequence] = await this.sequenceService.generateUniqueSequence(1);
          
          // Add to team data
          const teamWithSequence = {
            ...teamData,
            questionSequence: sequence,
            currentQuestionIndex: 0,
            solvedQuestions: []
          };
    
          const newTeam = await this.teamService.createTeam(teamWithSequence);
          
          // Return data without exposing sequence
          const responseData = newTeam.toObject();
          delete responseData.questionSequence;
    
          res.status(201).json({
            success: true,
            data: responseData
          });
        } catch (error) {
          res.status(500).json({ 
            success: false,
            message: 'Error creating team',
            error: error.message 
          });
        }
      }
    async updateTeam(req, res) {
        try {
            const teamId = req.params.id;
            const teamData = req.body;
            const updatedTeam = await this.teamService.updateTeam(teamId, teamData);
            if (!updatedTeam) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Team not found' 
                });
            }
            res.status(200).json({
                success: true,
                data: updatedTeam
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error updating team',
                error: error.message 
            });
        }
    }

    async getTeam(req, res) {
        try {
            const teamId = req.params.id;
            const team = await this.teamService.getTeamById(teamId);
            if (!team) {
                return res.status(404).json({ 
                    success: false,
                    message: 'Team not found' 
                });
            }
            res.status(200).json({
                success: true,
                data: team
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error retrieving team',
                error: error.message 
            });
        }
    }

    async getAllTeams(req, res) {
        try {
            const teams = await this.teamService.getAllTeams();
            res.status(200).json({
                success: true,
                data: teams
            });
        } catch (error) {
            res.status(500).json({ 
                success: false,
                message: 'Error retrieving teams',
                error: error.message 
            });
        }
    }

    async getSolvedQuestions(req, res) {
      
        // what if two requests come at the same time to submit request and which answer will be considered
        try {
            const teamId = req.params.teamId;
            const team = await this.teamService.getTeamById(teamId);
            
            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: 'Team not found'
                });
            }

            // Get full question details for solved questions
            const solvedQuestions = await this.questionService.getQuestionsByIds(team.solvedQuestions);
            
            res.status(200).json({
                success: true,
                data: {
                    count: team.solvedQuestions.length,
                    questions: solvedQuestions
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error retrieving solved questions',
                error: error.message
            });
        }
    }

    async addSolvedQuestion(req, res) {
        try {
            const { teamId, questionId } = req.params;
            const updatedTeam = await this.teamService.addSolvedQuestion(teamId, questionId);
            
            if (!updatedTeam) {
                return res.status(404).json({
                    success: false,
                    message: 'Team not found'
                });
            }

            res.status(200).json({
                success: true,
                data: updatedTeam
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error updating solved questions',
                error: error.message
            });
        }
    }


}

export default TeamController;