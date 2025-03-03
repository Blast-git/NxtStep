const TestGeneration = require("../models/testGeneration");
const User = require("../models/User");

// Recruiter creates a test
exports.createTest = async (req, res) => {
  try {
    const { skill_name, difficulty_level, syllabus, duration, num_questions, exam_date } = req.body;

    const newTest = await TestGeneration.create({
      user_id: req.user.id,
      skill_name,
      difficulty_level,
      syllabus,
      duration,
      num_questions,
      exam_date,
      is_published: false,
    });
    

    return res.status(201).json({ success: true, message: "Test created successfully", data: newTest });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating test" });
  }
};

// Fetch all published tests for candidates
exports.getAllTests = async (req, res) => {
  try {
    const tests = await TestGeneration.find({ is_published: true }).sort({ exam_date: 1 });
    return res.status(200).json({ success: true, data: tests });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching tests" });
  }
};

// Recruiter publishes a test
exports.publishTest = async (req, res) => {
  try {
    const { test_id } = req.params;
    const updatedTest = await TestGeneration.findByIdAndUpdate(
      test_id,
      { is_published: true },
      { new: true }
    );
    return res.status(200).json({ success: true, message: "Test published successfully", test: updatedTest });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error publishing test" });
  }
};
