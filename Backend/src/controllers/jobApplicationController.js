const JobApplication = require("../models/jobApplication");


exports.applyForJob = async (req, res) => {
    try {
        const {posting_id,cover_letter} = req.body;
        const user_id = req.user.id;

        const newApplication = new JobApplication({
            user_id,
            posting_id,
            cover_letter
        });

        await newApplication.save();

        res.status(201).json({
            success: true,
            message: "Job application submitted successfully",
            data: newApplication
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error submitting job application",
            error: error.message
        });
    }
};

exports.getAllApplications = async (req, res) => {
    try {
        const applications = await JobApplication.find()
            .populate("user_id", "name email")
            .populate("posting_id", "title employer_id");

        res.status(200).json({
            success: true,
            data: applications
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching job applications",
            error: error.message
        });
    }
};

exports.getApplicationsByUser = async (req, res) => {
    try {
        const user_id = req.user.id;

        const applications = await JobApplication.find({ user_id })
                                                        .populate("posting_id", "title employer_id");

        res.status(200).json({
            success: true,
            data: applications
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching user's job applications",
            error: error.message
        });
    }
};

exports.getApplicationsByJob = async (req, res) => {
    try {
        const { posting_id } = req.params;

        const applications = await JobApplication.find({ posting_id })
            .populate("user_id", "name email");

        res.status(200).json({
            success: true,
            data: applications
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching applications for this job",
            error: error.message
        });
    }
};

exports.updateApplicationStatus = async (req, res) => {
    try {
        const {status,feedback} = req.body;
        const {id} = req.params;

        const application = await JobApplication.findById(id);

        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found" 
            });
        }

        application.status = status || application.status
        application.feedback = feedback || application.feedback
        application.last_updated = Date.now()

        await application.save()

        res.status(200).json({
            success: true,
            message: "Application status updated",
            data: application
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating application status",
            error: error.message
        });
    }
};


exports.deleteApplication = async (req, res) => {
    try {
        const {id} = req.params
        const application = await JobApplication.findById(id)

        if (!application) {
            return res.status(404).json({ 
                success: false, 
                message: "Application not found" 
            })
        }

        await application.deleteOne()

        res.status(200).json({
            success: true,
            message: "Application deleted successfully"
        })

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting application",
            error: error.message
        })
    }
}
