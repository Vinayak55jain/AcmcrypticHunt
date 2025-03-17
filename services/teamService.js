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
}

export default TeamService;