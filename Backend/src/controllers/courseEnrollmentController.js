const CourseEnrollment = require('../models/courseenrollment');


exports.enrollCourse = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({
                success: false,
                message: "Course ID is required"
            });
        }

        const existingEnrollment = await CourseEnrollment.findOne({ user_id, course_id });
        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: "Candidate is already enrolled in this course"
            });
        }

        const newEnrollment = await CourseEnrollment.create({ user_id, course_id });

        res.status(201).json({
            success: true,
            message: "Enrollment successful",
            data: newEnrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error enrolling in course",
            error: error.message
        });
    }
};



exports.getUserEnrollments = async (req, res) => {
    try {
        const user_id = req.user.id;
        const enrollments = await CourseEnrollment.find({ user_id }).populate("course_id", "title provider"); // Populate course details

        res.status(200).json({
            success: true,
            enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching enrollments",
            error: error.message
        });
    }
}


exports.updateProgress = async (req, res) => {
    try {
        const { id } = req.params;
        const { progress } = req.body;

        if (typeof progress !== "number" || progress < 0 || progress > 100) {
            return res.status(400).json({
                success: false,
                message: "Progress must be a number between 0 and 100"
            });
        }

        const enrollment = await CourseEnrollment.findByIdAndUpdate(
            id,
            {
                progress,
                status: progress === 100 ? "completed" : "in_progress",
                completion_date: progress === 100 ? new Date() : null
            },
            { new: true }
        );

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Progress updated",
            data: enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating progress",
            error: error.message
        });
    }
}


exports.unenrollCourse = async (req, res) => {
    try {
        const user_id = req.user.id; // Ensure user is the one unenrolling
        const { id } = req.params;

        const enrollment = await CourseEnrollment.findOne({ _id: id, user_id });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: "Enrollment not found or unauthorized"
            });
        }

        await enrollment.deleteOne();

        res.status(200).json({
            success: true,
            message: "Unenrolled successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error unenrolling",
            error: error.message
        });
    }
}
