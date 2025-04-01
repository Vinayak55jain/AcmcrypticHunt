import Question from '../models/Question.js';

class QuestionService {
  async createQuestion(questionData) {
    const question = new Question(questionData);
    return await question.save();
  }

  async getAllQuestions() {
    return await Question.find({}).sort({ createdAt: -1 });
  }

  async getQuestionById(id) {
    return await Question.findById(id);
  }

  async updateQuestion(id, updateData) {
    return await Question.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });
  }

  async deleteQuestion(id) {
    return await Question.findByIdAndDelete(id);
  }

  async verifyAnswer(questionId, submittedAnswer) {
    const question = await Question.findById(questionId);
    if (!question) throw new Error('Question not found');
    return question.answer === submittedAnswer;
  }

  async markAsSolved(questionId) {
    return await Question.findByIdAndUpdate(
      questionId,
      { solved: true },
      { new: true }
    );
  }
}

export default QuestionService;