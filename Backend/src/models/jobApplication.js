const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    user_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    posting_id: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "JobPosting", 
        required: true 
    },
    apply_date: { 
        type: Date, 
        default: Date.now 
    },
    status: { 
        type: String, 
        enum: ["Pending", "Accepted", "Rejected"], 
        default: "Pending" 
    },
    cover_letter: { 
        type: String 
    },
    feedback: { 
        type: String 
    },
    last_updated: { 
        type: Date, 
        default: Date.now 
    }
}, { timestamps: true });

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
