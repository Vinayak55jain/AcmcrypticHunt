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
  // Question sequence and tracking
  questionSequence: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    }],
    validate: {
      validator: function(arr) {
        return arr.length === new Set(arr.map(id => id.toString())).size;
      },
      message: 'Question sequence must contain unique question IDs'
    }
  },
  currentQuestionIndex: {
    type: Number,
    default: 0,
    min: 0
  },
  solvedQuestions: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
    },
    solvedAt: {
      type: Date,
      default: Date.now,
    },
    solvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    pointsEarned: {
      type: Number,
      default: 0,
    }
  }],
  score: {
    type: Number,
    default: 0,
    min: 0,
  },
  lastSolvedAt: {
    type: Date,
  },
  // Tracking for sequence generation
  sequenceGeneratedAt: {
    type: Date
  },
  // Existing timestamp fields
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.questionSequence; // Don't expose sequence in responses
      return ret;
    }
  },
  toObject: {
    virtuals: true,
    transform: function(doc, ret) {
      delete ret.__v;
      delete ret.questionSequence; // Don't expose sequence in responses
      return ret;
    }
  }
});

// Virtual for member count
teamSchema.virtual('memberCount').get(function() {
  return this.members.length + 1; // +1 for leader
});

// Virtual for current question
teamSchema.virtual('currentQuestion').get(function() {
  if (!this.questionSequence || this.questionSequence.length === 0) return null;
  return this.questionSequence[this.currentQuestionIndex];
});

// Virtual for completion status
teamSchema.virtual('isCompleted').get(function() {
  if (!this.questionSequence) return false;
  return this.currentQuestionIndex >= this.questionSequence.length;
});

// Update timestamp on save
teamSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Set sequence generation timestamp if sequence is being set
  if (this.isModified('questionSequence')) {
    this.sequenceGeneratedAt = Date.now();
  }
  
  next();
});

// Indexes for better performance
teamSchema.index({ name: 1 });
teamSchema.index({ code: 1 });
teamSchema.index({ score: -1 }); // For leaderboard queries
teamSchema.index({ 'solvedQuestions.question': 1 }); // For question tracking
teamSchema.index({ 'questionSequence': 1 }); // For sequence lookups

const Team = mongoose.model('Team', teamSchema);

export default Team;