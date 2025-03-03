const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    issuing_authority: {
        type: String,
        required: true,
        trim: true
    },
    issue_date: {
        type: Date,
        required: true
    },
    expiry_date: {
        type: Date,
        default: null
    },
    certificate_url: {
        type: String,
        required: true,
        trim: true
    },
    is_verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("certificate", certificateSchema);
