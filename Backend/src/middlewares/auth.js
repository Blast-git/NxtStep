const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
    try {
        // Extract JWT token from cookies or Authorization header
        const token = req.cookies.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided. Authentication failed."
            });
        }

        // Verify token
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload; // Store user data in request object
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token. Please log in again."
            });
        }

        next(); // Proceed to next middleware
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error while verifying token."
        });
    }
};

exports.isCandidate = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "Candidate") {
            return res.status(403).json({
                success: false,
                message: "Protected route for candidates only"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error verifying user role."
        });
    }
};

exports.isRecruiter = (req, res, next) => {
    try {
        if (!req.user || req.user.role !== "Recruiter") {
            return res.status(403).json({
                success: false,
                message: "Protected route for recruiters only"
            });
        }
        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error verifying user role."
        });
    }
};
