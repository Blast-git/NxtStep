const express = require("express");
const router = express.Router();
const { auth, isRecruiter } = require("../middlewares/auth");
const {applyForJob,getAllApplications,getApplicationsByUser,getApplicationsByJob,updateApplicationStatus,deleteApplication } = require("../controllers/jobApplicationController")

router.post("/",auth, applyForJob)
router.get("/", auth, isRecruiter, getAllApplications);
router.get("/user", auth, getApplicationsByUser)
router.get("/job/:posting_id", auth, isRecruiter, getApplicationsByJob)
router.put("/:id", auth, isRecruiter, updateApplicationStatus)
router.delete("/:id", auth, deleteApplication)

module.exports = router;
