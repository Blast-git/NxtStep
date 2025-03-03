const mongoose = require("mongoose");

const testGenerationSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    skill_name: { type: String, required:true, trim:true },
    difficulty_level: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    syllabus: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 5 },
    num_questions: { type: Number, required: true, min: 1 },
    exam_date: { type: Date, required: true },
    is_published: { type: Boolean, default: false }, // Only published tests are visible to candidates
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestGeneration", testGenerationSchema);
