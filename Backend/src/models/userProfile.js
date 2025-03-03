const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema({
  degree: String,
  institution: String,
  year: Number
});

const ExperienceSchema = new mongoose.Schema({
  company: String,
  role: String,
  years: Number
});

const UserProfileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  city: String,
  country: String,
  education: [EducationSchema], 
  experience: [ExperienceSchema],
  linkedin_url: String,
  github_url: String
});

module.exports = mongoose.model("UserProfile", UserProfileSchema);
