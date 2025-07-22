const authService = require('../services/authService.js');

// REGISTER Controller
exports.register = async (req, res) => {
    try {
        const user = await authService.register({
            ...req.body,
            restaurantName: req.restaurantName // ✅ Pass restaurant context
        });
        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (error) {
        console.error('Register Error:', error.message);
        res.status(400).json({ message: error.message });
    }
};


// LOGIN Controller
exports.login = async (req, res) => {
    try {
        const { token, user } = await authService.login(req.body);
        res.status(200).json({
            message: 'Login successful',
            token,
            user
        });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(401).json({ message: error.message });
    }
};

// LOGOUT Controller (stateless - just tell client to delete token)
exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
};
