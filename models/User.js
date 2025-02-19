const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    
    created_at: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date,
        default: null
    },
    is_active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model("User", userSchema);
