const mongoose = require('mongoose');

const CourseEnrollmentSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true, 
        ref: 'User' 
    },
    course_id: { 
        type: String, 
        required: true, 
        ref: 'Course' 
    },
    enroll_date: {
        type: Date, 
    },
    progress: { 
        type: Number, 
        default: 0 
    },
    status: { 
        type: String, 
        enum: ['enrolled', 'in_progress', 'completed'], 
        default: 'enrolled' 
    },
    completion_date: { 
        type: Date, 
        default: null 
    }
},{timestamps:true});

module.exports = mongoose.model('CourseEnrollment', CourseEnrollmentSchema);
