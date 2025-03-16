class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    async getUserProfile(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is stored in req.user
            const userProfile = await this.userService.getUserById(userId);
            if (!userProfile) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(userProfile);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }

    async updateUserProfile(req, res) {
        try {
            const userId = req.user.id; // Assuming user ID is stored in req.user
            const updatedData = req.body;
            const updatedUser = await this.userService.updateUser(userId, updatedData);
            if (!updatedUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
}

export default UserController;