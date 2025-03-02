const mongoose = require("mongoose");

const jobPostingSchema = new mongoose.Schema({
    employer_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true
    },
    title: { 
        type: String, 
        required: true 

    },
    description: { 
        type: String, 
        required: true 

    },
    requirements: { 
        type: [String], 
        required: true 

    },
    location: { 
        type: String, 
        required: true 

    },
    salary_range: { 
        type: new mongoose.Schema({
            min: { type: Number, required: true },
            max: { type: Number, required: true },
            unit: { type: String, default: "LPA" }
        },{_id:false}),
        required:true

    },
    job_type: { 
        type: String, 
        required: true, 
        enum: ["Full-time", "Part-time", "Internship"] 

    },
    posting_date: { 
        type: Date, 
        default: Date.now 
    },

    expiry_date: { 
        type: Date, 
        required: true 

    },
    is_active: { 
        type: Boolean, 
        default: true 

    }
},{timestamps:true});

module.exports = mongoose.model("JobPosting", jobPostingSchema);

