const express = require("express");
const router = express.Router();
const { auth, isRecruiter } = require("../middlewares/auth");
const { createJobPosting, getAllJobs, getJobById, updateJobPosting, deleteJobPosting } = require("../controllers/jobPostingController");

router.post("/", auth, isRecruiter, createJobPosting);
router.get("/", getAllJobs);
router.get("/:id", getJobById);
router.put("/:id", auth, isRecruiter, updateJobPosting);
router.delete("/:id", auth, isRecruiter, deleteJobPosting);

module.exports = router
