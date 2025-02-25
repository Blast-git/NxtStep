const mongoose = require('mongoose');


const interviewSimulationSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    category: {
        type: String,
        required: true
    },

    start_time: {
        type: Date,
        required: true
    },

    end_time: {
        type: Date,
        default: null
    },

    score: {
        type: Number,
        default: null
    },

    feedback: {
        type: String,
        required: false
    },

    recording_url: {
        type: String,
        required: false
    },

    difficulty_level: {
        type: String,
        enum:["Beginner","Moderate","Difficult"]
    }
}, {
  timestamps: true
});

module.exports = mongoose.model('InterviewSimulation', interviewSimulationSchema);
