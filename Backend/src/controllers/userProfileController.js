const UserProfile = require("../models/userProfile");

// Create a new user profile
exports.createProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
      first_name,
      last_name,
      email,
      phone,
      city,
      country,
      education,
      skills,
      experience,
      linkedin_url,
      github_url,
    } = req.body;

    // Check if profile already exists
    const existingProfile = await UserProfile.findOne({ user_id });
    if (existingProfile) {
      return res
        .status(400)
        .json({ success: false, message: "Profile already exists" });
    }

    // Create new profile
    const profile = await UserProfile.create({
      user_id,
      first_name,
      last_name,
      email,
      phone,
      city,
      country,
      education,
      skills,
      experience,
      linkedin_url,
      github_url,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "Profile created successfully",
        profile,
      });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error creating profile" });
  }
};

// Get a user's profile
exports.getProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const profile = await UserProfile.findOne({ user_id });

    if (!profile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res.status(200).json({ success: true, profile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching profile" });
  }
};

// Update a user profile
exports.updateProfile = async (req, res) => {
  try {
    const user_id = req.user.id;
    const updates = req.body;

    const updatedProfile = await UserProfile.findOneAndUpdate(
      { user_id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res
        .status(404)
        .json({ success: false, message: "Profile not found" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "Profile updated successfully",
        profile: updatedProfile,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};


// Get all user profiles (for recruiters)
exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await UserProfile.find().select("-__v"); // Exclude version key
    res.status(200).json({ success: true, total: profiles.length, profiles });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error fetching profiles" });
  }
};
