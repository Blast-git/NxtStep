const JobPosting = require("../models/jobPosting");

exports.createJobPosting = async (req, res) => {
    try {
        const { title, description, requirements, location, salary_range, job_type, expiry_date } = req.body;
        const employer_id = req.user.id;

        if (!salary_range.min || !salary_range.max) {
            return res.status(400).json({
                success: false,
                message: "Salary range must include min and max values."
            });
        }

        if (!Array.isArray(requirements)) {
            return res.status(400).json({
                success: false,
                message: "Requirements must be an array."
            });
        }

        const validJobTypes = ["Full-time", "Part-time", "Internship"];
        if (!validJobTypes.includes(job_type)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job type. Choose from Full-time, Part-time, or Internship."
            });
        }

        const newJob = new JobPosting({
            employer_id,
            title,
            description,
            requirements,
            location,
            salary_range,
            job_type,
            expiry_date: new Date(expiry_date)
        });

        await newJob.save();

        res.status(201).json({
            success: true,
            message: "Job posting created successfully",
            data: newJob
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating job posting",
            error: error.message
        });
    }
};


exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await JobPosting.find({ is_active: true })
                                    .populate("employer_id", "name email");

        res.status(200).json({
            success: true,
            data: jobs
        });

    } 
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching job postings",
            error: error.message
        });
    }
};


exports.getJobById = async (req, res) => {
    try {
        const job = await JobPosting.findById(req.params.id)
                                    .populate("employer_id", "name email");

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        res.status(200).json({ success: true, data: job });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching job details",
            error: error.message
        });
    }
};


exports.updateJobPosting = async (req, res) => {
    try {
        const job = await JobPosting.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (job.employer_id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to update this job" });
        }

        if (req.body.expiry_date) {
            req.body.expiry_date = new Date(req.body.expiry_date);
        }

        if (req.body.job_type) {
            const validJobTypes = ["Full-time", "Part-time", "Internship"];
            if (!validJobTypes.includes(req.body.job_type)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid job type. Choose from Full-time, Part-time, or Internship."
                });
            }
        }

        const updatedJob = await JobPosting.findByIdAndUpdate(req.params.id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Job posting updated successfully",
            data: updatedJob
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating job posting",
            error: error.message
        });
    }
};


exports.deleteJobPosting = async (req, res) => {
    try {
        const job = await JobPosting.findById(req.params.id);

        if (!job) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }

        if (job.employer_id.toString() !== req.user.id) {
            return res.status(403).json({ success: false, message: "Unauthorized to delete this job" });
        }

        await job.deleteOne();

        res.status(200).json({
            success: true,
            message: "Job posting deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting job posting",
            error: error.message
        });
    }
};
