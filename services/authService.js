const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/User');

exports.register = async ({ name, email, password, restaurantName }) => {
    if (!name || !email || !password || !restaurantName) {
        throw new Error('Name, email, password, and restaurant name are required');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        restaurantName // ✅ associate user with a restaurant
    });

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        restaurantName: user.restaurantName
    };
};


exports.login = async ({ email, password }) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return {
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    };
};
exports.logout = () => {
    // Stateless logout - just inform the client to delete the token
    return { message: 'Logout successful' };
};