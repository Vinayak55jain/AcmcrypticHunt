class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async register(req, res) {
    try {
      const { username, password, role } = req.body;
      const user = await this.authService.register({ username, password, role });
      
      res.status(201).json({ 
        success: true, 
        message: 'User registered successfully', 
        userId: user._id, 
        role: user.role 
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
    
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const { token, user } = await this.authService.login({ username, password });

      res.status(200).json({ 
        success: true, 
        message: 'Login successful', 
        token, 
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          team: user.team,
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(401).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  async createTeam(req, res) {
    try {
      const { name, code, userId } = req.body;
      const team = await this.authService.createTeam({ name, code, userId });

      res.status(201).json({ 
        success: true, 
        message: 'Team created successfully', 
        team 
      });
    } catch (error) {
      console.error('Error creating team:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  async joinTeam(req, res) {
    try {
      const { teamName, teamCode, userId } = req.body;
      const team = await this.authService.joinTeam({ teamName, teamCode, userId });

      res.status(200).json({ 
        success: true, 
        message: 'Joined team successfully', 
        team 
      });
    } catch (error) {
      console.error('Error joining team:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  async sendJoinRequest(req, res) {
    try {
      const { teamCode, userId } = req.body;
      const result = await this.authService.sendJoinRequest(teamCode, userId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error sending join request:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  async approveJoinRequest(req, res) {
    try {
      const { teamId, userId } = req.body;
      const result = await this.authService.approveJoinRequest(teamId, userId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error approving join request:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  async rejectJoinRequest(req, res) {
    try {
      const { teamId, userId } = req.body;
      const result = await this.authService.rejectJoinRequest(teamId, userId);

      res.status(200).json(result);
    } catch (error) {
      console.error('Error rejecting join request:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }

  async getProfile(req, res) {
    try {
      // Typically you'd get user ID from the authenticated token
      const userId = req.user.id;
      const user = await this.authService.getProfile(userId);

      res.status(200).json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          team: user.team
        }
      });
    } catch (error) {
      console.error('Error getting profile:', error);
      res.status(400).json({ 
        success: false, 
        message: error.message 
      });
    }
  }
}

export default AuthController;