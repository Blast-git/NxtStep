const SkillAssessment = require("../models/skillAssessment");
const User = require("../models/User");

// Candidate submits a test
exports.submitTest = async (req, res) => {
  try {
    const { test_id, score, proficiency_level } = req.body;
    const user_id = req.user.id;

    const skillAssessment = await SkillAssessment.create({
      user_id,
      test_id,
      skill_name: req.body.skill_name, // Should be auto-filled from test
      score,
      proficiency_level,
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "Test submitted successfully",
        data: skillAssessment,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error submitting test" });
  }
};

// Get all skill assessments (for recruiters)
exports.getAllSkillAssessments = async (req, res) => {
  try {
    const assessments = await SkillAssessment.find();
    return res.status(200).json({ success: true, data: assessments });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching skill assessments" });
  }
};

// Get skill assessments for a specific user
exports.getUserSkillAssessments = async (req, res) => {
  try {
    const { userId } = req.params;
    const assessments = await SkillAssessment.find({ user_id: userId });

    return res.status(200).json({ success: true, data: assessments });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching user's skill assessments" });
  }
};

// Verify a skill assessment (for recruiters)
exports.verifySkillAssessment = async (req, res) => {
  try {
    const { assessmentId } = req.params;
    console.log("Updating assessment:", assessmentId);

    const updatedAssessment = await SkillAssessment.findByIdAndUpdate(
      assessmentId,
      { is_verified: true },
      { new: true } 
    );

    if (!updatedAssessment) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    console.log("Updated Assessment:", updatedAssessment);

    return res.status(200).json({ success: true, message: "Assessment verified", data: updatedAssessment });
  } catch (error) {
    console.error("Error verifying assessment:", error);
    return res.status(500).json({ success: false, message: "Error verifying assessment" });
  }
};

