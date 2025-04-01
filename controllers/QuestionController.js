class QuestionController {
    constructor(questionService) {
      this.questionService = questionService;
    }
  
     async createQuestion (req, res)  {
      try {
        const question = await this.questionService.createQuestion(req.body);
        res.status(201).json({
          success: true,
          data: question
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      }
    };
  
    async getQuestions  (req, res)  {
      try {
        const questions = await this.questionService.getAllQuestions();
        res.status(200).json({
          success: true,
          data: questions
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    };
  
     async getQuestion (req, res)  {
      try {
        const question = await this.questionService.getQuestionById(req.params.id);
        if (!question) {
          return res.status(404).json({
            success: false,
            message: 'Question not found'
          });
        }
        res.status(200).json({
          success: true,
          data: question
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    };
  
     async updateQuestion  (req, res)  {
      try {
        const question = await this.questionService.updateQuestion(
          req.params.id,
          req.body
        );
        if (!question) {
          return res.status(404).json({
            success: false,
            message: 'Question not found'
          });
        }
        res.status(200).json({
          success: true,
          data: question
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: error.message
        });
      }
    };
  
    
     async deleteQuestion  (req, res)  {
      try {
        const question = await this.questionService.deleteQuestion(req.params.id);
        if (!question) {
          return res.status(404).json({
            success: false,
            message: 'Question not found'
          });
        }
        res.status(200).json({
          success: true,
          data: {}
        });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: error.message
        });
      }
    };
  
    async checkAnswer(req, res) {
      try {
        const { id } = req.params;
        const { teamId, answer } = req.body;
    
        // Find the team
        const team = await team.findOne({ teamId });
        if (!team) {
          return res.status(404).json({
            success: false,
            message: "Team not found"
          });
        }
    
        // Get the question
        const question = await this.questionService.getQuestionById(id);
        if (!question) {
          return res.status(404).json({
            success: false,
            message: "Question not found"
          });
        }
    
        // Check if already solved
        if (team.solvedQuestions.includes(question._id)) {
          return res.status(409).json({
            success: false,
            message: "Question already solved by your team"
          });
        }
    
        // Verify answer
        const isCorrect = await this.questionService.verifyAnswer(id, answer);
        if (isCorrect) {
          // Update team's progress
          await team.findByIdAndUpdate(
            team._id,
            {
              $push: { solvedQuestions: question._id },
              $inc: { score: question.score },
              $set: { lastLevelCrackedAt: Date.now() }
            },
            { new: true }
          );
    
          // Mark question as solved (for other team members)
          await this.questionService.markAsSolved(id);
    
          return res.status(200).json({
            success: true,
            message: "Correct answer! Points added to your team",
            pointsEarned: question.score
          });
        }
    
        return res.status(400).json({
          success: false,
          message: "Incorrect answer"
        });
    
      } catch (error) {
        console.error("Error checking answer:", error);
        return res.status(500).json({
          success: false,
          message: error.message || "Internal server error"
        });
      }
    } 
  }
  export default QuestionController;