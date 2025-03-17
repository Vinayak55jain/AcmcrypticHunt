import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['leader', 'member'],
        default: 'member',
    },
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team',
    },
});

export default mongoose.model('User', userSchema);