const express = require("express");
const router = express.Router();
const { auth, isCandidate, isRecruiter } = require("../middlewares/auth");
const { 
  submitTest, 
  getAllSkillAssessments, 
  getUserSkillAssessments, 
  verifySkillAssessment 
} = require("../controllers/skillAssessmentController");

router.post("/submit", auth, isCandidate, submitTest);
router.get("/", auth, isRecruiter, getAllSkillAssessments);
router.get("/:userId", auth, getUserSkillAssessments);
router.patch("/verify/:assessmentId", auth, isRecruiter, verifySkillAssessment);

module.exports = router;
