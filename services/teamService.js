class TeamService {
    constructor(teamModel) {
        this.teamModel = teamModel;
    }

    async createTeam(teamData) {
        const newTeam = new this.teamModel(teamData);
        return await newTeam.save();
    }

    async getTeamById(teamId) {
        return await this.teamModel.findById(teamId);
    }

    async updateTeam(teamId, updateData) {
        return await this.teamModel.findByIdAndUpdate(teamId, updateData, { new: true });
    }

    async deleteTeam(teamId) {
        return await this.teamModel.findByIdAndDelete(teamId);
    }

    async getAllTeams() {
        return await this.teamModel.find();
    }
    // In TeamService.js
async addSolvedQuestion(teamId, questionId) {
    return await Team.findByIdAndUpdate(
        teamId,
        {
            $addToSet: { solvedQuestions: questionId },
            $inc: { score: question.score }, // Optional: if you want to add points
            $set: { lastSolvedAt: new Date() }
        },
        { new: true }
    );
}

async getQuestionsByIds(questionIds) {
    return await Question.find({ _id: { $in: questionIds } });
}
}

export default TeamService;