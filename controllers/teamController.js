class TeamController {
    constructor(teamService) {
        this.teamService = teamService;
    }

    async createTeam(req, res) {
        try {
            const teamData = req.body;
            const newTeam = await this.teamService.createTeam(teamData);
            res.status(201).json(newTeam);
        } catch (error) {
            res.status(500).json({ message: 'Error creating team', error });
        }
    }

    async updateTeam(req, res) {
        try {
            const teamId = req.params.id;
            const teamData = req.body;
            const updatedTeam = await this.teamService.updateTeam(teamId, teamData);
            if (!updatedTeam) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json(updatedTeam);
        } catch (error) {
            res.status(500).json({ message: 'Error updating team', error });
        }
    }

    async getTeam(req, res) {
        try {
            const teamId = req.params.id;
            const team = await this.teamService.getTeamById(teamId);
            if (!team) {
                return res.status(404).json({ message: 'Team not found' });
            }
            res.status(200).json(team);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving team', error });
        }
    }

    async getAllTeams(req, res) {
        try {
            const teams = await this.teamService.getAllTeams();
            res.status(200).json(teams);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving teams', error });
        }
    }
}

export default TeamController;