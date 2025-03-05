const mongoose = require("mongoose");

const skillAssessmentSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    test_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TestGeneration",
      required: true,
    },
    skill_name: { type: String, required: true, trim: true },
    score: { type: Number, required: true },
    proficiency_level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },
    completion_date: { type: Date, default: Date.now },
    is_verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SkillAssessment", skillAssessmentSchema);

/*
Recruiters can create and publish tests.
Candidates can see available tests and take them.
Results are stored as skill assessments.
Tests and assessments are linked.
*/