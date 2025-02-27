const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    duration: {
        type: String,
        required: true
    },
    difficulty_level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    is_certified: {
        type: Boolean,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
