const express = require("express");
const router = express.Router();
const { auth, isRecruiter } = require("../middlewares/auth");
const { createProfile, getProfile, updateProfile, deleteProfile, getAllProfiles } = require("../controllers/userProfileController");

router.post("/", auth, createProfile);
router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);
router.delete("/", auth, deleteProfile);
router.get("/all", auth, isRecruiter, getAllProfiles);

module.exports = router;
