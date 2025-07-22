const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    restaurantName: { type: String, required: false }, // restaurant user is linked to
    role: { type: String, enum: ['admin', 'staff'], default: 'admin' } // for RBAC if needed
});

module.exports = mongoose.model('User', userSchema);
