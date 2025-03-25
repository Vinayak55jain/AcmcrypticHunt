import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Team name is required'],
    unique: true,
    trim: true,
    minlength: [3, 'Team name must be at least 3 characters long'],
    maxlength: [50, 'Team name cannot exceed 50 characters'],
  },
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Team leader is required'],
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  code: {
    type: String,
    required: [true, 'Team code is required'],
    unique: true,
    trim: true,
    minlength: [4, 'Team code must be at least 4 characters long'],
    maxlength: [10, 'Team code cannot exceed 10 characters'],
  },
  pendingRequests: [{
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model('Team', teamSchema);

export default Team;