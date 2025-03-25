import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/User.js';
import Team from '../models/Team.js';

class AuthService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to, subject, text) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    };

    await this.transporter.sendMail(mailOptions);
  }

  async register(userData) {
    const { username, password, role } = userData;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create and save the user
    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    // Return the user
    return user;
  }

  async login(credentials) {
    const { username, password } = credentials;

    // Find the user
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Return the token and user details
    return { token, user };
  }

  async createTeam(teamData) {
    const { name, code, userId } = teamData;

    // Validate required fields
    if (!name || !code || !userId) {
      throw new Error('Name, code, and userId are required');
    }

    // Check if the team code already exists
    const existingTeam = await Team.findOne({ code });
    if (existingTeam) {
      throw new Error('Team code already exists');
    }

    // Create the team
    const team = new Team({
      name,
      code,
      leader: userId,
    });

    // Save the team
    await team.save();

    // Update the user's team field
    const user = await User.findById(userId);
    user.team = team._id;
    await user.save();

    // Return the created team
    return team;
  }

  async joinTeam(teamData) {
    const { teamName, teamCode, userId } = teamData;

    // Find the team by name and code (assuming teamCode is a unique identifier)
    const team = await Team.findOne({ name: teamName, code: teamCode });
    if (!team) {
      throw new Error('Team not found');
    }

    // Add the user to the team's members
    if (!team.members.includes(userId)) {
      team.members.push(userId);
      await team.save();
    }

    // Update the user's team field
    const user = await User.findById(userId);
    user.team = team._id;
    await user.save();

    // Return the updated team
    return team;
  }

  async sendJoinRequest(teamCode, userId) {
    // Find the team by code
    const team = await Team.findOne({ code: teamCode });
    if (!team) {
      throw new Error('Team not found');
    }

    // Check if the user is already a member
    if (team.members.includes(userId)) {
      throw new Error('User is already a member of the team');
    }

    // Check if the user has already sent a request
    const existingRequest = team.pendingRequests.find(request => request.userId.equals(userId));
    if (existingRequest) {
      throw new Error('Join request already sent');
    }

    // Add the join request
    team.pendingRequests.push({ userId, status: 'pending' });
    await team.save();

    // Send email to the team leader
    const leader = await User.findById(team.leader);
    await this.sendEmail(leader.email, 'Join Request', `${userId} wants to join your team.`);

    return { success: true, message: 'Join request sent successfully' };
  }

  async approveJoinRequest(teamId, userId) {
    // Find the team
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    // Find the pending request
    const request = team.pendingRequests.find(request => request.userId.equals(userId));
    if (!request) {
      throw new Error('Join request not found');
    }

    // Update the request status
    request.status = 'accepted';

    // Add the user to the team's members
    if (!team.members.includes(userId)) {
      team.members.push(userId);
    }

    // Save the team
    await team.save();

    // Update the user's team field
    const user = await User.findById(userId);
    user.team = team._id;
    await user.save();

    // Send email to the member
    await this.sendEmail(user.email, 'Join Request Approved', 'Your join request has been approved.');

    return { success: true, message: 'Join request approved successfully' };
  }

  async rejectJoinRequest(teamId, userId) {
    // Find the team
    const team = await Team.findById(teamId);
    if (!team) {
      throw new Error('Team not found');
    }

    // Find the pending request
    const request = team.pendingRequests.find(request => request.userId.equals(userId));
    if (!request) {
      throw new Error('Join request not found');
    }

    // Update the request status
    request.status = 'rejected';

    // Save the team
    await team.save();

    // Send email to the member
    const user = await User.findById(userId);
    await this.sendEmail(user.email, 'Join Request Rejected', 'Your join request has been rejected.');

    return { success: true, message: 'Join request rejected successfully' };
  }

  async getProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export default AuthService;